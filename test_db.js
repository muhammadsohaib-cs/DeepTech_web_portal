require('dotenv').config({ path: './server/.env' });
const { MongoClient } = require('mongodb');

async function test() {
    console.log("URI:", process.env.MONGODB_URI);
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db("deeptech_summit");
        const societies = await db.collection("societies").find().toArray();
        console.log("Found societies:", societies.length);
        console.log(societies);
    } catch(e) {
        console.error("Error", e);
    } finally {
        await client.close();
    }
}
test();
