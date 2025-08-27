const Alexa = require("ask-sdk-core");
const { getAllEvents } = require("../HelperClasses/DbHelper");
const ListEvents = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ListEvents"
    );
  },
  async handle(handlerInput) {
    try {
      const events = await getAllEvents();
      const msg = `You have ${events.length} unfinished events.`;
      return handlerInput.responseBuilder.speak(msg).getResponse();
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.name === "MongoError") {
        return handlerInput.responseBuilder
          .speak(
            "Sorry, I had trouble accessing your events. Please try again later."
          )
          .getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak("Sorry, something went wrong. Please try again later.")
          .getResponse();
      }
    }
  },
};

module.exports = {
  ListEvents,
};
