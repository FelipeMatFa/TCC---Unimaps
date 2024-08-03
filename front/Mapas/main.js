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

formulario.onsubmit = async function(e){
    e.preventDefault();
    let titulo     = document.getElementById("titulo").value;
    let descricao  = document.getElementById("descricao").value;
    let suaLatitude = localStorage.getItem('latitude');
    let suaLongitude = localStorage.getItem('longitude');

    let data     = {titulo,descricao,suaLatitude,suaLongitude}
    const response = await fetch('http://localhost:3000/api/marcarLugar', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data),
    });

    let content = await response.json();
}

window.onload = async function(e){
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/listarLugares', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"},
    });

    let content = await response.json();
    console.log(content)
    criar(content)
}

// LISTAR OS MARCADORES
function criar(marcadores){
    console.log(marcadores.data)
    marcadores.data.forEach(marcador => {
        console.log(marcador)
        const marker = L.marker([parseFloat(marcador.latitude), parseFloat(marcador.longitude)]);
        marker.addTo(map);
        
        marker.bindPopup(marcador.titulo);
    });
}

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
});

// PEGAR E ATUALIZAR A LOCALIZAÇÃO DO USUÁRIO
function atualizarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Linha única para definir um ícone com cor
    L.marker([lat, lon], { icon: L.divIcon({ className: 'custom-icon', html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid black;"></div>', iconSize: [12, 12] }) }).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();

    map.setView([lat, lon], 13);
    localStorage.setItem('latitude', lat);
    localStorage.setItem('longitude', lon);
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