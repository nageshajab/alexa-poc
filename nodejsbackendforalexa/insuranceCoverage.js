const Alexa = require('ask-sdk-core');
const { InsuranceCoveragefromDb } = require("./DbHelper");
const { findmyinsurancecoverage } = require("./FileHelper");

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

module.exports={
    InsuranceCoverageIntentHandler
};