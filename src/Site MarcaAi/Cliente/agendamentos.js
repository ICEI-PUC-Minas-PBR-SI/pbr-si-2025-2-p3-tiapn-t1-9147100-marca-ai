document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setActiveNavIcon("agendamentos");

  const container = document.getElementById("agendamentosContainer");
  const toastContainer = document.getElementById("toast-container");

  // Recupera agendamentos do localStorage (vindos da tela Agendar)
  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function renderAgendamentos() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      container.innerHTML = "<p style='color:#aaa;text-align:center;margin-top:2rem;'>Nenhum agendamento encontrado.</p>";
      return;
    }

    agendamentos.forEach((a, index) => {
      const card = document.createElement("div");
      card.className = "card-agendamento";
      card.innerHTML = `
        <div class="card-header">
          <div>
            <h2>${a.barbearia}</h2>
            <p class="card-servico">${a.servico}</p>
          </div>
        </div>

        <div class="card-detalhes">
          <p><i data-lucide="calendar"></i> ${a.data}</p>
          <p><i data-lucide="clock"></i> ${a.horario}</p>
          <p><i data-lucide="user"></i> ${a.profissional}</p>
        </div>

        <div class="card-footer">
          <span class="card-preco">${a.valor}</span>
          <div class="card-acoes">
            <button class="btn-cancelar"><i data-lucide="x"></i> Cancelar</button>
            <button class="btn-reagendar"><i data-lucide="refresh-ccw"></i> Reagendar</button>
          </div>
        </div>
      `;

      // Cancelar
      card.querySelector(".btn-cancelar").addEventListener("click", () => {
        agendamentos.splice(index, 1);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        showToast("❌ Agendamento cancelado");
        setTimeout(() => (window.location.href = "barbearias.html"), 1200);
      });

      // Reagendar
      card.querySelector(".btn-reagendar").addEventListener("click", () => {
        agendamentos.splice(index, 1);
        localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
        showToast("📅 Agende um novo horário");
        setTimeout(() => (window.location.href = "barbearias.html"), 1200);
      });

      container.appendChild(card);
    });

    lucide.createIcons();
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  renderAgendamentos();
});
