document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setActiveNavIcon("agendamentos");

  const container = document.getElementById("agendamentosContainer");
  const toastContainer = document.getElementById("toast-container");

  const idCliente = localStorage.getItem("cliente_id");

  if (!idCliente) {
    container.innerHTML = "<p style='color:#aaa;text-align:center;margin-top:2rem;'>Erro: cliente não identificado.</p>";
    return;
  }

  carregarAgendamentos();

  async function carregarAgendamentos() {
    try {
      const res = await fetch(`api/listar_agendamentos.php?id_cliente=${idCliente}`);
      const data = await res.json();

      if (!data.success || data.agendamentos.length === 0) {
        container.innerHTML = "<p style='color:#aaa;text-align:center;margin-top:2rem;'>Nenhum agendamento encontrado.</p>";
        return;
      }

      renderAgendamentos(data.agendamentos);

    } catch (err) {
      console.error("Erro ao carregar:", err);
      container.innerHTML = "<p style='color:#aaa;text-align:center;margin-top:2rem;'>Erro ao carregar agendamentos.</p>";
    }
  }

  // 🔥 FUNÇÃO PARA EXIBIR OS AGENDAMENTOS
  function renderAgendamentos(lista) {
    container.innerHTML = "";

    lista.forEach(a => {
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
          <p><i data-lucide="clock"></i> ${a.hora}</p>
          <p><i data-lucide="user"></i> ${a.profissional}</p>
        </div>

        <div class="card-footer">
          <span class="card-preco">R$ ${Number(a.valor).toFixed(2)}</span>
          <div class="card-acoes">
            <button class="btn-cancelar" data-id="${a.id}">
              <i data-lucide="x"></i> Cancelar
            </button>

            <button class="btn-reagendar" data-info='${JSON.stringify(a)}'>
              <i data-lucide="refresh-ccw"></i> Reagendar
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    lucide.createIcons();

    adicionarEventos();
  }

  // 🔥 ADICIONA EVENTOS AOS BOTÕES
  function adicionarEventos() {

    // CANCELAR
    document.querySelectorAll(".btn-cancelar").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        if (!confirm("Tem certeza que deseja cancelar este agendamento?"))
          return;

        try {
          const formData = new FormData();
          formData.append("id", id);

          const res = await fetch("api/cancelar_agendamento.php", {
            method: "POST",
            body: formData
          });

          const data = await res.json();

          if (data.success) {
            showToast("Agendamento cancelado!");
            carregarAgendamentos();
          } else {
            showToast("Erro ao cancelar", "erro");
          }

        } catch (err) {
          console.error(err);
          showToast("Erro no servidor", "erro");
        }
      });
    });

    // REAGENDAR
    document.querySelectorAll(".btn-reagendar").forEach(btn => {
      btn.addEventListener("click", () => {

        const dados = JSON.parse(btn.dataset.info);

        // SALVA DADOS NO LOCALSTORAGE PARA AGENDAR.HTML
        localStorage.setItem("reagendar_servico", dados.servico);
        localStorage.setItem("reagendar_profissional", dados.profissional);
        localStorage.setItem("reagendar_data", dados.data);
        localStorage.setItem("reagendar_hora", dados.hora);

        // REDIRECIONA
        window.location.href = "agendar.html";
      });
    });
  }

  // TOAST
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
