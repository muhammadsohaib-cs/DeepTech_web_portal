require('dotenv').config();
const { MongoClient } = require('mongodb');

async function test() {
    console.log("URI:", process.env.MONGODB_URI ? "Found" : "MISSING");
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db("deeptech_summit");
        const societies = await db.collection("societies").find().toArray();
        console.log("Found", societies.length, "societies");
        if (societies.length > 0) {
            societies.forEach(s => console.log(" -", s.instituteName, s.status, s.accountEmail));
        }
    } catch(e) {
        console.error("Error:", e.message);
    } finally {
        await client.close();
    }
}
test();
