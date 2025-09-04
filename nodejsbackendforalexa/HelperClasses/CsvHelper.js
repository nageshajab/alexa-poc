const doctorsdata = [
  { Name: "Dr. Asha Mehta", City: "Mumbai", Specialty: "Cardiologist" },
  { Name: "Dr. Rajiv Nair", City: "Pune", Specialty: "Dentist" },
  { Name: "Dr. Vaishali Mule", City: "Pune", Specialty: "homeopath" },
  { Name: "Dr. Sneha Kulkarni", City: "Bangalore", Specialty: "Diabetic" },
  { Name: "Dr. Arvind Rao", City: "Hyderabad", Specialty: "Orthopedics" },
  { Name: "Dr. Meera Shah", City: "Ahmedabad", Specialty: "Homeopath" },
  { Name: "Dr. Vikram Joshi", City: "Chennai", Specialty: "Cardiologist" },
  { Name: "Dr. Neha Patil", City: "Nagpur", Specialty: "Dentist" },
  { Name: "Dr. Karan Desai", City: "Delhi", Specialty: "Orthopedics" },
  { Name: "Dr. Priya Menon", City: "Kolkata", Specialty: "Diabetic" },
  { Name: "Dr. Suresh Iyer", City: "Jaipur", Specialty: "Homeopath" },
];
const patientData = [
  {
    name: "nagesh ajab",
    VisitsRemaining: 2,
    TotalVisits: 5,
  },
  {
    name: "suresh ghodke",
    VisitsRemaining: 0,
    TotalVisits: 5,
  },
];

function getVisitsRemaining(patientName) {
  const patient = patientData.find(
    (p) => p.name.toLowerCase() === patientName.toLowerCase()
  );

  if (patient) {
    var msg = `you have ${patient.therapyVisitsRemaining} thearapy visits remaining, out of maximum benifit of ${patient.totalTherapyVisits}`;
    return patient.VisitsRemaining;
  } else {
    return `Patient "${patientName}" not found.`;
  }
}

async function finddoctor(city, specialty) {
  const matchingDoctors = doctorsdata.filter(
    (doc) =>
      doc.City.toLowerCase() === city.toLowerCase() &&
      doc.Specialty.toLowerCase() === specialty.toLowerCase()
  );

  if (matchingDoctors.length > 0) {
    return matchingDoctors;
  } else {
    return `No doctors found in ${city} with specialty "${specialty}".`;
  }
}

module.exports = {
  getVisitsRemaining,
  finddoctor,
};
