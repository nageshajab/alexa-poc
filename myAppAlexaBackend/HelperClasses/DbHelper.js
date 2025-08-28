const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.mongodbconnstring;
const client = new MongoClient(uri);

async function getAllEvents({ showActiveEventsOnly = true } = {}) {
  try {
    await client.connect();
    // Check connection status via topology
    const isConnected = client.topology?.isConnected();
    console.log(`MongoDB connected: ${isConnected ? "Yes" : "No"}`);

    const database = client.db("mydatabase");
    const eventsCollection = database.collection("Events");

    const currentDate = new Date();
    const fiveDaysAgo = new Date(
      currentDate.getTime() - 5 * 24 * 60 * 60 * 1000
    );
    const fiveDaysLater = new Date(
      currentDate.getTime() + 5 * 24 * 60 * 60 * 1000
    );

    var userid = "1fcca2c1-ffda-4cc5-b5bd-8959dec8d5af";
    // Build filter
    const filter = { userid };

    if (showActiveEventsOnly) {
      filter.MarkFinished = false;
      filter.Date = { $gte: fiveDaysAgo, $lte: fiveDaysLater };
    }

    const documents = await eventsCollection.find(filter).toArray();

    var msg = "";
    if (documents.length == 0) {
      msg = "You have no events.";
    } else {
      msg = `You have ${documents.length} events. They are `;
      documents.forEach((doc) => {
        msg = msg + "," + doc.Title;
      });
    }

    return msg;
  } catch (err) {
    console.error("Error fetching events:", err);
    throw err; // Rethrow the error to be caught by the caller
  } finally {
    await client.close();
  }
}

// Example duration calculator
function calculateDuration(date) {
  const now = new Date();
  const durationMs = now - new Date(date);
  return Math.floor(durationMs / (1000 * 60 * 60)); // duration in hours
}

module.exports = {
  getAllEvents,
};
