const Alexa = require('ask-sdk-core');
const { S3PersistenceAdapter } = require('ask-sdk-s3-persistence-adapter'); // Correct import

const { FindDoctorByLocation, FindDoctorBySpecialty, FindDoctor } = require("./intent_handlers/finddoctor")
const { InsuranceCoverageIntentHandler } = require("./intent_handlers/insuranceCoverage");
const {TherapyVisitedIntentHandler}=require("./intent_handlers/therapy");
const { LogRequestInterceptor, LogResponseInterceptor } = require("./intent_handlers/interceptors");
const { ErrorHandler } = require('./intent_handlers/errorhandler');
const { LaunchRequestHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, IntentReflectorHandler, FallbackHandler } = require('./intent_handlers/otherhandlers');
const { city_of_birth, mother_maiden_name } =require('./intent_handlers/authorize');

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FindDoctor,
        FindDoctorByLocation,
        FindDoctorBySpecialty,
        city_of_birth, mother_maiden_name, InsuranceCoverageIntentHandler,
        TherapyVisitedIntentHandler,
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