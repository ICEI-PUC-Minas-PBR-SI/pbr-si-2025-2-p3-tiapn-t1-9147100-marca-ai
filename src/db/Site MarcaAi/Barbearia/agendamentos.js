document.addEventListener("DOMContentLoaded", carregarAgendamentos);

async function carregarAgendamentos() {
  // PEGAR CORRETAMENTE O ID DA BARBEARIA
  const idBarbearia =
    localStorage.getItem("id_barbearia") ||
    localStorage.getItem("barbearia_id");

  console.log("ID BARBEARIA CARREGADO:", idBarbearia);

  if (!idBarbearia) {
    console.error("⚠ Nenhuma barbearia logada.");
    return;
  }

  try {
    const resposta = await fetch(
      `api/listar_agendamentos.php?id_barbearia=${idBarbearia}`
    );

    const data = await resposta.json();
    console.log("Agendamentos recebidos:", data);

    if (!data.success) {
      console.error("Erro ao carregar agendamentos:", data.message);
      return;
    }

    montarCards(data.agendamentos);

  } catch (erro) {
    console.error("Erro ao buscar agendamentos:", erro);
  }
}

function montarCards(lista) {
  const container = document.getElementById("listaAgendamentos");
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; margin-top:40px; color:#aaa;">
        Nenhum agendamento encontrado.
      </div>`;
    return;
  }

  lista.forEach(ag => {
    const card = document.createElement("div");
    card.className = "ag-card";

    card.innerHTML = `
      <div class="ag-topo">
        <div class="ag-icon">
          <i data-lucide="calendar-clock"></i>
        </div>

        <div class="ag-nome">${ag.cliente}</div>
      </div>

      <div class="ag-info">
        <span><b>Data:</b> ${ag.data_agenda}</span>
        <span><b>Horário:</b> ${ag.hora}</span>
        <span><b>Serviço:</b> ${ag.servico}</span>
        <span><b>Profissional:</b> ${ag.profissional}</span>
        <span><b>Status:</b> ${ag.status}</span>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}
