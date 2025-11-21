document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setActiveNavIcon("perfil");

  const nomeEl = document.getElementById("perfilNome");
  const emailEl = document.getElementById("perfilEmail");
  const telEl = document.getElementById("perfilTelefone");
  const desdeEl = document.getElementById("perfilDesde");

  const btnEditar = document.getElementById("btnEditar");
  const btnSair = document.getElementById("btnSair");

  const btnAvaliacoes = document.getElementById("btnAvaliacoes");
  const btnNotificacoes = document.getElementById("btnNotificacoes");

  const modal = document.getElementById("modalEditar");
  const btnFechar = document.getElementById("btnFecharModal");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnSalvar = document.getElementById("btnSalvar");

  const inputNome = document.getElementById("inputNome");
  const inputEmail = document.getElementById("inputEmail");
  const inputTelefone = document.getElementById("inputTelefone");
  const toastContainer = document.getElementById("toast-container");

  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Erro: usuário não logado");
    window.location.href = "../Home/home.html";
    return;
  }

  let perfil = { nome: "", email: "", telefone: "", desde: "" };

  // ===============================
  //   PUXAR PERFIL DO BANCO
  // ===============================
  async function carregarPerfil() {
    try {
      const resp = await fetch("../Cliente/perfil.php?id=" + usuarioId);
      const data = await resp.json();

      if (data.success) {
        perfil.nome = data.perfil.nome;
        perfil.email = data.perfil.email;
        perfil.telefone = data.perfil.telefone;
        perfil.desde = data.perfil.desde;

        atualizarTela();
      } else {
        alert("Erro ao carregar perfil.");
      }
    } catch (erro) {
      console.error("ERRO AO CARREGAR PERFIL:", erro);
    }
  }

  carregarPerfil();

  // ===============================
  //   ATUALIZAR O HTML
  // ===============================
  function atualizarTela() {
    nomeEl.textContent = perfil.nome;
    emailEl.textContent = perfil.email;
    telEl.textContent = perfil.telefone;

    // formatação básica da data
    if (perfil.desde) {
      const data = new Date(perfil.desde);
      desdeEl.textContent = `Cliente desde ${data.toLocaleDateString("pt-BR")}`;
    } else {
      desdeEl.textContent = "Cliente desde —";
    }
  }

  // ===============================
  //   EDITAR PERFIL
  // ===============================
  btnEditar.addEventListener("click", () => {
    inputNome.value = perfil.nome;
    inputEmail.value = perfil.email;
    inputTelefone.value = perfil.telefone;
    modal.style.display = "flex";
  });

  btnFechar.addEventListener("click", () => (modal.style.display = "none"));
  btnCancelar.addEventListener("click", () => (modal.style.display = "none"));

  btnSalvar.addEventListener("click", async () => {
    const novoPerfil = {
      id: usuarioId,
      nome: inputNome.value.trim(),
      email: inputEmail.value.trim(),
      telefone: inputTelefone.value.trim()
    };

    try {
      const resp = await fetch("../Cliente/perfil.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPerfil)
      });

      const data = await resp.json();

      if (data.success) {
        perfil = novoPerfil;
        atualizarTela();
        showToast("Perfil atualizado com sucesso!");
        modal.style.display = "none";
      } else {
        alert("Erro ao salvar perfil.");
      }
    } catch (erro) {
      console.error("ERRO AO SALVAR PERFIL:", erro);
    }
  });

  // ===============================
  //   BOTÃO SAIR
  // ===============================
  btnSair.addEventListener("click", () => {
    localStorage.clear();
    showToast("👋 Sessão encerrada");
    setTimeout(() => (window.location.href = "../Home/home.html"), 1500);
  });

  // ===============================
  //   NAVEGAÇÃO
  // ===============================
  btnAvaliacoes.addEventListener("click", () => {
    window.location.href = "avaliacoes.html";
  });

  btnNotificacoes.addEventListener("click", () => {
    window.location.href = "notificacoes.html";
  });

  // ===============================
  //   TOAST
  // ===============================
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
