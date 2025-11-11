document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setActiveNavIcon("perfil");

  const nomeEl = document.getElementById("perfilNome");
  const emailEl = document.getElementById("perfilEmail");
  const telEl = document.getElementById("perfilTelefone");
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

  let perfil = JSON.parse(localStorage.getItem("perfilCliente")) || {
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
  };

  atualizarTela();

  btnEditar.addEventListener("click", () => {
    inputNome.value = perfil.nome;
    inputEmail.value = perfil.email;
    inputTelefone.value = perfil.telefone;
    modal.style.display = "flex";
  });

  btnFechar.addEventListener("click", () => (modal.style.display = "none"));
  btnCancelar.addEventListener("click", () => (modal.style.display = "none"));

  btnSalvar.addEventListener("click", () => {
    perfil.nome = inputNome.value.trim() || perfil.nome;
    perfil.email = inputEmail.value.trim() || perfil.email;
    perfil.telefone = inputTelefone.value.trim() || perfil.telefone;

    localStorage.setItem("perfilCliente", JSON.stringify(perfil));
    atualizarTela();
    showToast(" Perfil atualizado com sucesso!");
    modal.style.display = "none";
  });

  function atualizarTela() {
    nomeEl.textContent = perfil.nome;
    emailEl.textContent = perfil.email;
    telEl.textContent = perfil.telefone;
  }

  btnSair.addEventListener("click", () => {
    showToast("👋 Sessão encerrada");
    setTimeout(() => (window.location.href = "../Home/home.html"), 1500);
  });

  // ALTERAR AQUI AINDA!!!!
  btnAvaliacoes.addEventListener("click", () => showToast("🔧 Página em desenvolvimento"));
  btnNotificacoes.addEventListener("click", () => showToast("🔧 Página em desenvolvimento"));

  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
});
