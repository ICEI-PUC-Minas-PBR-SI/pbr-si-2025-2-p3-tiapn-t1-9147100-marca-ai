
let idBarbearia = localStorage.getItem("barbearia_id");

if (!idBarbearia) idBarbearia = localStorage.getItem("id_barbearia");


console.log("ID da barbearia carregado:", idBarbearia);

if (!idBarbearia) {
  alert("Nenhuma barbearia selecionada!");
  window.location.href = "barbearias.html";
}




document.addEventListener("DOMContentLoaded", async () => {
  lucide.createIcons();

  const listaServicos = document.getElementById("listaServicos");
  const listaProfissionais = document.getElementById("listaProfissionais");
  const listaHorarios = document.getElementById("listaHorarios");
  const campoData = document.getElementById("data");
  const btnConfirmar = document.getElementById("btnConfirmar");

  let servicoSelecionado = null;
  let profissionalSelecionado = null;
  let dataSelecionada = null;
  let horarioSelecionado = null;



  
  async function carregarServicos() {
    try {
      const res = await fetch(`api/getServicos.php?action=listar&id=${idBarbearia}`);
      const data = await res.json();

      console.log("SERVIÇOS RECEBIDOS:", data);

      listaServicos.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        listaServicos.innerHTML = "<p>Nenhum serviço cadastrado.</p>";
        return;
      }

      data.forEach((servico) => {
        const card = document.createElement("div");
        card.classList.add("card-item");

        card.innerHTML = `
          <div class="card-info">
            <h3>${servico.nome_servico}</h3>
            <p>R$ ${Number(servico.preco).toFixed(2)}</p>
          </div>
          <button class="btn-selecionar-servico" data-id="${servico.id_servico}">
            Selecionar
          </button>
        `;

        listaServicos.appendChild(card);
      });

      document.querySelectorAll(".btn-selecionar-servico").forEach((btn) => {
        btn.addEventListener("click", () => {
          servicoSelecionado = btn.getAttribute("data-id");
          console.log("SERVIÇO SELECIONADO:", servicoSelecionado);

          carregarProfissionais();
        });
      });

    } catch (err) {
      console.error("Erro ao carregar serviços:", err);
    }
  }



  // ============================
  // 2) CARREGAR PROFISSIONAIS
  // ============================
  async function carregarProfissionais() {
    try {
      const res = await fetch(`api/getProfissionais.php?action=listar&id=${idBarbearia}`);
      const data = await res.json();

      console.log("PROFISSIONAIS RECEBIDOS:", data);

      listaProfissionais.innerHTML = "";

      if (!Array.isArray(data) || data.length === 0) {
        listaProfissionais.innerHTML = "<p>Nenhum profissional cadastrado.</p>";
        return;
      }

      data.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("card-item");

        card.innerHTML = `
          <div class="card-info">
            <h3>${p.nome_profissional}</h3>
            <p>${p.especialidade}</p>
          </div>
          <button class="btn-selecionar-prof" data-id="${p.id_profissional}">
            Selecionar
          </button>
        `;

        listaProfissionais.appendChild(card);
      });

      document.querySelectorAll(".btn-selecionar-prof").forEach((btn) => {
        btn.addEventListener("click", () => {
          profissionalSelecionado = btn.getAttribute("data-id");
          console.log("PROFISSIONAL SELECIONADO:", profissionalSelecionado);

          if (dataSelecionada) carregarHorarios();
        });
      });

    } catch (err) {
      console.error("Erro ao carregar profissionais:", err);
    }
  }



  // ============================
  // 3) CARREGAR HORÁRIOS
  // ============================
  async function carregarHorarios() {
    if (!profissionalSelecionado || !dataSelecionada) {
      listaHorarios.innerHTML = "<p>Selecione profissional e data.</p>";
      return;
    }

    listaHorarios.innerHTML = "<p>Carregando horários...</p>";

    const res = await fetch(
      `api/getHorarios.php?id_profissional=${profissionalSelecionado}&data=${dataSelecionada}`
    );

    const horarios = await res.json();
    console.log("HORÁRIOS DISPONÍVEIS:", horarios);

    listaHorarios.innerHTML = "";

    if (!Array.isArray(horarios) || horarios.length === 0) {
      listaHorarios.innerHTML = "<p>Nenhum horário disponível.</p>";
      return;
    }

    horarios.forEach((h) => {
      const btn = document.createElement("button");
      btn.classList.add("btn-horario");
      btn.textContent = h;

      btn.addEventListener("click", () => {
        horarioSelecionado = h;
        console.log("HORÁRIO SELECIONADO:", horarioSelecionado);

        document.querySelectorAll(".btn-horario").forEach((x) =>
          x.classList.remove("selected")
        );

        btn.classList.add("selected");
        btnConfirmar.disabled = false;
      });

      listaHorarios.appendChild(btn);
    });
  }



  // ============================
  // 4) SELETOR DE DATA
  // ============================
  campoData.addEventListener("change", () => {
    dataSelecionada = campoData.value;
    console.log("DATA SELECIONADA:", dataSelecionada);

    if (profissionalSelecionado) carregarHorarios();
  });



  // ============================
  // 5) CONFIRMAR AGENDAMENTO
  // ============================
  btnConfirmar.addEventListener("click", () => {
    if (!servicoSelecionado || !profissionalSelecionado || !dataSelecionada || !horarioSelecionado) {
      alert("Selecione todas as etapas!");
      return;
    }

    console.log("AGENDAMENTO FINAL:", {
      servicoSelecionado,
      profissionalSelecionado,
      dataSelecionada,
      horarioSelecionado
    });

    alert("Agendamento funcionando! Próxima etapa: salvar no banco.");
  });


  // ============================
  // INICIAR
  // ============================
  carregarServicos();

});
