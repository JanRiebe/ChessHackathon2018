// RTM instance
RTM.logger.DEBUG = true;
var rtm = new RTM("wss://open-data.api.satori.com", "aB5aa04705293d70eEA6fE864Ed65a0E")

// create a new subscription with "your-channel" name
var channel = rtm.subscribe("USGS-Earthquakes", RTM.SubscriptionMode.SIMPLE)

channel.on("enter-subscribed", function() {
  // When subscription is established (confirmed by Satori RTM).
  console.log("Subscribed to the channel");
});

channel.on("rtm/subscribe/error", function(pdu) {
  // When a subscribe error occurs.
  console.log("Failed to subscribe: " + pdu.body.error + " - " + pdu.body.reason);
});

channel.on("rtm/subscription/data", function(pdu) {
    console.log(pdu)
  // Messages arrive in an array.
  pdu.body.messages.forEach(function(msg) {
    console.log("Animal is received: " + JSON.stringify(msg));
  });
})

// start the client
rtm.start()