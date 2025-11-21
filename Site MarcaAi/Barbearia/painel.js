lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
  // Botão de sair (voltando para a Home) 
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    window.location.href = "../Home/home.html";
  });

  // Agendamentos Hoje 
  const cardAgendamentosHoje = document.querySelector(".cards .card");
  if (cardAgendamentosHoje) {
    cardAgendamentosHoje.addEventListener("click", () => {
      window.location.href = "agendamentos.html";
    });
  }

  // Navegação para Profissionais
  document.getElementById("gerenciarProfissionais").addEventListener("click", () => {
    window.location.href = "profissionais.html";
  });

  // Navegação para Serviços
  document.getElementById("gerenciarServicos").addEventListener("click", () => {
    window.location.href = "servicos.html";
  });

  // Navegação para Perfil
  document.getElementById("perfilBarbearia").addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

  // Exibição dinâmica de dados
  const nomeBarbearia = localStorage.getItem("nomeBarbearia") || "";
  if (nomeBarbearia) {
    document.getElementById("nomeBarbearia").textContent = nomeBarbearia;
  }

  // Dados simulados (backend futuramente)
  document.getElementById("numAgendamentos").textContent = "0";
  document.getElementById("numProfissionais").textContent = "0";
  document.getElementById("numServicos").textContent = "0";
});
