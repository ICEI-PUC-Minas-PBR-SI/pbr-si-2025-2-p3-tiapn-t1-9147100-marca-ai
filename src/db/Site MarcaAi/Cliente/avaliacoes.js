document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const lista = document.getElementById("avaliacoesLista");
  const modal = document.getElementById("modalAvaliacao");
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  const modalTitulo = document.getElementById("modalTitulo");

  const inputBarbearia = document.getElementById("inputBarbearia");
  const inputProfissional = document.getElementById("inputProfissional");
  const inputComentario = document.getElementById("inputComentario");
  const estrelasContainer = document.getElementById("estrelas");

  const btnAdd = document.getElementById("btnAdd");
  const btnSalvar = document.getElementById("btnSalvar");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnFechar = document.getElementById("btnFecharModal");
  const btnFecharConfirmacao = document.getElementById("btnFecharConfirmacao");
  const btnCancelarExclusao = document.getElementById("btnCancelarExclusao");
  const btnConfirmarExclusao = document.getElementById("btnConfirmarExclusao");

  const toastContainer = document.getElementById("toast-container");
  const btnVoltar = document.getElementById("btnVoltar");

  btnVoltar.addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

  let avaliacoes = [];
  let avaliacaoEditando = null;
  let avaliacaoExcluir = null;

  criarEstrelasModal();

  carregarAvaliacoes();

  // ============================
  // CARREGAR AVALIAÇÕES DO BANCO
  // ============================
  async function carregarAvaliacoes() {
    const r = await fetch("listar_avaliacoes.php");
    avaliacoes = await r.json();
    renderAvaliacoes();
  }

  // AÇÕES DO MODAL
  btnAdd.addEventListener("click", () => {
    avaliacaoEditando = null;
    modalTitulo.textContent = "Nova Avaliação";
    limparModal();
    modal.style.display = "flex";
  });

  btnCancelar.addEventListener("click", fecharModal);
  btnFechar.addEventListener("click", fecharModal);

  btnFecharConfirmacao.addEventListener("click", fecharModalConfirmacao);
  btnCancelarExclusao.addEventListener("click", fecharModalConfirmacao);

  btnConfirmarExclusao.addEventListener("click", () => {
    if (avaliacaoExcluir) {
      excluirAvaliacao(avaliacaoExcluir.id);
      fecharModalConfirmacao();
    }
  });

  function fecharModal() {
    modal.style.display = "none";
  }

  function fecharModalConfirmacao() {
    modalConfirmacao.style.display = "none";
    avaliacaoExcluir = null;
  }

  function abrirModalConfirmacao(a) {
    avaliacaoExcluir = a;
    modalConfirmacao.style.display = "flex";
  }

  // ================================
  // SALVAR NO BANCO (não localStorage)
  // ================================
  btnSalvar.addEventListener("click", async () => {
    const barbearia = inputBarbearia.value.trim();
    const profissional = inputProfissional.value.trim();
    const comentario = inputComentario.value.trim();
    const estrelas = estrelasContainer.querySelectorAll(".selecionada").length;

    if (!barbearia || !profissional || estrelas === 0) {
      showToast("⚠️ Preencha os campos obrigatórios!");
      return;
    }

    const form = new FormData();
    form.append("barbearia", barbearia);
    form.append("profissional", profissional);
    form.append("comentario", comentario);
    form.append("estrelas", estrelas);

    const resp = await fetch("salvar_avaliacao.php", {
      method: "POST",
      body: form,
    });

    const json = await resp.json();

    if (json.erro) {
      showToast(json.erro);
      return;
    }

    showToast("✔ Avaliação salva com sucesso!");
    fecharModal();
    carregarAvaliacoes();
  });

  // ========================
  // ESTRELAS DO MODAL
  // ========================
  function criarEstrelasModal() {
    estrelasContainer.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const star = document.createElement("div");
      star.innerHTML = `<svg data-lucide="star" width="26" height="26"></svg>`;
      estrelasContainer.appendChild(star);
    }

    lucide.createIcons();

    estrelasContainer.addEventListener("click", (e) => {
      const clicked = e.target.closest("svg");
      if (!clicked) return;

      const starsArray = Array.from(estrelasContainer.querySelectorAll("svg"));
      const index = starsArray.indexOf(clicked);

      starsArray.forEach((star, i) => {
        if (i <= index) {
          star.classList.add("selecionada");
          star.style.fill = "currentColor";
        } else {
          star.classList.remove("selecionada");
          star.style.fill = "none";
        }
      });
    });
  }

  // ========================
  // RENDERIZAR LISTA
  // ========================
  function renderAvaliacoes() {
    lista.innerHTML = "";

    if (avaliacoes.length === 0) {
      lista.innerHTML = `<p style="color:#aaa;text-align:center;margin-top:2rem;">Nenhuma avaliação ainda.</p>`;
      return;
    }

    avaliacoes.forEach((a) => {
      const div = document.createElement("div");
      div.className = "avaliacao-card";
      div.innerHTML = `
        <div class="avaliacao-data">${a.data_avaliacao}</div>
        <h3>${a.barbearia}</h3>
        <p>Profissional: ${a.profissional}</p>
        <div class="avaliacao-stars">${renderStars(a.estrelas)}</div>
        <p class="avaliacao-comentario">${a.comentario}</p>
        <button class="btn-excluir">Excluir</button>
      `;

      div.querySelector(".btn-excluir").addEventListener("click", () => abrirModalConfirmacao(a));

      lista.appendChild(div);
    });

    lucide.createIcons();
  }

  // ========================
  // EXCLUIR AVALIAÇÃO
  // ========================
  async function excluirAvaliacao(id) {
    const form = new FormData();
    form.append("id", id);

    await fetch("excluir_avaliacao.php", { method: "POST", body: form });

    showToast("🗑️ Avaliação excluída!");
    carregarAvaliacoes();
  }

  function renderStars(qtd) {
    let starsHTML = "";
    for (let i = 0; i < 5; i++) {
      if (i < qtd) {
        starsHTML += `<svg data-lucide="star" width="20" height="20" style="fill: currentColor; color: #ffc400;"></svg>`;
      } else {
        starsHTML += `<svg data-lucide="star" width="20" height="20" style="fill: none; color: #ffc400;"></svg>`;
      }
    }
    return starsHTML;
  }

  function limparModal() {
    inputBarbearia.value = "";
    inputProfissional.value = "";
    inputComentario.value = "";
    estrelasContainer.querySelectorAll("svg").forEach((s) => {
      s.classList.remove("selecionada");
      s.style.fill = "none";
    });
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
