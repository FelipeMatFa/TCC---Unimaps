let button = document.getElementById("handleSubmit");

button.onclick = async function(e){
    e.preventDefault();
    let nome     = document.getElementById("nome").value;
    let senha     = document.getElementById("senha").value;
    let email    = document.getElementById("email").value;

    let data     = {nome,senha,email}

    const response = await fetch('http://localhost:3000/api/usuario/cadastro', {
        method: "POST",
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify(data),
    });

    let content = await response.json();

    if(content.success){
        alert("Usuário cadastrado com sucesso!")
        window.location.href = "../Home/index.html"
    } else {
        alert("Não foi possivel fazer o cadastro, tente novamente");
    }
}