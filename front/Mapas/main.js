const map = L.map('map').setView([51.505, -0.09], 13);

const button = document.querySelector("#botao-adicionar-local");
button.onclick = () => {
    const marker = L.marker([50, -50]);
    marker.addTo(map);
    marker.bindPopup('Restaurante Universitário').openPopup();
}

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
});

function atualizarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    L.marker([lat, lon]).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();

    map.setView([lat, lon], 13);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(atualizarLocalizacao);
} else {
    alert('Geolocalização não é suportada por este navegador.');
}
layer.addTo(map);

// Link do projeto: https://leafletjs.com/
// https://leaflet-extras.github.io/leaflet-providers/preview/
setTimeout(atualizarLocalizacao,1000)