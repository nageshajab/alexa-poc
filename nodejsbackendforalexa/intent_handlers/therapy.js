const Alexa = require('ask-sdk-core');
const { callApi } = require("../HelperClasses/ApiHelper");

const TherapyVisitedIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'therapy_visited';
    },
    async handle(handlerInput) {
        console.log('nagesh inside therapy_visited intent ');

        var msg = await callApi('https://taskmanagerservice.azurewebsites.net/api/therapyvisitRemaining');

        return handlerInput.responseBuilder
            .speak(`${msg}`)
            .withShouldEndSession(false)
            .getResponse();
    }
};

module.exports = {
    TherapyVisitedIntentHandler
}