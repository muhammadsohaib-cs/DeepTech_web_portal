require('dotenv').config();
const { MongoClient } = require('mongodb');

async function test() {
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db("deeptech_summit");
        // Find the admin user
        const admins = await db.collection("users").find({ isAdmin: true }).toArray();
        console.log("Admin users found:", admins.length);
        admins.forEach(a => console.log(" - ID:", a._id.toString(), "Email:", a.email));
    } catch(e) {
        console.error("Error:", e.message);
    } finally {
        await client.close();
    }
}
test();
