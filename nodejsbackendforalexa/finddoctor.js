const Alexa = require('ask-sdk-core');
const { finddoctor, findmyinsurancecoverage } = require("./FileHelper");
const { finddoctorfromDb, InsuranceCoveragefromDb } = require("./DbHelper");

const InsuranceCoverageIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'insurance_coverage';
    },
    async handle(handlerInput) {
        console.log('nagesh inside insurance_coverage intent ');
        let illness = handlerInput.requestEnvelope.request.intent.slots.illness.value;
        var coverage = false;

        if (process.env.fromdb == 1) {
            console.log('pulling from db');
            coverage = await InsuranceCoveragefromDb(illness);
            console.log('coverage returned is '+coverage);
        } else {
            console.log('pulling from file');
            coverage = await findmyinsurancecoverage(illness);
        }

        if (coverage) {
            return handlerInput.responseBuilder
                .speak(`${illness} is covered under your insurance`)
                .withShouldEndSession(false)
                .getResponse();

        } else {
            return handlerInput.responseBuilder
                .speak(`${illness} is not covered under your insurance`)
                .withShouldEndSession(false)
                .getResponse();

        }
    }
};

const FindDoctorByLocation = {
    canHandle(handlerInput) {
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
        var location = attributes.location;
        console.log('nagesh inside FindDoctorBySpecialty intent ');
        let specialty = handlerInput.requestEnvelope.request.intent.slots.specialty.value;

        var doctor = await finddoctor(location, specialty);

        if (doctor) {
            console.log(JSON.stringify(doctor));
            return handlerInput.responseBuilder
                .speak(`returned doctor name is ${doctor.name}}. Hospital is located at ${doctor.Address}.}`)
                .withShouldEndSession(false)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak(`cant find doctor with specified location and specialty`)
                .withShouldEndSession(false)
                .getResponse();
        }
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
    FindDoctor,
    InsuranceCoverageIntentHandler
}