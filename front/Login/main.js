let button = document.getElementById("handleSubmit");

button.onclick = async function(e){
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    const data = {email, senha};
  
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {"Content-Type":"application/json;charset=UTF-8"},
      body: JSON.stringify(data)
    });
  
    const result = await response.json();
  
    if (result.success) {
      console.log(result.data)
      localStorage.setItem('userName', result.data[0].nome)
      window.location.href = "../Home/index.html";
    } else {
      alert(result.message);
    }
  }