const Alexa = require("ask-sdk-core");
const { S3PersistenceAdapter } = require("ask-sdk-s3-persistence-adapter"); // Correct import

const { ListEvents } = require("./intent_handlers/listevents");
const {
  LogRequestInterceptor,
  LogResponseInterceptor,
} = require("./intent_handlers/interceptors");
const { ErrorHandler } = require("./intent_handlers/errorhandler");
const {
  LaunchRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
  FallbackHandler,
} = require("./intent_handlers/otherhandlers");

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ListEvents,
    FallbackHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(LogRequestInterceptor) // Add the interceptor here
  .addResponseInterceptors(LogResponseInterceptor) // Add the interceptor here
  .withPersistenceAdapter(
    new S3PersistenceAdapter({
      // Use the constructor correctly
      bucketName: process.env.S3_PERSISTENCE_BUCKET,
    })
  )
  .lambda();
