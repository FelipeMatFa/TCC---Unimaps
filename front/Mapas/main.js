const map = L.map('map').setView([51.505, -0.09], 13);
const button = document.getElementById('botao-adicionar-local');
const formulario = document.getElementById('formularioLugares');

button.onclick = function(){
    if(formulario.style.display === 'none'){
        formulario.style.display = 'flex'
    }
    else{
        formulario.style.display = 'none'
    }
}

button.onsubmit = async function(e){
    e.preventDefault();
    let titulo     = document.getElementById("titulo").value;
    let descricao  = document.getElementById("descricao").value;

    let data     = {titulo,descricao}
    const response = await fetch('http://localhost:3000/api/marcarLugar', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data),
    });

    let content = await response.json();
}

// button.onclick = () => {
//     const marker = L.marker([50, -50]);
//     marker.addTo(map);
//     marker.bindPopup('Restaurante Universitário').openPopup();
// }

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
});

function atualizarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Linha única para definir um ícone com cor
    L.marker([lat, lon], { icon: L.divIcon({ className: 'custom-icon', html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid black;"></div>', iconSize: [12, 12] }) }).addTo(map)
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