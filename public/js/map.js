// Initiate and authenticate your connection to the HERE platform:

const lat = listing.coordinate.lat;
const lng = listing.coordinate.lng;

const platform = new H.service.Platform({
  apikey: mapApi,
});
// Initialize the engine type:
const engineType = H.Map.EngineType["HARP"];
// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers({
  engineType,
});
// Instantiate (and display) a map:
const map = new H.Map(
  document.getElementById("mapContainer"),
  defaultLayers.vector.normal.map,
  {
    engineType,
    zoom: 10,
    center: {
      lat: lat,
      lng: lng,
    },
  }
);

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
window.addEventListener("resize", () => map.getViewPort().resize());
const ui = H.ui.UI.createDefault(map, defaultLayers);
const markerCoordinates = { lat: lat, lng: lng };
const marker = new H.map.Marker(markerCoordinates);
map.addObject(marker);
map.setCenter(markerCoordinates);
const infoBubble = new H.ui.InfoBubble(markerCoordinates, {
  content: `<span> <h4 style="color:black">${listing.title}</h4> Exact Location will be provided after booking</span></div>`,
});

// Add the popup to the UI
ui.addBubble(infoBubble);

// Optionally, show the popup when the marker is clicked
marker.addEventListener("tap", function () {
  infoBubble.open();
});
