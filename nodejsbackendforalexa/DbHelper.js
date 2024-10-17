const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://nageshajab:NDDLththoSBKd5yH@cluster0.h7fiv.mongodb.net/";

const client = new MongoClient(uri);

async function InsuranceCoverage() {
  try {
    await client.connect();

    const database = client.db('taskmanager');
    const patients = database.collection('Patients');

    const query = { name: 'Nagesh Ajab' };
    const patient = await patients.findOne(query);

    //console.log(patient);
    console.log('Your insurance does not cover ' + patient.InsuranceCoverage.includes('Cancer'));
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function finddoctor(location, specialty) {
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
//finddoctor().catch(console.dir);

module.exports = {
  InsuranceCoverage,
  finddoctor
}