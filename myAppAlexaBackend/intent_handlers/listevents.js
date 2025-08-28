const Alexa = require("ask-sdk-core");
const { getAllEvents } = require("../HelperClasses/DbHelper");

const ListEvents = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "ListAllEvents" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "ListActiveEvents")
    );
  },
  async handle(handlerInput) {
    var activeEventsOnly =
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ListActiveEvents";
    try {
      const msg = await getAllEvents({
        showActiveEventsOnly: activeEventsOnly,
      });

      return handlerInput.responseBuilder
        .speak(msg)
        .reprompt("Would you like to continue?")
        .getResponse();
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.name === "MongoError") {
        return handlerInput.responseBuilder
          .speak(
            "Sorry, I had trouble accessing your events. MongoError. Please try again later."
          )
          .reprompt("Would you like to continue?")

          .getResponse();
      } else {
        return handlerInput.responseBuilder
          .speak(
            "Sorry, something went wrong. Error in listEvents intent. Please try again later."
          )
          .reprompt("Would you like to continue?")

          .getResponse();
      }
    }
  },
};

module.exports = {
  ListEvents,
};
