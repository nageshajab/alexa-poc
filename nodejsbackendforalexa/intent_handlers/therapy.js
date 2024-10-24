const Alexa = require('ask-sdk-core');
const { therapyVisitsRemaining } = require("../HelperClasses/DbHelper");

const TherapyVisitedIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'therapy_visited';
    },
    async handle(handlerInput) {
        console.log('nagesh inside therapy_visited intent ');

        var msg = await therapyVisitsRemaining();

        return handlerInput.responseBuilder
            .speak(`${msg}`)
            .withShouldEndSession(false)
            .getResponse();
    }
};

module.exports = {
    TherapyVisitedIntentHandler
}