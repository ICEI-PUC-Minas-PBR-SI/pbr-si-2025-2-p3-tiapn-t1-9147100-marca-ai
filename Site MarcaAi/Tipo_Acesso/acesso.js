lucide.createIcons();

const params = new URLSearchParams(window.location.search);
const acao = params.get("acao"); 

document.getElementById("cliente").addEventListener("click", () => {
  if (acao === "cadastro") {
    window.location.href = "../Cliente/cadastro.html";
  } else {
    window.location.href = "../Cliente/login.html"; 
  }
});

document.getElementById("barbearia").addEventListener("click", () => {
  if (acao === "cadastro") {
    window.location.href = "../Barbearia/cadastro.html"; 
  } else {
    window.location.href = "../Barbearia/login.html"; 
  }
});
