const map = L.map('map').setView([51.505, -0.09], 13);
const button = document.getElementById('botao-adicionar-local');
const formulario = document.getElementById('formularioLugares');
const listaLugares = document.querySelector(".main-segunda-div");
const chatIA = document.querySelector(".main-terceira-div");



formulario.onsubmit = async function(e){
    e.preventDefault();
    let titulo     = document.getElementById("titulo").value;
    let descricao  = document.getElementById("descricao").value;
    let suaLatitude = sessionStorage.getItem('latitude');
    let suaLongitude = sessionStorage.getItem('longitude');
    let id = sessionStorage.getItem('id');

    let data     = {titulo,descricao,suaLatitude,suaLongitude,id}
    const response = await fetch('http://localhost:3000/api/marcarLugar', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data),
    });

    let content = await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    let id = sessionStorage.getItem('id');

    if (id) {
        const response = await fetch(`http://localhost:3000/api/listarLugaresMapa?id=${id}`, {
            method: "GET",
            headers: {"Content-type": "application/json;charset=UTF-8"},
        });

        let content = await response.json();
        criar(content);
        criarLista(content);
    } else {
        console.error("ID não encontrado no localStorage");
    }
});

// LISTAR OS MARCADORES
function criar(marcadores){
    marcadores.data.forEach(marcador => {
        const marker = L.marker([parseFloat(marcador.latitude), parseFloat(marcador.longitude)]);
        marker.addTo(map);
        
        marker.bindPopup(marcador.titulo);
    });
}

function criarLista(informacoes){
    informacoes.data.forEach(informacao => {

        const card = document.createElement('section');
        card.className = "informacoes-card"

        const img = document.createElement('img');
        img.src = '../../assets/fundo-universidade.png'
        img.className = "informacoes-card_imagem"

        const titulo = document.createElement('h2')
        titulo.textContent = informacao.titulo;
        titulo.className = "informacoes-card_div-titulo"

        const descricao = document.createElement('p')
        descricao.textContent = informacao.descricao;
        descricao.className = "informacoes-card_div-descricao"

        const div = document.createElement('div');
        titulo.className = "informacoes-card_div"

        div.appendChild(titulo)
        div.appendChild(descricao)
        card.appendChild(img)
        card.appendChild(div)
        listaLugares.appendChild(card)

    });
}

const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
});

// PEGAR E ATUALIZAR A LOCALIZAÇÃO DO USUÁRIO
function atualizarLocalizacao(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    L.marker([lat, lon], { icon: L.divIcon({ className: 'custom-icon', html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid black;"></div>', iconSize: [12, 12] }) }).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();

    map.setView([lat, lon], 13);
    sessionStorage.setItem('latitude', lat);
    sessionStorage.setItem('longitude', lon);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(atualizarLocalizacao);
} else {
    alert('Geolocalização não é suportada por este navegador.');
}
layer.addTo(map);

setTimeout(atualizarLocalizacao,1000)