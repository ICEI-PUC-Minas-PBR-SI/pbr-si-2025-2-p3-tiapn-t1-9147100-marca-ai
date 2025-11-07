// Toasts
function showToast(mensagem, tipo = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast");

  let icone = "fa-circle-info";
  if (tipo === "sucesso") icone = "fa-check-circle";
  if (tipo === "erro") icone = "fa-exclamation-circle";

  toast.innerHTML = `<i class="fa-solid ${icone}"></i> ${mensagem}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Lógica de login
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    showToast("Preencha todos os campos", "erro");
    return;
  }

  showToast("Login realizado com sucesso!", "sucesso");

  // Redireciona após sucesso
  setTimeout(() => {
    window.location.href = "painel.html"; // Após o login da Barbearia é direcionado para página de painel
  }, 2000);
});
