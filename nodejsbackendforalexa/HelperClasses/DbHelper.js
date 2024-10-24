const { MongoClient } = require("mongodb");
require('dotenv').config();

console.log(process.env.mongodbconnstring);
// Replace the uri string with your connection string.
const uri = process.env.mongodbconnstring;

const client = new MongoClient(uri);

async function therapyVisitsRemaining() {
  try {
    await client.connect();

    const database = client.db('taskmanager');
    const patients = database.collection('Patients');

    const query = { name: 'Nagesh Ajab' };
    const patient = await patients.findOne(query);

    var msg = `you have ${patient.therapyVisitsRemaining} thearapy visits remaining, out of maximum benifit of ${patient.totalTherapyVisits}`;
    console.log(msg);

    return msg;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function InsuranceCoveragefromDb(illness) {
  try {
    await client.connect();

    const database = client.db('taskmanager');
    const patients = database.collection('Patients');

    const query = { name: 'Nagesh Ajab' };
    const patient = await patients.findOne(query);

    // console.log(`patient returned is ${JSON.stringify(patient)}`);

    var returnval = false;
    for (key in patient.InsuranceCoverage) {
      console.log(patient.InsuranceCoverage[key].toLowerCase());
      if (illness.toLowerCase() == patient.InsuranceCoverage[key].toLowerCase()) {
        returnval = true;
        break;
      }
    }
    return returnval;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function finddoctorfromDb(location, specialty) {
  console.log(`location is ${location} and specialty is ${specialty}`);

  try {
    await client.connect();

    const database = client.db('taskmanager');
    const Physicians = database.collection('Physicians');

    const query = {
      $and: [
        { 'City': { '$regex': location, $options: 'i' } },
        { 'Specialty': { '$regex': specialty, $options: 'i' } }
      ]
    };
    const Physician = await Physicians.findOne(query);

    if (Physician) {
      console.log(Physician.name + Physician.address);
    }

    return Physician;
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = {
  therapyVisitsRemaining,
  InsuranceCoveragefromDb,
  finddoctorfromDb
}