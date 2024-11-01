const getCoverage = require('./insuranceCoverage').getCoverage;
const Alexa = require('ask-sdk-core');

const city_of_birth = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'city_of_birth';
    },
    async handle(handlerInput) {
        console.log('nagesh inside city_of_birth intent ');
        let user_city = handlerInput.requestEnvelope.request.intent.slots.city.value;

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        attributes.city = user_city; // Example: Saving a user's name
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak('City is ' + user_city + '. Please tell your mothers maiden name. And please repeat My mothers maiden name is xxx')
            .withShouldEndSession(false)
            .getResponse();
    }
};

const mother_maiden_name = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'mother_maiden_name';
    },
    async handle(handlerInput) {
        console.log('nagesh inside mother_maiden_name intent ');
        let maiden = handlerInput.requestEnvelope.request.intent.slots.maiden.value;

        const attributes = handlerInput.attributesManager.getSessionAttributes();
        if (attributes.city == null || attributes.city == undefined)
            return handlerInput.responseBuilder
                .speak(`You need to first authenticate to continue. Please tell me your city of birth. And please repeat 
            'my city of birth is xxx'`)
                .withShouldEndSession(false)
                .getResponse();

        attributes.maiden = maiden; // Example: Saving a user's name
        handlerInput.attributesManager.setSessionAttributes(attributes);

        if (attributes.city == "pune" && maiden == "green") {

            if (attributes.illness != null)
                return getCoverage.handle(handlerInput);

            return handlerInput.responseBuilder
                .speak('You are authorized now. You can ask for insurance coverage now.')
                .withShouldEndSession(false)
                .getResponse();
        }
        else
            return handlerInput.responseBuilder
                .speak('you have provided invalid city and maiden name. Please try again.')
                .withShouldEndSession(false)
                .getResponse();
    }
};

module.exports = {
    city_of_birth,
    mother_maiden_name
};