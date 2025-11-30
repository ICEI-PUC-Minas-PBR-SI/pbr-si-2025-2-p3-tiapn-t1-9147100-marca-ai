// Ativa ícones Lucide
lucide.createIcons();

// Verifica de onde o usuário veio (iniciar ou cadastro)
const params = new URLSearchParams(window.location.search);
const acao = params.get("acao"); // retorna 'iniciar' ou 'cadastro'

// Quando clicar em CLIENTE
document.getElementById("cliente").addEventListener("click", () => {
  if (acao === "cadastro") {
    window.location.href = "../Cliente/cadastro.html"; // tela de cadastro
  } else {
    window.location.href = "../Cliente/login.html"; // tela de login
  }
});

// Quando clicar em BARBEARIA
document.getElementById("barbearia").addEventListener("click", () => {
  if (acao === "cadastro") {
    window.location.href = "../Barbearia/cadastro.html"; // tela de cadastro
  } else {
    window.location.href = "../Barbearia/login.html"; // tela de login
  }
});
