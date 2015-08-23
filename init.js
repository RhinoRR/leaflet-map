$(function() {

    var lightAll = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });
    var lightNoLabels = new L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });

    // style the town geojson outlines
    function style(feature) {
      return {
          color: 'red',
          weight: 1,
          fillOpacity: 0
      };
    }
    // create town popup info
    function onEachPolygon( feature, layer) {
      layer.bindPopup(feature.properties.Town)
    }

    var towns = L.geoJson(townBorders, {
      style: style,
      onEachFeature: onEachPolygon
    });

    // Initiating the Leaflet map
    var map = new L.Map('map', {
      center: [41.76, -72.67],
      zoom: 11,
      zoomControl: false, // add later
      layers: [lightAll, towns], // default display
      scrollWheelZoom: false
    });

    // customize source link to your GitHub repo
    map.attributionControl
    .setPrefix('View <a href="http://github.com/jackdougherty/leaflet">code on GitHub</a>, created with <a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

    // use only if multiple basemap options to display
    // var basemaps = {
    //   "lightAll": lightAll,
    //   "lightNoLabels" : lightNoLabels
    // };

    var overlays = {
      "Connecticut Towns": towns
    };

    // display layer control -- option to insert "basemaps" if multiple options to display
    L.control.layers( null, overlays, {
      position: "topleft",
      collapsed: false // keep open on startup
    }).addTo(map);

    L.control.zoom({position: "topright"}).addTo(map);

  }); // end of entire function
