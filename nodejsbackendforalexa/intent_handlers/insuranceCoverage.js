const Alexa = require("ask-sdk-core");
const { InsuranceCoveragefromDb } = require("../HelperClasses/DbHelper");

const InsuranceCoverageIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "insurance_coverage"
    );
  },
  async handle(handlerInput) {
    console.log("nagesh inside insurance_coverage intent ");
    let illness =
      handlerInput.requestEnvelope.request.intent.slots.illness.value;

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    attributes.illness = illness; // Example: Saving a user's name
    handlerInput.attributesManager.setSessionAttributes(attributes);

    if (attributes.city == null || attributes.maiden == null) {
      return handlerInput.responseBuilder
        .speak(
          `You need to first authenticate to continue. Please tell me your city of birth. And please repeat 
                    'my city of birth is xxx'`
        )
        .withShouldEndSession(false)
        .getResponse();
    } else {
      console.log(
        `city is ${attributes.city} and maiden is ${attributes.maiden}`
      );
    }

    return getCoverage.handle(handlerInput);
  },
};

const getCoverage = {
  async handle(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    var coverage = false;

    coverage = await InsuranceCoveragefromDb(attributes.illness);
    console.log("coverage returned is " + coverage);

    if (coverage) {
      return handlerInput.responseBuilder
        .speak(`${attributes.illness} is covered under your insurance`)
        .withShouldEndSession(false)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak(`${attributes.illness} is not covered under your insurance`)
        .withShouldEndSession(false)
        .getResponse();
    }
  },
};
module.exports = {
  InsuranceCoverageIntentHandler,
  getCoverage,
};
