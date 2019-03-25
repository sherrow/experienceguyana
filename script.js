// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L, Mustache */

var map = L.map('map').setView([34.03, -82.20], 5);

// Get the popup template from the HTML.
//
// We can do this here because the template will never change.
var popupTemplate = document.querySelector('.popup-template').innerHTML;
var Hotel = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fhotel.png?1553052383930',
    iconSize: [20, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [8, 9],
    shadowAnchor: [22, 94]
});
var IndigeousVillage = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Findian.png?1553052244876',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
var Beach = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fsunbed.png?1551667140336',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
var Nature = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fforest.png?1551667140059',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  
});
var Resort = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fswim.png?1551667140415',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
var InteriorLodge = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fwood-house.png?1551667140536',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
var HistoricalSite = L.icon({
    iconUrl: 'https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fgreek-column.png?1551667139978',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

		
 var tourismData 

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  maxZoom: 18
}).addTo(map);

// function loadData(Category) {
//   // First clear the data from our GeoJSON layer
//       tourismData.clearLayers();
  
// var quotedCategorys = [];
//   categoryCheckboxes.forEach(function (Category) {
//     quotedCategorys.push("'" + Category + "'");
//   });
  
fetch('https://cdn.glitch.com/4a1d83f5-da2d-4d99-84a7-4a4b4b4f9400%2Fguyanadata2.geojson?1553074532060')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
       console.log (data);
  
                       
//     // Create the Leaflet layer for the data 
         tourismData = L.geoJson(data,{ 
      
      pointToLayer: function (geoJsonPoint, latlng) {
        console.log(geoJsonPoint);
        if (geoJsonPoint.properties.Category === "Resort")
        return L.marker(latlng, {icon:Resort}).addTo(map).bindPopup("Resort");
                
        else if(geoJsonPoint.properties.Category === "Beach")
        return L.marker(latlng, {icon:Beach}).addTo(map).bindPopup("Beach");
        
        else if(geoJsonPoint.properties.Category === "Hotel")
        return L.marker(latlng, {icon:Hotel}).addTo(map).bindPopup("Hotel");
        
        else if(geoJsonPoint.properties.Category === "Indigenous Village")
        return L.marker(latlng, {icon:IndigeousVillage}).addTo(map).bindPopup("Indigenous Village");
        
        else if(geoJsonPoint.properties.Category === "Nature")
        return L.marker(latlng, {icon:Nature}).addTo(map).bindPopup("Nature",{maxWidth: "auto"});
        
        else if(geoJsonPoint.properties.Category === "Interior Lodge")
        return L.marker(latlng, {icon:InteriorLodge}).addTo(map).bindPopup("Interior Lodge");
        
        else if(geoJsonPoint.properties.Category === "Historical Site")
        return L.marker(latlng, {icon:HistoricalSite}).addTo(map).bindPopup("Historical Site");
        
        
     },
     
    
      onEachFeature: function (feature, layer) {
        layer.on('click', function () {
          // This function is called whenever a feature on the layer is clicked
          console.log(layer.feature.properties);

          // Render the template with all of the properties. Mustache ignores properties
          // that aren't used in the template, so this is fine.
          var sidebarContentArea = document.querySelector('.sidebar-content');
          console.log(sidebarContentArea);
          sidebarContentArea.innerHTML = Mustache.render(popupTemplate, layer.feature.properties);
        });
                       
      }
   
      
    });
   // tourismData.addData(tourismMarker);
  tourismData.addTo(map);
  // // Move the map view so that the tourismData is visible
   
   map.fitBounds(tourismData.getBounds());
  });



//  function getCheckedCategorys() {
//   var checkedCategorys = [];
  
//   // Look at each boroughCheckbox
//   categoryCheckboxes.forEach(function(categoryCheckbox) {
//     // If it is checked...
//     if (categoryCheckbox.checked) {
//       // ...add its borough value to the array of checkedBoroughs
//       checkedCategorys.push(categoryCheckbox.dataset.borough);
//     }
//   });
  
//   // Return the checkedBoroughs so we can filter on them
//   return checkedCategorys;
// }

// Select all of the boroughCheckboxes
// var categoryCheckboxes = document.querySelectorAll('.category-checkbox');

// // Add an event listener to each boroughCheckbox
// categoryCheckboxes.forEach(function (categoryCheckbox) {
//   categoryCheckbox.addEventListener('change', function () {
//     loadData(getCheckedCategorys());
//   });
// });

 
    // Add data to the map
    // tourismData.addTo(map);
  
   
  
