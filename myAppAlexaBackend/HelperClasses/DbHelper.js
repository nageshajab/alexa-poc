const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.mongodbconnstring;
const client = new MongoClient(uri);

async function getAllEvents() {
  console.log("dbhelper getallevents");
  try {
    await client.connect();
    // Check connection status via topology
    const isConnected = client.topology?.isConnected();
    console.log(`MongoDB connected: ${isConnected ? "Yes" : "No"}`);

    const database = client.db("mydatabase");
    const eventsCollection = database.collection("Events");

    // Fetch all events where markFinished is false
    const query = { MarkFinished: false };
    const unfinishedEvents = await eventsCollection.find(query).toArray(); // await eventsCollection.find().limit(5).toArray();

    // Optional: log or format the result
    console.log(`Found ${unfinishedEvents.length} unfinished events`);
    unfinishedEvents.forEach((event, index) => {
      console.log(
        `${index + 1}. ${event.Title} - ${
          event.Description || "No description"
        }`
      );
    });

    return unfinishedEvents;
  } catch (e) {
    console.error("Error fetching unfinished events:", e);
    throw e;
  } finally {
    await client.close();
  }
}

module.exports = {
  getAllEvents,
};
