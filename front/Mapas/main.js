const map = L.map('map').setView([-29.796508, -51.152714], 17);



const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
});

layer.addTo(map);

// Link do projeto: https://leafletjs.com/
// https://leaflet-extras.github.io/leaflet-providers/preview/