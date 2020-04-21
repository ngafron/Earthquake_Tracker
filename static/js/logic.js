function createMap(quakeLocations) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: "pk.eyJ1IjoibmdhZnJvbiIsImEiOiJjazd3azI2NTEwM2Q3M2RxdTNxa3o0YzM3In0.PLONfIKTEAgoFlVGqZVRiQ"
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Quakes": quakeLocations
    };

    // Create the map object with options
    var map = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        layers: [lightmap, quakeLocations]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Adds Legend
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [1, 2, 3, 4, 5],
            labels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML += '<i style="background:' + chooseColor(grades[i]) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(map);
}

function createCircles(response) {

    // Pull the "stations" property off of response.data
    var quakes = response.features;
    console.log(quakes);
    // var quake = quakes[0].geometry.coordinates;
    // console.log(quake[0])

    // Initialize an array to hold bike markers
    var Circles = [];

    // Loop through the stations array
    for (var i = 0; i < quakes.length; i++) {
        var quake = quakes[i].geometry.coordinates;

        // For each station, create a marker and bind a popup with the station's name
        var Circle = L.circle([quake[1], quake[0]], {
                fillOpacity: .6,
                color: chooseColor(quakes[i].properties.mag),
                fillColor: chooseColor(quakes[i].properties.mag),
                radius: markerSize(quakes[i].properties.mag)
            })
            .bindPopup("<h3>" + quakes[i].properties.place + "<h3><h3>Magnitude: " + quakes[i].properties.mag + "</h3>");

        // Add the marker to the Circles array
        Circles.push(Circle);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(Circles));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson", createCircles);

//-----------------------------------------------------------//
function chooseColor(magnitude) {
    return magnitude > 5 ? "red" :
        magnitude > 4 ? "orange" :
        magnitude > 3 ? "gold" :
        magnitude > 2 ? "yellow" :
        magnitude > 1 ? "yellowgreen" :
        "greenyellow"; // <= 1 default
}

//----------------------------------------------------------------------------
// Function to amplify circle size by earthquake magnitude
//----------------------------------------------------------------------------
function markerSize(magnitude) {
    return magnitude * 80000;
}