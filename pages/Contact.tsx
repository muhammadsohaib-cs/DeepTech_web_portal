
import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Phone, MapPin } from 'lucide-react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    const text = `Hi DeepTech Summit Team, My name is ${formData.name}. ${formData.message}`;
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:info@deeptechsummit.pk?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-display font-bold">Get In <span className="text-primary">Touch</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about DeepTech, speaking opportunities, or partnerships? Reach out to us.
          </p>
        </div>

        {/* Industry Collaboration */}
        <div className="mb-20 glass-effect p-8 md:p-12 rounded-[2rem] border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
          <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">Industry Collaboration</h2>
              <p className="text-gray-300 leading-relaxed font-light">
                Industry partners can collaborate with the DeepTech Student Network to support innovation. This collaboration strengthens the connection between universities and industry innovation needs.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-primary uppercase tracking-widest text-sm mb-4">Collaboration Opportunities</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  "Sponsoring student challenges",
                  "Providing real-world problem statements",
                  "Mentoring student teams",
                  "Offering internships",
                  "Supporting prototype development"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="glass-effect p-8 rounded-2xl border-primary/20">
              <h3 className="text-2xl font-display font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Email Us</p>
                    <p className="text-gray-400">info@deeptechsummit.pk</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Call Us</p>
                    <p className="text-gray-400">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Our Hub</p>
                    <p className="text-gray-400">Main Campus, FCCU, Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-display font-bold">Quick Message via:</h4>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleWhatsApp}
                  variant="secondary"
                  fullWidth
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:info@deeptechsummit.pk'}
                  variant="outline"
                  fullWidth
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Team
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-10 rounded-2xl border-primary/30 shadow-xl shadow-primary/10">
            <form onSubmit={handleEmail} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                  placeholder="Inquiry about..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <Button type="submit" fullWidth size="lg">
                <Send className="w-5 h-5 mr-2" />
                Send via Email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
