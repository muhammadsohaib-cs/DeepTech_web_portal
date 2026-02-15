
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Upload, FileText, Download, X, BookOpen, Tag, Calendar, User, Filter, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { ResearchPaper } from '../types';

const Research: React.FC = () => {
    const { user } = useAuth();
    const [papers, setPapers] = useState<ResearchPaper[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<'all' | 'my-papers' | 'global'>('all');

    // Form State
    const [editingPaper, setEditingPaper] = useState<ResearchPaper | null>(null);
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [tags, setTags] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (activeFilter === 'global') {
            fetchExternalPapers();
        } else {
            fetchPapers();
        }
    }, [activeFilter, user]);

    const fetchPapers = async () => {
        try {
            setLoading(true);
            let url = 'http://localhost:5000/api/research';
            if (activeFilter === 'my-papers' && user) {
                url += `?authorId=${user._id}`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch papers');
            const data = await response.json();
            setPapers(data);
        } catch (error) {
            console.error('Error fetching papers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExternalPapers = async () => {
        try {
            setLoading(true);
            const queryParam = searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : '';
            const response = await fetch(`http://localhost:5000/api/research/external${queryParam}`);
            const data = await response.json();

            // OpenAlex returns a 'results' array
            const results = data.results || [];

            const externalPapers: ResearchPaper[] = results.map((item: any, index: number) => {
                // Reconstruct abstract from inverted index
                let abstractText = "No abstract available.";
                if (item.abstract_inverted_index) {
                    const sortedWords: string[] = [];
                    Object.entries(item.abstract_inverted_index).forEach(([word, positions]: [string, any]) => {
                        positions.forEach((pos: number) => { sortedWords[pos] = word; });
                    });
                    abstractText = sortedWords.join(' ');
                }

                // Get Authors
                const authorName = item.authorships?.[0]?.author?.display_name || "Unknown Author";

                const authorId = item.authorships?.[0]?.author?.id || `ext-auth-${index}`;

                // Get PDF/Link
                const link = item.open_access?.oa_url || item.doi || item.primary_location?.source?.url || "";

                return {
                    _id: item.id || `ext-${index}`,
                    title: item.display_name,
                    abstract: abstractText,
                    tags: ["Global", "OpenAlex", item.type || "article"],
                    authorName: authorName,
                    authorId: authorId,
                    createdAt: item.publication_date || new Date().toISOString(),
                    fileUrl: link,
                    isExternal: true
                };
            });

            setPapers(externalPapers);

        } catch (error) {
            console.error('Error fetching external papers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetForm = () => {
        setTitle('');
        setAbstract('');
        setTags('');
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setMessage(null);
        setEditingPaper(null);
    };

    const handleEditClick = (paper: ResearchPaper) => {
        setEditingPaper(paper);
        setTitle(paper.title);
        setAbstract(paper.abstract);
        setTags(paper.tags.join(', '));
        // We don't preload the file input, user can upload new one if they want
        setIsUploadModalOpen(true);
    };

    const handleDelete = async (paperId: string) => {
        if (!user || !window.confirm("Are you sure you want to delete this research paper?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/research/${paperId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user._id })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to delete paper");
            }

            fetchPapers();

        } catch (error: any) {
            console.error("Delete error:", error);
            alert(error.message);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return; // Should allow login prompt

        setUploadLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('abstract', abstract);
        formData.append('tags', tags); // Comma separated
        formData.append('userId', user._id); // Needed for auth check on backend

        // For Create: authorId/authorName
        // For Update: userId is used to check ownership
        if (!editingPaper) {
            formData.append('authorId', user._id);
            formData.append('authorName', user.name);
        }

        if (selectedFile) {
            formData.append('paper', selectedFile);
        } else if (!editingPaper) {
            // File is required for new papers
            setMessage({ type: 'error', text: 'Please attach a PDF file.' });
            setUploadLoading(false);
            return;
        }

        try {
            let url = 'http://localhost:5000/api/research/upload';
            let method = 'POST';

            if (editingPaper) {
                url = `http://localhost:5000/api/research/${editingPaper._id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Operation failed');
            }

            setMessage({ type: 'success', text: editingPaper ? 'Research updated successfully!' : 'Research paper published successfully!' });

            // Refresh list
            fetchPapers();

            // Close modal after delay and reset
            setTimeout(() => {
                setIsUploadModalOpen(false);
                resetForm();
            }, 2000);

        } catch (err: any) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setUploadLoading(false);
        }
    };

    const filteredPapers = papers.filter(paper =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-black pt-28 pb-20 px-4 relative overflow-hidden">
            {/* ... (rest of the file remains same until checks) ... */}

            {/* Background Ambient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1 className="text-5xl font-display font-bold mb-4">Research <span className="text-primary text-glow">Hub</span></h1>
                        <p className="text-gray-400 max-w-2xl text-lg">
                            Access the latest breakthroughs in DeepTech. Publish your findings, collaborate with peers, and contribute to the global scientific community.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        {user && (
                            <Button
                                onClick={() => setIsUploadModalOpen(true)}
                                className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(14,79,175,0.4)] flex items-center gap-2"
                            >
                                <Upload className="w-5 h-5" />
                                Publish Research
                            </Button>
                        )}
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="relative flex-grow w-full md:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title, author, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // Prevent modal form submit if inside one (though this input is outside)
                                    if (activeFilter === 'global') fetchExternalPapers();
                                }
                            }}
                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all placeholder-gray-600"
                        />
                        <button
                            onClick={() => activeFilter === 'global' && fetchExternalPapers()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                    {user && (
                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Community
                            </button>
                            <button
                                onClick={() => setActiveFilter('global')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'global' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Global Feed
                            </button>
                            <button
                                onClick={() => setActiveFilter('my-papers')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'my-papers' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                My Papers
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div className="flex bg-black/40 rounded-xl p-1 border border-white/10">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Community
                            </button>
                            <button
                                onClick={() => setActiveFilter('global')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'global' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                Global Feed
                            </button>
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : filteredPapers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPapers.map((paper) => (
                            <motion.div
                                key={paper._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 hover:bg-white/10 transition-all group flex flex-col h-full relative overflow-hidden"
                            >
                                {user && user._id === paper.authorId && !paper.isExternal && (
                                    <div className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditClick(paper)}
                                            className="p-2 bg-black/50 hover:bg-primary/50 text-white rounded-lg backdrop-blur-md transition-colors"
                                            title="Edit Paper"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(paper._id)}
                                            className="p-2 bg-black/50 hover:bg-red-500/50 text-white rounded-lg backdrop-blur-md transition-colors"
                                            title="Delete Paper"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className="mb-4 flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {paper.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-xs font-mono px-2 py-1 bg-primary/10 text-primary-light rounded border border-primary/20">
                                                #{tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {paper.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                                        <User className="w-4 h-4" />
                                        <span>{paper.authorName}</span>
                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                        <Calendar className="w-4 h-4 ml-1" />
                                        <span>{new Date(paper.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                                        {paper.abstract}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center bg-black/20 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                                    <a
                                        href={paper.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Read Paper
                                    </a>
                                    {paper.fileUrl && !paper.isExternal && (
                                        <a
                                            href={paper.fileUrl}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                            title="Download PDF"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                        <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No Research Papers Found</h3>
                        <p className="text-gray-400">Try adjusting your search or be the first to publish.</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsUploadModalOpen(false);
                                resetForm();
                            }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#121212] border border-white/10 rounded-3xl max-w-2xl w-full relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col max-h-[85vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-8 pb-0 shrink-0 relative">
                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                                <button
                                    onClick={() => {
                                        setIsUploadModalOpen(false);
                                        resetForm();
                                    }}
                                    className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 hover:bg-white/5 rounded-full transition-colors z-20"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <h2 className="text-3xl font-display font-bold mb-2 text-white mt-2">
                                    {editingPaper ? "Edit Research" : "Publish Research"}
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    {editingPaper ? "Update your research details." : "Share your findings with the DeepTech community."}
                                </p>

                                {message && (
                                    <div className={`mb-6 p-4 rounded-xl text-sm flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-green-400"></div> : <div className="w-2 h-2 rounded-full bg-red-400"></div>}
                                        {message.text}
                                    </div>
                                )}
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-8 pt-0 flex-1 overflow-y-auto custom-scrollbar">
                                <form id="upload-form" onSubmit={handleUpload} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                                            placeholder="e.g. Advances in Quantum Error Correction"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Abstract</label>
                                        <textarea
                                            required
                                            value={abstract}
                                            onChange={(e) => setAbstract(e.target.value)}
                                            rows={4}
                                            className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all resize-none"
                                            placeholder="Brief summary of your research..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Tags (comma separated)</label>
                                        <div className="relative">
                                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 text-white rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                                                placeholder="e.g. AI, Biotech, Nanotech"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
                                            {editingPaper ? "Paper File (PDF) - Optional if updating" : "Paper File (PDF)"}
                                        </label>
                                        {!selectedFile ? (
                                            <div
                                                className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-white/5 transition-all group cursor-pointer active:scale-95 duration-200"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept=".pdf"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="w-12 h-12 rounded-full bg-white/5 mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                                </div>
                                                <p className="text-gray-300 font-medium mb-1">Click to upload PDF</p>
                                                <p className="text-gray-500 text-xs text-center">Max file size 10MB</p>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-xl">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="p-2 bg-primary/20 rounded-lg">
                                                        <FileText className="w-5 h-5 text-primary" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-white text-sm font-medium truncate">{selectedFile.name}</p>
                                                        <p className="text-primary/70 text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                                                    title="Remove file"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Footer (Actions) */}
                            <div className="p-6 border-t border-white/10 bg-[#121212] shrink-0 flex justify-end gap-3">
                                <Button
                                    type="button"
                                    onClick={() => {
                                        setIsUploadModalOpen(false);
                                        resetForm();
                                    }}
                                    className="bg-transparent text-gray-400 hover:text-white px-6 hover:bg-white/5 rounded-xl transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    form="upload-form"
                                    disabled={uploadLoading || (!selectedFile && !editingPaper)}
                                    className={`bg-primary hover:bg-primary-light text-white px-8 rounded-xl shadow-[0_0_15px_rgba(14,79,175,0.4)] flex items-center gap-2 ${uploadLoading || (!selectedFile && !editingPaper) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {uploadLoading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                    {uploadLoading ? (editingPaper ? 'Updating...' : 'Uploading...') : (editingPaper ? 'Update Paper' : 'Publish Paper')}
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Research;
