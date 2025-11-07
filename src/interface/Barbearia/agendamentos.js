

// Função que futuramente vai buscar da API:
async function carregarAgendamentos() {

  // Exemplo temporário (mock): APENAS VISUAL
  // ALTERAR AQUI TAMBÉMMMMM - backend tem que substituir isso por uma chamada real
  const agendamentosHoje = [
    {
      cliente: "João Henrique",
      horario: "09:00",
      dia: "Hoje",
      servico: "Corte Masculino",
      profissional: "Pedro Santos"
    },
    {
      cliente: "Marcos Pereira",
      horario: "10:30",
      dia: "Hoje",
      servico: "Barba Completa",
      profissional: "João Silva"
    },
    {
      cliente: "Thiago Lima",
      horario: "13:15",
      dia: "Hoje",
      servico: "Corte + Barba",
      profissional: "Pedro Santos"
    }
  ];

  montarCards(agendamentosHoje);
}

function montarCards(lista){
  const container = document.getElementById("listaAgendamentos");
  container.innerHTML = "";

  if(lista.length === 0){
    container.innerHTML = `
      <div style="text-align:center; margin-top:40px; color:#aaa;">
        Nenhum agendamento para hoje.
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
        <span><b>Horário:</b> ${ag.horario}</span>
        <span><b>Dia:</b> ${ag.dia}</span>
        <span><b>Serviço:</b> ${ag.servico}</span>
        <span><b>Profissional:</b> ${ag.profissional}</span>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", carregarAgendamentos);
