require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer'); // Import Nodemailer

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Create a MongoClient
const client = new MongoClient(uri);

let db;

// Helper: Log Activity
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

// Middleware: Verify Admin (Simple Check)
const verifyAdmin = async (req, res, next) => {
    const { adminid } = req.headers; // Expecting admin's User ID in header 'adminid'

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

const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2; // Keep for reference or remove if fully unused
const multer = require('multer');
// const streamifier = require('streamifier'); // Not needed for disk storage

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
        // Sanitize filename and append timestamp for uniqueness
        const name = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + name);
    }
});

const upload = multer({ storage: storage });

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- CLOUDINARY CONFIGURATION (DISABLED/UNUSED) ---
/*
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
*/

// Helper function to generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

async function startServer() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        db = client.db("deeptech_summit");

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });

    } catch (error) {
        console.error("CRITICAL ERROR: Could not connect to MongoDB.", error);
        process.exit(1);
    }
}

startServer();

// Root route
app.get('/', (req, res) => {
    res.send('Server is running. DB Status: ' + (db ? 'Connected' : 'Disconnected'));
});

// --- ROUTES ---

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash Password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate Code
        const verificationCode = generateCode();

        const newUser = {
            name,
            email,
            password: hashedPassword,
            verified: false,
            isAdmin: false, // Default role
            verificationCode,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(newUser);

        logActivity("New User Registration", result.insertedId, `Email: ${email}`);

        // --- SEND REAL EMAIL ---
        const mailOptions = {
            from: `"DeepTech Summit" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify your Account - DeepTech Summit',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to DeepTech Summit!</h2>
                    <p>Please use the following code to verify your account:</p>
                    <h1 style="color: #0E4FAF; letter-spacing: 5px;">${verificationCode}</h1>
                    <p>This code will expire in 15 minutes.</p>
                </div>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${email}`);
            res.status(201).json({ message: "User registered. Verification code sent to your email.", email });
        } catch (emailError) {
            console.error("Error sending email:", emailError);
            logActivity("Email Failed", result.insertedId, `Type: Verification, Error: ${emailError.message}`);
            // Optional: Delete the user if email fails so they can try again
            await usersCollection.deleteOne({ email });
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

// 2. VERIFY
app.post('/api/auth/verify', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!email || !code) return res.status(400).json({ message: "Email and code required" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.verified) return res.status(400).json({ message: "User already verified" });

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        await usersCollection.updateOne({ email }, { $set: { verified: true, verificationCode: null } });

        logActivity("User Verified", user._id, `Email: ${email}`);

        res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
        console.error("Verify Error:", error);
        res.status(500).json({ message: "Error verifying user" });
    }
});

// 3. LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        if (!user.verified) return res.status(400).json({ message: "Please verify your email first" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logActivity("Failed Login Attempt", user._id, "Invalid Password");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        logActivity("User Login", user._id, "Success");

        const { password: _, verificationCode: __, ...userData } = user;
        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// 4. UPDATE USER PROFILE
app.put('/api/user/update', upload.single('profileImage'), async (req, res) => {
    try {
        const { userId, name, currentPassword, newPassword } = req.body;
        const file = req.file;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!userId) return res.status(400).json({ message: "User ID required" });

        const usersCollection = db.collection("users");

        let userObjectId;
        try {
            userObjectId = new ObjectId(userId);
        } catch (e) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await usersCollection.findOne({ _id: userObjectId });

        if (!user) return res.status(404).json({ message: "User not found" });

        const updateData = {};

        // Update Name
        if (name && name !== user.name) {
            updateData.name = name;
            logActivity("Profile Updated", userObjectId, "Name changed");
        }

        // Update Password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: "Current password required to set new password" });
            }
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Incorrect current password" });
            }
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(newPassword, saltRounds);
            logActivity("Password Changed", userObjectId, "Success");
        }

        // Update Profile Image
        if (file) {
            console.log("Processing file upload...");
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "deeptech_users" },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });

            try {
                const result = await uploadPromise;
                console.log("File uploaded to Cloudinary:", result.secure_url);
                updateData.profileImage = result.secure_url;
                logActivity("Profile Image Updated", userObjectId, "Uploaded to Cloudinary");
            } catch (uploadError) {
                console.error("Cloudinary Upload Error Detailed:", uploadError);
                return res.status(500).json({ message: "Image upload failed: " + uploadError.message });
            }
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "No changes to update" });
        }

        await usersCollection.updateOne({ _id: userObjectId }, { $set: updateData });

        // Fetch updated user
        const updatedUser = await usersCollection.findOne({ _id: userObjectId });
        const { password: _, verificationCode: __, ...userData } = updatedUser;

        res.status(200).json({ message: "Profile updated successfully", user: userData });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

// 5. GET RESEARCH PAPERS
app.get('/api/research', async (req, res) => {
    try {
        const { authorId } = req.query;
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const query = {};
        if (authorId) query.authorId = authorId;

        const papers = await db.collection("research_papers").find(query).sort({ createdAt: -1 }).toArray();
        res.status(200).json(papers);
    } catch (error) {
        console.error("Error fetching papers:", error);
        res.status(500).json({ message: "Error fetching papers" });
    }
});

// 6. UPLOAD RESEARCH PAPER
app.post('/api/research/upload', upload.single('paper'), async (req, res) => {
    try {
        if (!db) return res.status(500).json({ message: "Database not connected" });

        const { title, abstract, tags, authorId, authorName, userId } = req.body;
        const file = req.file;

        if (!title || !abstract || !file) {
            return res.status(400).json({ message: "Title, abstract, and file are required" });
        }

        console.log("Uploading paper (Local):", file.originalname, "->", file.filename);

        // Generate Local URL
        const protocol = req.protocol;
        const host = req.get('host');
        // Construct URL: http://localhost:5000/uploads/filename
        const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;

        const finalAuthorId = userId || authorId || "unknown";

        const newPaper = {
            title,
            abstract,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            authorId: finalAuthorId,
            authorName: authorName || "Anonymous",
            fileUrl: fileUrl,
            createdAt: new Date()
        };

        const result = await db.collection("research_papers").insertOne(newPaper);

        logActivity("Paper Uploaded", finalAuthorId, `Title: ${title}`);

        res.status(201).json({ message: "Paper uploaded successfully", paperId: result.insertedId, paper: newPaper });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Error uploading paper: " + error.message });
    }
});

// 7. GET EXTERNAL RESEARCH (Proxy)
app.get('/api/research/external', (req, res) => {
    const { query } = req.query;
    const https = require('https');

    // OpenAlex API: Broader, global coverage (Google Scholar-like)
    // If query exists, search for it. If not, default to "Deep Tech" topics.
    const searchQuery = query
        ? encodeURIComponent(query)
        : 'artificial+intelligence+OR+biotechnology+OR+quantum+computing+OR+robotics';

    const url = `https://api.openalex.org/works?search=${searchQuery}&per_page=20&sort=publication_date:desc`;

    https.get(url, (externalRes) => {
        res.set('Content-Type', 'application/json');
        externalRes.pipe(res);
    }).on('error', (e) => {
        console.error("External API Error:", e);
        res.status(500).json({ message: "Error fetching external papers" });
    });
});

// 8. DELETE RESEARCH PAPER
app.delete('/api/research/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body; // Expecting userId for ownership check (simplified)

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const papersCollection = db.collection("research_papers");
        let paperObjectId;
        try {
            paperObjectId = new ObjectId(id);
        } catch (e) {
            return res.status(400).json({ message: "Invalid Paper ID" });
        }

        const paper = await papersCollection.findOne({ _id: paperObjectId });
        if (!paper) return res.status(404).json({ message: "Paper not found" });

        if (paper.authorId !== userId) {
            return res.status(403).json({ message: "You can only delete your own papers" });
        }

        // Delete local file if exists
        if (paper.fileUrl && paper.fileUrl.includes('/uploads/')) {
            const filename = paper.fileUrl.split('/').pop();
            const filePath = path.join(__dirname, 'uploads', filename);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Failed to delete local file:", err);
                });
            }
        }

        await papersCollection.deleteOne({ _id: paperObjectId });

        logActivity("Paper Deleted", userId, `Deleted paper: ${paper.title}`);
        res.status(200).json({ message: "Paper deleted successfully" });

    } catch (error) {
        console.error("Delete Paper Error:", error);
        res.status(500).json({ message: "Error deleting paper" });
    }
});

// 9. UPDATE RESEARCH PAPER
app.put('/api/research/:id', upload.single('paper'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, abstract, tags, userId } = req.body;
        const file = req.file;

        if (!db) return res.status(500).json({ message: "Database not connected" });
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const papersCollection = db.collection("research_papers");
        let paperObjectId;
        try {
            paperObjectId = new ObjectId(id);
        } catch (e) {
            return res.status(400).json({ message: "Invalid Paper ID" });
        }

        const paper = await papersCollection.findOne({ _id: paperObjectId });
        if (!paper) return res.status(404).json({ message: "Paper not found" });

        if (paper.authorId !== userId) {
            return res.status(403).json({ message: "You can only edit your own papers" });
        }

        const updateData = {
            title,
            abstract,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            updatedAt: new Date()
        };

        if (file) {
            // Updated with new Local File
            const protocol = req.protocol;
            const host = req.get('host');
            const fileUrl = `${protocol}://${host}/uploads/${file.filename}`;
            updateData.fileUrl = fileUrl;

            // Delete old local file if exists
            if (paper.fileUrl && paper.fileUrl.includes('/uploads/')) {
                const oldFilename = paper.fileUrl.split('/').pop();
                const oldFilePath = path.join(__dirname, 'uploads', oldFilename);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlink(oldFilePath, (err) => {
                        if (err) console.error("Failed to delete old file:", err);
                    });
                }
            }
        }

        await papersCollection.updateOne({ _id: paperObjectId }, { $set: updateData });

        logActivity("Paper Updated", userId, `Updated paper: ${title}`);
        res.status(200).json({ message: "Paper updated successfully", fileUrl: updateData.fileUrl });

    } catch (error) {
        console.error("Update Paper Error:", error);

        res.status(500).json({ message: "Error updating paper" });
    }
});

// --- ADMIN ROUTES ---

// 10. GET SYSTEM OVERVIEW (Stats)
app.get('/api/admin/stats', verifyAdmin, async (req, res) => {
    if (!db) return res.status(500).json({ message: "Database not connected" });
    try {
        const usersCount = await db.collection("users").countDocuments();
        const papersCount = await db.collection("research_papers").countDocuments();
        const verifiedUsers = await db.collection("users").countDocuments({ verified: true });

        res.status(200).json({
            totalUsers: usersCount,
            totalPapers: papersCount,
            verifiedUsers,
            serverTime: new Date()
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ message: "Error fetching stats" });
    }
});

// 11. GET ALL USERS
app.get('/api/admin/users', verifyAdmin, async (req, res) => {
    try {
        const users = await db.collection("users").find().sort({ createdAt: -1 }).toArray();
        // Remove sensitive info
        const safeUsers = users.map(({ password, verificationCode, ...user }) => user);
        res.status(200).json(safeUsers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

// 12. UPDATE USER ROLE (Promote/Demote)
app.put('/api/admin/users/:id/role', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.body;

        await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: { isAdmin: !!isAdmin } }
        );

        logActivity("Admin Action: Changed Role", req.adminUser._id, `Updated user ${id} to isAdmin: ${isAdmin}`);
        res.status(200).json({ message: "User role updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating role" });
    }
});

// 13. DELETE USER
app.delete('/api/admin/users/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("users").deleteOne({ _id: new ObjectId(id) });

        logActivity("Admin Action: Deleted User", req.adminUser._id, `Deleted user ${id}`);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});

// 14. GET ACTIVITY LOGS
app.get('/api/admin/activity', verifyAdmin, async (req, res) => {
    try {
        const activities = await db.collection("activities")
            .find()
            .sort({ timestamp: -1 })
            .limit(50)
            .toArray();

        // Enrich with user names if possible (manual join)
        const enrichedActivities = await Promise.all(activities.map(async (act) => {
            if (act.userId) {
                const u = await db.collection("users").findOne({ _id: act.userId });
                return { ...act, userName: u ? u.name : "Unknown User" };
            }
            return { ...act, userName: "System" };
        }));

        res.status(200).json(enrichedActivities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities" });
    }
});