Earthquake Tracker

Description:
- Utilizing an active earthquaker tracker, create a basic visualization with geoJSON data and leaflet. 
- Plot points on the visualization customized by the magnitude of the quake through size and color. 
- Use JavaScript, HTML, and CSS to complete the webpage visualization. 

```
function createCircles(response) {

    // Pull the "stations" property off of response.data
    var quakes = response.features;
    console.log(quakes);

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
```
