// RTM instance
var rtm = new RTM("wss://open-data.api.satori.com", "aB5aa04705293d70eEA6fE864Ed65a0E")

// create a new subscription with "your-channel" name
var channel = rtm.subscribe("Twitter-statuses-sample", RTM.SubscriptionMode.SIMPLE)

channel.on("enter-subscribed", function() {
  // When subscription is established (confirmed by Satori RTM).
  console.log("Subscribed to the channel");

  window.heatmapData = new google.maps.MVCArray([])
  window.heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: true,
        map: map
    });

});

channel.on("rtm/subscribe/error", function(pdu) {
  // When a subscribe error occurs.
  console.log("Failed to subscribe: " + pdu.body.error + " - " + pdu.body.reason);
})

channel.on("rtm/subscription/data", function(pdu) {
  pdu.body.messages.forEach(function(msg) {
      if (!msg.created_at) return
      if (msg.lang !== "en") return
      if (!(/hey/g).test(msg.text)) return

      let tweet_data = {
          text: msg.text
      }

      display_tweet(tweet_data)
  });
})

// start the client
rtm.start()

// The JSON for an earthquake looks like this
/**
 * {"geometry":{"coordinates":[-122.7391663,38.7631683,1.2],"type":"Point"},"id":"nc72980201","type":"Feature","properties":{"dmin":0.01124,"code":"72980201","sources":",nc,","tz":-480,"mmi":null,"type":"earthquake","title":"M 1.3 - 2km SE of The Geysers, CA","magType":"md","nst":9,"sig":25,"tsunami":0,"mag":1.27,"alert":null,"gap":121,"rms":0.02,"place":"2km SE of The Geysers, CA","net":"nc","types":",geoserve,nearby-cities,origin,phase-data,scitech-link,","felt":null,"cdi":null,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc72980201","ids":",nc72980201,","time":1520430191430,"detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc72980201.geojson","updated":1520431743865,"status":"automatic"}}
 */



 function display_tweet(tweet_data) {
     console.log(tweet_data.text)
      
    
      var latLng = new google.maps.LatLng(earthquakeData.lon, earthquakeData.lat);

      /*
      var magnitude = earthquakeData.mag;
      var weightedLoc = {
          location: latLng,
          weight: Math.pow(4, magnitude)
      };*/

      heatmapData.push(latLng);
 }