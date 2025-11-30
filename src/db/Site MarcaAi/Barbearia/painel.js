lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {

  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    window.location.href = "../Home/home.html";
  });

  // Card de agendamentos
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

  // Nome da barbearia no topo
  const nomeBarbearia = localStorage.getItem("nomeBarbearia") || "";
  if (nomeBarbearia) {
    document.getElementById("nomeBarbearia").textContent = nomeBarbearia;
  }

  // ID da barbearia
  const idBarbearia =
    localStorage.getItem("id_barbearia") ||
    localStorage.getItem("barbearia_id") ||
    localStorage.getItem("barbeariaId");

  if (!idBarbearia) {
    console.error("Nenhuma barbearia encontrada.");
    return;
  }

  // Buscar números do painel
  carregarInfosPainel(idBarbearia);
});

/* ================================
      BUSCAR INFORMAÇÕES DO PAINEL
================================ */
async function carregarInfosPainel(idBarbearia) {
  try {
    const res = await fetch(`api/painel_info.php?id_barbearia=${idBarbearia}`);
    const data = await res.json();

    if (!data.success) {
      console.error("Erro ao carregar painel:", data.message);
      return;
    }

    // Atualizar números no HTML
    document.getElementById("numProfissionais").textContent = data.dados.profissionais;
    document.getElementById("numServicos").textContent = data.dados.servicos;
    document.getElementById("numAgendamentos").textContent = data.dados.agendamentos;

  } catch (error) {
    console.error("Erro ao buscar informações:", error);
  }
}
