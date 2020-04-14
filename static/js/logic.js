function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Bike Stations": bikeStations
    };

    // Create the map object with options
    var map = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 12,
        layers: [lightmap, bikeStations]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var stations = response.data.stations;

    // Initialize an array to hold bike markers
    var Markers = [];

    // Loop through the stations array
    for (var index = 0; index < stations.length; index++) {
        var station = stations[index];

        // For each station, create a marker and bind a popup with the station's name
        var Marker = L.marker([station.lat, station.lon])
            .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

        // Add the marker to the bikeMarkers array
        Markers.push(Marker);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(bikeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson", createCircles);

//-----------------------------------------------------------//
var marker = L.marker([51.5, -0.09]).addTo(mymap);

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);