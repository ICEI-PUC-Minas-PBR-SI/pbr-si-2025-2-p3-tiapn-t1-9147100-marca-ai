// Função para exibir mensagens (toasts)
function showToast(mensagem, tipo = "info") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast");

  let icone = "fa-circle-info";
  if (tipo === "sucesso") icone = "fa-check-circle";
  if (tipo === "erro") icone = "fa-exclamation-circle";

  toast.innerHTML = `<i class="fa-solid ${icone}"></i> ${mensagem}`;
  container.appendChild(toast);

  // Remove após 3 segundos
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

  if (email === "" || senha === "") {
    showToast("Preencha todos os campos", "erro");
    return;
  }

  // ALTERAR AQUI !!!! aq é a verificação no banco de dados 
  showToast("Login realizado com sucesso!", "sucesso");

  // Redirecionamento após sucesso
  setTimeout(() => {
  window.location.href = "barbearias.html"; // Após o login do cliente é direcionado para página de Barbearias
}, 1500);
});
