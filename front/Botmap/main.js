const tarefas = document.getElementsByClassName('tarefas');

function AdicionarTarefa(e){
    e.preventDefault()
    // Criar um novo elemento <div>
    const minhaDiv = document.createElement('section');
    minhaDiv.className = 'section-tarefa'
    // P1
    const paragrafo1 = document.createElement('p');
    paragrafo1.textContent = 'Tarefa de Física.';

    // P2
    const paragrafo2 = document.createElement('p');
    paragrafo2.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia risus a dignissim venenatis. Nulla a eros a augue suscipit pharetra.';

    // Adicionar os parágrafos como filhos da div
    minhaDiv.appendChild(paragrafo1);
    minhaDiv.appendChild(paragrafo2);

    // Adicionar a div ao corpo (ou a outro elemento desejado)
    tarefas.appendChild(minhaDiv);
}

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