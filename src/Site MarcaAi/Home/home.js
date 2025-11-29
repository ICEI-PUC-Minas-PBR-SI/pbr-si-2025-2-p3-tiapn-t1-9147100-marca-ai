// Ativa os ícones do Lucide
lucide.createIcons();

// Botão INICIAR → Tipo de Acesso (ação = iniciar)
document.getElementById("btnIniciar").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=iniciar";
});

// Botão CADASTRO → Tipo de Acesso (ação = cadastro)
document.getElementById("btnCadastro").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=cadastro";
});

