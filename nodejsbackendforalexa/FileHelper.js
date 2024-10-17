var fs = require('fs');

async function finddoctor(location, specialty) {
    console.log(`location is ${location} and specialty is ${specialty}`);
    var data = JSON.parse(fs.readFileSync('physician_data.json', 'utf8'));

    var doctor;
    for (key in data) {
        if (data[key].Specialty.toLowerCase() == specialty.toLowerCase() &&
            data[key].City.toLowerCase() == location.toLowerCase()) {
            doctor = data[key];
            break;
        }
    };
    return doctor;
}

async function findmyinsurancecoverage(illness) {
    var data = JSON.parse(fs.readFileSync('Patients_data.json', 'utf8'));
    for (key in data[0].InsuranceCoverage) {
        if (data[0].InsuranceCoverage[key].toLowerCase() == illness.toLowerCase()) {
            return true;
        }
    };
    return false;
}

module.exports = {
    finddoctor,
    findmyinsurancecoverage
}



