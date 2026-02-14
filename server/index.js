const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://muhammadsohaib19477_db_user:AuiVY2iiNJk2KlXb@cluster0.ionoasj.mongodb.net/?appName=Cluster0";

// Create a MongoClient
const client = new MongoClient(uri);

let db;

async function run() {
    try {
        console.log("Attempting to connect to MongoDB...");
        // Connect the client to the server
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        db = client.db("deeptech_summit"); // Database Name
    } catch (error) {
        console.error("Error connecting to MongoDB. Check your IP whitelist in Atlas! Error:", error);
    }
}
run().catch(console.dir);

// Root route to check server status
app.get('/', (req, res) => {
    res.send('Server is running. DB Status: ' + (db ? 'Connected' : 'Disconnected'));
});
run().catch(console.dir);

// Helper function to generate 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Routes

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });

        const usersCollection = db.collection("users");
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const verificationCode = generateCode();
        const newUser = {
            name,
            email,
            password, // In production, hash this!
            verified: false,
            verificationCode,
            createdAt: new Date()
        };

        await usersCollection.insertOne(newUser);

        // Simulate sending email
        console.log(`[SIMULATION] Verification Code for ${email}: ${verificationCode}`);

        res.status(201).json({ message: "User registered successfully. Please verify your email.", email });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// 2. VERIFY
app.post('/api/auth/verify', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "User already verified" });
        }

        if (user.verificationCode !== code) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        await usersCollection.updateOne({ email }, { $set: { verified: true, verificationCode: null } });

        res.status(200).json({ message: "Account verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error: error.message });
    }
});

// 3. LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!db) return res.status(500).json({ message: "Database not connected" });

        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.verified) {
            return res.status(400).json({ message: "Please verify your email first" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Prepare user data to send back (exclude password)
        const { password: _, ...userData } = user;

        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
