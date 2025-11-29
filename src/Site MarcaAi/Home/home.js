lucide.createIcons();

document.getElementById("btnIniciar").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=iniciar";
});

document.getElementById("btnCadastro").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=cadastro";
});

