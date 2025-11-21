// -------------------------------------------------------------
//  Atalho para document.querySelector
// -------------------------------------------------------------
const $ = (sel) => document.querySelector(sel);

// -------------------------------------------------------------
// OBJETO PRINCIPAL DO PERFIL
// -------------------------------------------------------------
let perfil = {
  info: {},
  horarios: {},
  logo: null
};

// -------------------------------------------------------------
//  CARREGAR PERFIL DA API (perfil.php)
// -------------------------------------------------------------
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

// -------------------------------------------------------------
//  PREENCHER OS CAMPOS COM OS DADOS RECEBIDOS
// -------------------------------------------------------------
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

// -------------------------------------------------------------
//  FUNÇÃO SALVAR TUDO (ENVIA PARA O BACKEND)
// -------------------------------------------------------------
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

  // FEEDBACK VISUAL
  const btn = $("#salvarBtn");
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = "Salvo!";
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 1200);

  // REDIRECIONAMENTO (opcional)
  // window.location.href = "painel.html";
}

// -------------------------------------------------------------
//  INICIALIZAÇÃO DA PÁGINA
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

  // PEGA O ID DO LOCALSTORAGE
  let barbeariaId = localStorage.getItem("barbeariaId");

  if (!barbeariaId) {
    console.warn("Nenhum barbeariaId encontrado. Usando ID 1 para teste.");
    barbeariaId = 1;
  }

  // CARREGA PERFIL
  carregarPerfilAPI(barbeariaId);

  // ATRELA O BOTÃO "SALVAR"
  $("#salvarBtn").addEventListener("click", salvarTudo);

  // ÍCONES
  lucide?.createIcons?.();
});
