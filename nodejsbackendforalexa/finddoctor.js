const Alexa = require('ask-sdk-core');
var fs = require('fs');

const FindDoctorByLocation = {
    canHandle(handlerInput) {
        // const attributes = handlerInput.attributesManager.getSessionAttributes();
        // const locationfromsession = attributes.location; // Retrieve name or use a default
        // let location = handlerInput.requestEnvelope.request.intent.slots.location.value;

        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'doctor_location';
    },
    async handle(handlerInput) {
        console.log('nagesh inside FindDoctorByLocation intent ');
        let location = handlerInput.requestEnvelope.request.intent.slots.location.value;

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.location = location; // Example: Saving a user's name
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak('location is ' + location + '. Please tell , which specialty doctor are you looking for')
            .withShouldEndSession(false)
            .getResponse();
    }
};

const FindDoctorBySpecialty = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'doctor_specialty';
    },
    async handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        var location=attributes.location;
        console.log('nagesh inside FindDoctorBySpecialty intent ');
        let specialty = handlerInput.requestEnvelope.request.intent.slots.specialty.value;

        var data = JSON.parse(fs.readFileSync('data.csv', 'utf8'));
        console.log('data from file is '+ JSON.stringify(data)    );
        
        var doctor;
        for (key in data) {
            if (data[key].specialty.toLowerCase() == specialty.toLowerCase() &&
            data[key].city.toLowerCase() == location.toLowerCase()) {
                doctor = data[key];
                break;
            }
        };

        console.log(JSON.stringify(doctor));

        attributes.specialty = specialty; // Example: Saving a user's name
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(`returned doctor name is ${doctor.name}}. Hospital is located at ${doctor.address}.}`)
            .withShouldEndSession(false)
            .getResponse();
    }
};

const FindDoctor = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'finddoctor'
            ;
    },
    handle(handlerInput) {
        console.log('nagesh inside finddoctor intent ');

        return handlerInput.responseBuilder
            .speak('ok, which location?')
            .withShouldEndSession(false)
            .getResponse();
    }
};

module.exports = {
    FindDoctorByLocation,
    FindDoctorBySpecialty,
    FindDoctor
}