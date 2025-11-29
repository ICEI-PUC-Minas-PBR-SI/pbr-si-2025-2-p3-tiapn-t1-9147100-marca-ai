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

  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
  let avaliacaoEditando = null;
  let avaliacaoExcluir = null;

  criarEstrelasModal();

  renderAvaliacoes();

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

  function abrirModalConfirmacao(avaliacao) {
    avaliacaoExcluir = avaliacao;
    modalConfirmacao.style.display = "flex";
  }

  btnSalvar.addEventListener("click", () => {
    const barbearia = inputBarbearia.value.trim();
    const profissional = inputProfissional.value.trim();
    const comentario = inputComentario.value.trim();
    const nota = estrelasContainer.querySelectorAll(".selecionada").length;
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    if (!barbearia || !profissional || nota === 0) {
      showToast("⚠️ Preencha todos os campos obrigatórios!");
      return;
    }

    if (avaliacaoEditando) {
      avaliacaoEditando.barbearia = barbearia;
      avaliacaoEditando.profissional = profissional;
      avaliacaoEditando.comentario = comentario;
      avaliacaoEditando.estrelas = nota;
      showToast("Avaliação atualizada com sucesso!");
    } else {
      avaliacoes.unshift({
        id: Date.now(),
        barbearia,
        profissional,
        comentario,
        estrelas: nota,
        data: dataAtual,
      });
      showToast("Avaliação salva com sucesso!");
    }

    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    renderAvaliacoes();
    fecharModal();
  });

  // Estrelas 
  function criarEstrelasModal() {
    estrelasContainer.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('div');
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

  function renderAvaliacoes() {
    lista.innerHTML = "";

    if (avaliacoes.length === 0) {
      lista.innerHTML = `<p style="color:#aaa;text-align:center;margin-top:2rem;">Nenhuma avaliação realizada até o momento.</p>`;
      return;
    }

    avaliacoes.forEach((a) => {
      const div = document.createElement("div");
      div.className = "avaliacao-card";
      div.innerHTML = `
        <div class="avaliacao-data">${a.data}</div>
        <h3>${a.barbearia}</h3>
        <p>Profissional: ${a.profissional}</p>
        <div class="avaliacao-stars">${renderStars(a.estrelas)}</div>
        <p class="avaliacao-comentario">${a.comentario}</p>
        <button class="btn-editar">Editar</button>
        <button class="btn-excluir">Excluir</button>
      `;
      
      div.querySelector(".btn-editar").addEventListener("click", () => editarAvaliacao(a));
      div.querySelector(".btn-excluir").addEventListener("click", () => abrirModalConfirmacao(a));
      
      lista.appendChild(div);
    });

    lucide.createIcons();
  }

  function editarAvaliacao(a) {
    avaliacaoEditando = a;

    modalTitulo.textContent = "Editar Avaliação";
    inputBarbearia.value = a.barbearia;
    inputProfissional.value = a.profissional;
    inputComentario.value = a.comentario;

    const stars = estrelasContainer.querySelectorAll("svg");
    stars.forEach((star, i) => {
      if (i < a.estrelas) {
        star.classList.add("selecionada");
        star.style.fill = "currentColor";
      } else {
        star.classList.remove("selecionada");
        star.style.fill = "none";
      }
    });

    modal.style.display = "flex";
  }

  function excluirAvaliacao(id) {
    avaliacoes = avaliacoes.filter(a => a.id !== id);
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    renderAvaliacoes();
    showToast("🗑️ Avaliação excluída com sucesso!");
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
    const stars = estrelasContainer.querySelectorAll("svg");
    stars.forEach(star => {
      star.classList.remove("selecionada");
      star.style.fill = "none";
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
