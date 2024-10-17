const Alexa = require('ask-sdk-core');
const { S3PersistenceAdapter } = require('ask-sdk-s3-persistence-adapter'); // Correct import

const { FindDoctorByLocation, FindDoctorBySpecialty, FindDoctor } = require("./finddoctor");
const { LogRequestInterceptor, LogResponseInterceptor } = require("./interceptors");
const { ErrorHandler } = require('./errorhandler');
const { LaunchRequestHandler, HelpIntentHandler,CancelAndStopIntentHandler,SessionEndedRequestHandler,IntentReflectorHandler,FallbackHandler}=require('./otherhandlers');

const single_slot_intent_Handler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'single_slot_intent';
    },
    handle(handlerInput) {

        let dateofbirth = handlerInput.requestEnvelope.request.intent.slots.dateofbirth.value;
        console.log('date of birth received is ' + dateofbirth);
        return handlerInput.responseBuilder
            .speak(dateofbirth)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FindDoctorByLocation,
        FindDoctorBySpecialty,
        FallbackHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .addRequestInterceptors(LogRequestInterceptor) // Add the interceptor here
    .addResponseInterceptors(LogResponseInterceptor) // Add the interceptor here
    .withPersistenceAdapter(
        new S3PersistenceAdapter({ // Use the constructor correctly
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        })
    )
    .lambda();