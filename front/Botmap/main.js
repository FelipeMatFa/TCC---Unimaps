const tarefas = document.getElementsByClassName('tarefas')[0];

const AdicionarTarefa = () => {
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