// index.js
import dotenv from "dotenv";
dotenv.config();

const { neon } = require("@neondatabase/serverless");

// Create a Neon client
export const client = neon(process.env.DATABASE_URL); // DATABASE_URL from Neon dashboard

// Test the connection
async function testConnection() {
  try {
    // const result = await client.query("SELECT NOW()");
    const test = await client.query("select * from boards");
    console.log("DB connected! Time:", test);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

testConnection();
