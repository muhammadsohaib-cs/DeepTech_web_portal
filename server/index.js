require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2; // Keep for reference
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

// --- HELPER: LOG ACTIVITY ---
async function logActivity(action, userId, details = "") {
    if (!db) return;
    try {
        const activity = {
            action,
            userId: userId ? new ObjectId(userId) : null,
            details,
            timestamp: new Date()
        };
        await db.collection("activities").insertOne(activity);
    } catch (e) {
        console.error("Activity Log Error:", e);
    }
}

// --- MIDDLEWARE: VERIFY ADMIN ---
const verifyAdmin = async (req, res, next) => {
    const { adminid } = req.headers;
    if (!adminid) return res.status(401).json({ message: "Unauthorized: No Admin ID" });

    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(adminid) });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admins Only" });
        }
        req.adminUser = user;
        next();
    } catch (e) {
        return res.status(500).json({ message: "Auth Error" });
    }
};

// --- EMAIL CONFIGURATION (FIXED FOR CLOUD) ---
// --- EMAIL CONFIGURATION (FIXED) ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // Must use 587, not 465
    secure: false, // Must be false for port 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    // CRITICAL FIX: Force IPv4 (Fixes ENETUNREACH error)
    family: 4, 
    // Timeouts
    connectionTimeout: 10000, 
    greetingTimeout: 10000 
});

// Verify Email Connection on Startup
transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ Email System Error:", error);
    } else {
        console.log("✅ Email System Ready");
    }
});

// --- FILE UPLOAD STORAGE (LOCAL) ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const name = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + name);
    }
});
const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Helper: Generate Code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- START SERVER ---
async function startServer() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("✅ MongoDB Connected!");

        db = client.db("deeptech_summit");

        app.listen(port, () => {
            console.log(`🚀 Server running on port: ${port}`);
        });

    } catch (error) {
        console.error("CRITICAL ERROR: MongoDB Connection Failed", error);
        process.exit(1);
    }
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️  WARNING: Email credentials missing in .env");
}

startServer();

// Root route
app.get('/', (req, res) => {
    res.send('DeepTech Server Running. DB: ' + (db ? 'Connected' : 'Disconnected'));
});

// --- ROUTES ---

// 1. REGISTER (With Robust Email)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = generateCode();

        const newUser = {
            name,
            email,
            password: hashedPassword,
            verified: false,
            isAdmin: false,
            verificationCode,
            createdAt: new Date()
        };

        // Save User FIRST
        const result = await usersCollection.insertOne(newUser);
        logActivity("New User Registration", result.insertedId, `Email: ${email}`);

        // Send Email
        const mailOptions = {
            from: `"DeepTech Summit" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your Account - DeepTech Summit',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to DeepTech Summit!</h2>
                    <p>Your verification code is:</p>
                    <h1 style="color: #0E4FAF; letter-spacing: 5px;">${verificationCode}</h1>
                    <p>Expires in 15 minutes.</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent to ${email}`);
            res.status(201).json({ message: "User registered. Code sent.", email });
        } catch (emailError) {
            console.error("❌ Email Failed:", emailError);
            logActivity("Email Failed", result.insertedId, emailError.message);
            
            // ROLLBACK: Delete user if email fails
            await usersCollection.deleteOne({ email });
            return res.status(500).json({ 
                message: "Email failed to send. Please check your address or try again.", 
                error: emailError.message 
            });
        }

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// 2. VERIFY
app.post('/api/auth/verify', async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!email || !code) return res.status(400).json({ message: "Missing email or code" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.verified) return res.status(400).json({ message: "Already verified" });
        if (user.verificationCode !== code) return res.status(400).json({ message: "Invalid code" });

        await usersCollection.updateOne({ email }, { $set: { verified: true, verificationCode: null } });
        logActivity("User Verified", user._id, `Email: ${email}`);
        
        res.status(200).json({ message: "Verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Verification error" });
    }
});

// 3. LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        if (!user.verified) return res.status(400).json({ message: "Please verify email first" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logActivity("Failed Login", user._id, "Bad Password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        logActivity("User Login", user._id, "Success");
        const { password: _, verificationCode: __, ...userData } = user;
        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        res.status(500).json({ message: "Login error" });
    }
});

// 4. UPDATE PROFILE (Local + Cloudinary Support)
app.put('/api/user/update', upload.single('profileImage'), async (req, res) => {
    try {
        const { userId, name, currentPassword, newPassword } = req.body;
        const file = req.file;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const usersCollection = db.collection("users");
        let userObjectId;
        try { userObjectId = new ObjectId(userId); } catch(e) { return res.status(400).json({message: "Invalid ID"}); }

        const user = await usersCollection.findOne({ _id: userObjectId });
        if (!user) return res.status(404).json({ message: "User not found" });

        const updateData = {};

        if (name && name !== user.name) updateData.name = name;

        if (newPassword) {
            if (!currentPassword) return res.status(400).json({ message: "Current password required" });
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        if (file) {
            // CLOUDINARY UPLOAD
            const streamifier = require('streamifier');
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "deeptech_users" },
                    (error, result) => { if (result) resolve(result); else reject(error); }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
            try {
                const result = await uploadPromise;
                updateData.profileImage = result.secure_url;
            } catch (err) {
                console.error("Cloudinary Error:", err);
            }
        }

        if (Object.keys(updateData).length > 0) {
            await usersCollection.updateOne({ _id: userObjectId }, { $set: updateData });
            logActivity("Profile Updated", userObjectId, "Success");
        }

        const updatedUser = await usersCollection.findOne({ _id: userObjectId });
        const { password: _, ...userData } = updatedUser;
        res.status(200).json({ message: "Updated successfully", user: userData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Update failed" });
    }
});

// 5. GET RESEARCH PAPERS
app.get('/api/research', async (req, res) => {
    try {
        const { authorId } = req.query;
        if (!db) return res.status(500).json({ message: "DB Disconnected" });
        
        const query = authorId ? { authorId } : {};
        const papers = await db.collection("research_papers").find(query).sort({ createdAt: -1 }).toArray();
        res.status(200).json(papers);
    } catch (e) { res.status(500).json({ message: "Fetch error" }); }
});

// 6. UPLOAD RESEARCH (Local)
app.post('/api/research/upload', upload.single('paper'), async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "DB Disconnected" });
        const { title, abstract, tags, authorId, authorName, userId } = req.body;
        const file = req.file;

        if (!title || !file) return res.status(400).json({ message: "Title and File required" });

        const protocol = req.protocol;
        const host = req.get('host');
        // If on Render, ensure HTTPS protocol is used in URL
        const secureProtocol = host.includes('render') ? 'https' : protocol;
        const fileUrl = `${secureProtocol}://${host}/uploads/${file.filename}`;

        const newPaper = {
            title,
            abstract,
            tags: tags ? tags.split(',').map(t => t.trim()) : [],
            authorId: userId || authorId || "unknown",
            authorName: authorName || "Anonymous",
            fileUrl,
            createdAt: new Date()
        };

        const result = await db.collection("research_papers").insertOne(newPaper);
        logActivity("Paper Uploaded", newPaper.authorId, title);
        res.status(201).json({ message: "Published!", paper: newPaper });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Upload failed" });
    }
});

// 7. EXTERNAL RESEARCH (FIXED: User-Agent Added)
app.get('/api/research/external', (req, res) => {
    const { query } = req.query;
    const https = require('https');

    const searchQuery = query 
        ? encodeURIComponent(query) 
        : 'artificial+intelligence+OR+biotechnology+OR+quantum+computing';

    const url = `https://api.openalex.org/works?search=${searchQuery}&per_page=20&sort=publication_date:desc`;

    // REQUIRED: User-Agent header to prevent 403 Forbidden on Cloud Servers
    const options = {
        headers: {
            'User-Agent': `DeepTechPortal/1.0 (mailto:${process.env.EMAIL_USER || 'admin@example.com'})`
        }
    };

    https.get(url, options, (externalRes) => {
        if (externalRes.statusCode !== 200) {
            console.error(`OpenAlex API Error: ${externalRes.statusCode}`);
            externalRes.resume(); 
            return res.status(externalRes.statusCode).json({ message: "External API Limit/Error" });
        }
        res.set('Content-Type', 'application/json');
        externalRes.pipe(res);
    }).on('error', (e) => {
        console.error("External API Network Error:", e);
        res.status(500).json({ message: "External API unreachable" });
    });
});

// 8. DELETE PAPER
app.delete('/api/research/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        if (!db) return res.status(500).json({ message: "DB Error" });

        const papers = db.collection("research_papers");
        const paper = await papers.findOne({ _id: new ObjectId(id) });
        
        if (!paper) return res.status(404).json({ message: "Not found" });
        if (paper.authorId !== userId) return res.status(403).json({ message: "Unauthorized" });

        // Delete local file
        if (paper.fileUrl && paper.fileUrl.includes('/uploads/')) {
            const fname = paper.fileUrl.split('/').pop();
            const fpath = path.join(__dirname, 'uploads', fname);
            if (fs.existsSync(fpath)) fs.unlink(fpath, () => {});
        }

        await papers.deleteOne({ _id: new ObjectId(id) });
        logActivity("Paper Deleted", userId, paper.title);
        res.status(200).json({ message: "Deleted" });
    } catch (e) { res.status(500).json({ message: "Delete failed" }); }
});

// 9. UPDATE PAPER
app.put('/api/research/:id', upload.single('paper'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, abstract, tags, userId } = req.body;
        const file = req.file;

        if (!db) return res.status(500).json({ message: "DB Error" });
        const papers = db.collection("research_papers");
        const paper = await papers.findOne({ _id: new ObjectId(id) });

        if (!paper) return res.status(404).json({ message: "Not found" });
        if (paper.authorId !== userId) return res.status(403).json({ message: "Unauthorized" });

        const updateData = { title, abstract, tags: tags ? tags.split(',') : [], updatedAt: new Date() };

        if (file) {
            const host = req.get('host');
            const secureProtocol = host.includes('render') ? 'https' : req.protocol;
            updateData.fileUrl = `${secureProtocol}://${host}/uploads/${file.filename}`;
        }

        await papers.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
        res.status(200).json({ message: "Updated" });
    } catch (e) { res.status(500).json({ message: "Update failed" }); }
});

// --- ADMIN ROUTES ---
app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
    try {
        const users = await db.collection("users").countDocuments();
        const papers = await db.collection("research_papers").countDocuments();
        res.status(200).json({ totalUsers: users, totalPapers: papers });
    } catch (e) { res.status(500).json({ message: "Stats error" }); }
});

app.get('/api/admin/users', verifyAdmin, async (req, res) => {
    try {
        const users = await db.collection("users").find().sort({createdAt: -1}).toArray();
        res.status(200).json(users.map(u => ({...u, password: "", verificationCode: ""})));
    } catch (e) { res.status(500).json({ message: "Users error" }); }
});

app.get('/api/admin/activity', verifyAdmin, async (req, res) => {
    try {
        const logs = await db.collection("activities").find().sort({timestamp: -1}).limit(50).toArray();
        res.status(200).json(logs);
    } catch (e) { res.status(500).json({ message: "Logs error" }); }
});