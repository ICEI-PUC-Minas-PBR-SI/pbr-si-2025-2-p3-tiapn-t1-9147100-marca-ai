// Função para exibir toasts
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

// Lógica do formulário
const form = document.getElementById("cadastroForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();

  // Validações básicas
  if (!nome || !email || !telefone || !senha || !confirmar) {
    showToast("Preencha todos os campos", "erro");
    return;
  }

  if (senha !== confirmar) {
    showToast("As senhas não coincidem", "erro");
    return;
  }

  // Envia os dados para o servidor (cadastro.php)
  fetch("cadastro.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, telefone, senha, confirmar })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        showToast(data.message, "sucesso");

        // Redireciona após sucesso
        setTimeout(() => {
          window.location.href = "../Cliente/login.html";
        }, 2000);
      } else {
        showToast(data.message || "Erro ao realizar cadastro", "erro");
      }
    })
    .catch(() => {
      showToast("Erro ao conectar ao servidor", "erro");
    });
});

// Botão Cancelar
document.getElementById("btnCancelar").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=cadastro";
});
