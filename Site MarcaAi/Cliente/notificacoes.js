document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const lista = document.getElementById("notificacoesLista");
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  
  const btnFecharConfirmacao = document.getElementById("btnFecharConfirmacao");
  const btnCancelarExclusao = document.getElementById("btnCancelarExclusao");
  const btnConfirmarExclusao = document.getElementById("btnConfirmarExclusao");
  
  const toastContainer = document.getElementById("toast-container");
  const btnVoltar = document.getElementById("btnVoltar");

  btnVoltar.addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

  let notificacoes = JSON.parse(localStorage.getItem("notificacoes")) || [];
  let notificacaoExcluir = null;

  renderNotificacoes();

  btnFecharConfirmacao.addEventListener("click", fecharModalConfirmacao);
  btnCancelarExclusao.addEventListener("click", fecharModalConfirmacao);

  btnConfirmarExclusao.addEventListener("click", () => {
    if (notificacaoExcluir) {
      excluirNotificacao(notificacaoExcluir.id);
      fecharModalConfirmacao();
    }
  });

  function fecharModalConfirmacao() {
    modalConfirmacao.style.display = "none";
    notificacaoExcluir = null;
  }

  function abrirModalConfirmacao(notificacao) {
    notificacaoExcluir = notificacao;
    modalConfirmacao.style.display = "flex";
  }

  function renderNotificacoes() {
    lista.innerHTML = "";

    if (notificacoes.length === 0) {
      lista.innerHTML = `<p style="color:#aaa;text-align:center;margin-top:2rem;">Nenhuma notificação até o momento.</p>`;
      return;
    }

    notificacoes.forEach((notificacao) => {
      const div = document.createElement("div");
      div.className = `notificacao-card ${notificacao.lida ? '' : 'nao-lida'}`;
      div.innerHTML = `
        <div class="notificacao-data">${notificacao.data}</div>
        <button class="btn-excluir-notificacao">
          <i data-lucide="x"></i>
        </button>
        <h3>${notificacao.titulo}</h3>
        <p>${notificacao.mensagem}</p>
      `;
      
      div.addEventListener("click", (e) => {
        if (!e.target.closest('.btn-excluir-notificacao')) {
          marcarComoLida(notificacao.id);
        }
      });
      
      div.querySelector(".btn-excluir-notificacao").addEventListener("click", (e) => {
        e.stopPropagation(); 
        abrirModalConfirmacao(notificacao);
      });
      
      lista.appendChild(div);
    });

    lucide.createIcons();
  }

  function marcarComoLida(id) {
    notificacoes = notificacoes.map(notificacao => {
      if (notificacao.id === id && !notificacao.lida) {
        return { ...notificacao, lida: true };
      }
      return notificacao;
    });
    
    localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
    renderNotificacoes();
  }

  function excluirNotificacao(id) {
    notificacoes = notificacoes.filter(notificacao => notificacao.id !== id);
    localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
    renderNotificacoes();
    showToast("Notificação excluída com sucesso!");
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
