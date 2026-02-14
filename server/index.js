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

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup for memory storage
const upload = multer({ storage: multer.memoryStorage() });

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

// 1. REGISTER (Now sends REAL email)
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
            verificationCode,
            createdAt: new Date()
        };

        // Save User to DB
        await usersCollection.insertOne(newUser);

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
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

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
        if (name) updateData.name = name;

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