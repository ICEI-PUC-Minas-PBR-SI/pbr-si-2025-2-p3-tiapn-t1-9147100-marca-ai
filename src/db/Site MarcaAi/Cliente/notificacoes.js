document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const lista = document.getElementById("notificacoesLista");
  const modalConfirmacao = document.getElementById("modalConfirmacao");
  
  const btnFecharConfirmacao = document.getElementById("btnFecharConfirmacao");
  const btnCancelarExclusao = document.getElementById("btnCancelarExclusao");
  const btnConfirmarExclusao = document.getElementById("btnConfirmarExclusao");
  
  const toastContainer = document.getElementById("toast-container");
  const btnVoltar = document.getElementById("btnVoltar");

  const idCliente = localStorage.getItem("cliente_id");

  btnVoltar.addEventListener("click", () => {
    window.location.href = "perfil.html";
  });

  let notificacaoExcluir = null;
  let notificacoes = [];

  carregar();

  async function carregar() {
    const res = await fetch(`api/getNotificacoes.php?id_cliente=${idCliente}`);
    const data = await res.json();

    if (!data.success) return;

    notificacoes = data.notificacoes;
    renderNotificacoes();
  }

  btnFecharConfirmacao.addEventListener("click", fecharModalConfirmacao);
  btnCancelarExclusao.addEventListener("click", fecharModalConfirmacao);

  btnConfirmarExclusao.addEventListener("click", async () => {
    if (!notificacaoExcluir) return;
    
    await excluirNotificacao(notificacaoExcluir.id);
    fecharModalConfirmacao();
    carregar();
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
      div.className = `notificacao-card ${notificacao.lida == 0 ? 'nao-lida' : ''}`;
      div.innerHTML = `
        <div class="notificacao-data">${formatarData(notificacao.data)}</div>
        <button class="btn-excluir-notificacao">
          <i data-lucide="x"></i>
        </button>
        <h3>${notificacao.titulo}</h3>
        <p>${notificacao.mensagem}</p>
      `;
      
      div.addEventListener("click", (e) => {
        if (!e.target.closest('.btn-excluir-notificacao')) marcarComoLida(notificacao.id);
      });

      div.querySelector(".btn-excluir-notificacao").addEventListener("click", (e) => {
        e.stopPropagation(); 
        abrirModalConfirmacao(notificacao);
      });

      lista.appendChild(div);
    });

    lucide.createIcons();
  }

  async function marcarComoLida(id) {
    await fetch("api/marcarLida.php", {
      method: "POST",
      body: new URLSearchParams({ id })
    });

    carregar();
  }

  async function excluirNotificacao(id) {
    await fetch("api/excluirNotificacao.php", {
      method: "POST",
      body: new URLSearchParams({ id })
    });
    showToast("Notificação excluída com sucesso!");
  }

  function formatarData(dt) {
    const d = new Date(dt);
    return d.toLocaleString("pt-BR");
  }

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
