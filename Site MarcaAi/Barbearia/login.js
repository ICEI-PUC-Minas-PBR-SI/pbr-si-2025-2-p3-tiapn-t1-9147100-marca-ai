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

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    showToast("Preencha todos os campos", "erro");
    return;
  }

  try {
    const resposta = await fetch("login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await resposta.json();

    if (data.success) {
      showToast("Login realizado com sucesso!", "sucesso");
      
      localStorage.setItem("barbeariaId", data.user.id);
      localStorage.setItem("nomeBarbearia", data.user.nome);
      localStorage.setItem("tipoAcesso", data.user.tipo);

      setTimeout(() => {
        window.location.href = "painel.html"; 
      }, 2000);
    } else {
      showToast(data.message, "erro");
    }
  } catch (erro) {
    showToast("Erro ao conectar com o servidor", "erro");
    console.error(erro);
  }
});
