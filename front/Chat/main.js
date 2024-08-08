const chatBot = document.querySelector(".div-elementos-conversa");
const button = document.querySelector("#enviar");
const mensagem = document.getElementById("mensagem");

button.onclick = async function(e){
    e.preventDefault();
    let prompt = document.getElementById("mensagem").value;

    let data = {prompt}
    const response = await fetch(`http://localhost:3000/api/chat`, {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data),
    });
    
    console.log("post feito!")
    let content = await response.json();
    console.log(content);
    criarResposta(content);
}

function criarChat(msg) {
    card = `
        <p id="mensagem_user">${msg}</p>
      `;
    return card;
}

p1 = false

function criarResposta(retorno){
    card1 = `
        <p>${retorno}<p>
    `;
    return card1;
}

function texto(){
    chatBot.innerHTML += criarChat(mensagem.value);

    intervalo = setInterval(function() {
        chatBot.innerHTML += criarResposta();
        clearInterval(intervalo)
    }, 2000);
    
}