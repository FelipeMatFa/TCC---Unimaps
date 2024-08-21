const chatBot = document.querySelector(".div-elementos-conversa");
const button = document.querySelector("#enviar");
const mensagem = document.getElementById("mensagem");
const chat = document.getElementById("mensagem-chat");

chat.onsubmit = async function(e) {
    e.preventDefault();
    let prompt = mensagem.value;

    let data = { prompt };
    const response = await fetch(`http://localhost:3000/api/chat`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data),
    });
    
    let content = await response.json();

    if (content.data) {
        let retorno = content.data;
        criarResposta(retorno);
    } else {
        console.log("Deu erro!");
    }
}

function criarChat(msg) {
    mensagem.value = "";
    return `
        <p id="mensagem_user">${msg}</p>
    `;
}

function criarResposta(retorno) {
    let prompt = retorno.replace(/\*\*/g, '<br><br>');
    prompt = prompt.replace(/\*/g, '<br>'); 
    const respostaHTML = `
        <p>${prompt}</p>
    `;
    texto(respostaHTML); // Passa a resposta para a função texto
}


function texto(respostaHTML) {
    chatBot.innerHTML += criarChat(mensagem.value); // Adiciona a mensagem do usuário
    setTimeout(function() {
        chatBot.innerHTML += respostaHTML; // Adiciona a resposta após um atraso
    }, 1000);
}
