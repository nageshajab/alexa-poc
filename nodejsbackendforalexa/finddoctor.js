const Alexa = require('ask-sdk-core');
const { finddoctor } = require("./FileHelper");
const { finddoctorfromDb } = require("./DbHelper");

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

        var doctor;
        if (process.env.fromdb == 1) {
            console.log('pulling from db');
            doctor = await finddoctorfromDb(location, specialty);
        } else {
            console.log('pulling from file');
            doctor = await finddoctor(location, specialty);
        }

        if (doctor) {
            console.log(JSON.stringify(doctor));
            clearLocationAndSpecalty(handlerInput);
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

        var location = getLocation(handlerInput);

        if (location == null) {
            return handlerInput.responseBuilder
                .speak('ok, which location?')
                .withShouldEndSession(false)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak('ok, which specialty?')
                .withShouldEndSession(false)
                .getResponse();
        }


    }
};

function clearLocationAndSpecalty(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    attributes.location = null; // Example: Saving a user's name
    attributes.specialty=null;
    handlerInput.attributesManager.setSessionAttributes(attributes);
}

function getLocation(handlerInput) {
    var location;

    //first check whether location exists in session
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    location = attributes.location; // Example: Saving a user's name

    //read from slot value
    if (location == null) {
        if (handlerInput.requestEnvelope.request.intent.slots != undefined) {
            if (handlerInput.requestEnvelope.request.intent.slots.location != undefined) {
                location = handlerInput.requestEnvelope.request.intent.slots.location.value;
            }
        }
    }
    return location;
}

function getSpecialty(handlerInput) {

}


module.exports = {
    FindDoctorByLocation,
    FindDoctorBySpecialty,
    FindDoctor
}