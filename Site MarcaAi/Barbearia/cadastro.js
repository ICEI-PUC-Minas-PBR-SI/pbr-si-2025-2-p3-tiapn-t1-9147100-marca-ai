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

// Lógica do formulário
const form = document.getElementById("cadastroForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const cnpj = document.getElementById("cnpj").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();

  if (!nome || !cnpj || !email || !telefone || !endereco || !senha || !confirmar) {
    showToast("Preencha todos os campos", "erro");
    return;
  }

  if (senha !== confirmar) {
    showToast("As senhas não coincidem", "erro");
    return;
  }

  try {
    const resposta = await fetch("cadastro.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cnpj, email, telefone, endereco, senha })
    });

    const data = await resposta.json();

    if (data.success) {
      showToast(data.message, "sucesso");
      setTimeout(() => {
        window.location.href = "../Barbearia/login.html";
      }, 2000);
    } else {
      showToast(data.message, "erro");
    }
  } catch (erro) {
    showToast("Erro ao conectar com o servidor", "erro");
    console.error(erro);
  }
});

// Botão Cancelar
document.getElementById("btnCancelar").addEventListener("click", () => {
  window.location.href = "../Tipo_Acesso/acesso.html?acao=cadastro";
});
