lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {

  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    window.location.href = "../Home/home.html";
  });

 
  const cardAgendamentosHoje = document.querySelector(".cards .card");
  if (cardAgendamentosHoje) {
    cardAgendamentosHoje.addEventListener("click", () => {
      window.location.href = "agendamentos.html";
    });
  }

 
  document.getElementById("gerenciarProfissionais").addEventListener("click", () => {
    window.location.href = "profissionais.html";
  });

 
  document.getElementById("gerenciarServicos").addEventListener("click", () => {
    window.location.href = "servicos.html";
  });

  
  document.getElementById("perfilBarbearia").addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

 
  const nomeBarbearia = localStorage.getItem("nomeBarbearia") || "";
  if (nomeBarbearia) {
    document.getElementById("nomeBarbearia").textContent = nomeBarbearia;
  }


  document.getElementById("numAgendamentos").textContent = "0";
  document.getElementById("numProfissionais").textContent = "0";
  document.getElementById("numServicos").textContent = "0";
});
