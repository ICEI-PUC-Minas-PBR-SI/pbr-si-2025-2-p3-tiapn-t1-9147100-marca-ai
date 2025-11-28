
const $ = (sel) => document.querySelector(sel);

let perfil = {
  info: {},
  horarios: {},
  logo: null
};

async function carregarPerfilAPI(barbeariaId) {
  try {
    const response = await fetch(`perfil.php?id=${barbeariaId}`);
    const data = await response.json();

    if (data.error) {
      console.error("Erro do servidor:", data.error);
      return;
    }

    perfil.info = data.info;
    perfil.horarios = data.horarios;
    perfil.logo = data.logo;

    renderizarPerfil();

  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
  }
}

function renderizarPerfil() {
  const i = perfil.info;

  $("#nome").value      = i.nome || "";
  $("#cnpj").value      = i.cnpj || "";
  $("#email").value     = i.email || "";
  $("#telefone").value  = i.telefone || "";
  $("#endereco").value  = i.endereco || "";
  $("#descricao").value = i.descricao || "";

  montarDias?.();
  setupLogo?.();
}

async function salvarTudo() {
  console.log("FUNÇÃO salvarTudo() FOI CHAMADA!");

  const URL_BACKEND = "perfilUpdate.php";

  try {
    const resposta = await fetch(URL_BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("barbeariaId"), // ← ENVIA ID
        ...perfil
      })
    });

    const retorno = await resposta.text();
    console.log("Retorno do servidor:", retorno);

  } catch (erro) {
    console.error("Erro ao enviar para o backend:", erro);
  }

  const btn = $("#salvarBtn");
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = "Salvo!";
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1200);

}

document.addEventListener("DOMContentLoaded", () => {

  let barbeariaId = localStorage.getItem("barbeariaId");

  if (!barbeariaId) {
    console.warn("Nenhum barbeariaId encontrado. Usando ID 1 para teste.");
    barbeariaId = 1;
  }

  carregarPerfilAPI(barbeariaId);

  $("#salvarBtn").addEventListener("click", salvarTudo);

  lucide?.createIcons?.();
});
