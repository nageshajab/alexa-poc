const Alexa = require('ask-sdk-core');
/**
 * Request Interceptor to log the request sent by Alexa
 */
const LogRequestInterceptor = {
    process(handlerInput) {
      // Log Request
      console.log(`nagesh request Interceptor ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
  }
  /**
   * Response Interceptor to log the response made to Alexa
   */
  const LogResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`nagesh response Interceptor ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
  }

  module.exports = { LogRequestInterceptor, LogResponseInterceptor };