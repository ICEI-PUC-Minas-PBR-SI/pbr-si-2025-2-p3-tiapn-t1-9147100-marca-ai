const BARBEARIA_KEY =
  localStorage.getItem("barbeariaId") ||
  localStorage.getItem("emailBarbearia") ||
  localStorage.getItem("nomeBarbearia") ||
  "default";

const STORAGE_KEY = `profissionais_${BARBEARIA_KEY}`;

let profissionais = [];
let editandoIndex = null;

const $ = (s, r = document) => r.querySelector(s);

document.addEventListener("DOMContentLoaded", () => {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    profissionais = bruto ? JSON.parse(bruto) : [];
    if (!Array.isArray(profissionais)) profissionais = [];
  } catch { profissionais = []; }

  $("#abrirModalAdicionar")?.addEventListener("click", () => abrirModal("novo"));
  $("#btnFecharModal")?.addEventListener("click", fecharModal);
  $("#btnCancelar")?.addEventListener("click", fecharModal);
  $("#modalOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") fecharModal();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharModal(); });

  $("#formProfissional")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("#nome").value.trim();
    const especialidade = $("#especialidade").value.trim();
    const telefone = $("#telefone").value.trim();
    if (!nome || !especialidade || !telefone) return;

    if (editandoIndex === null) {
      profissionais.push({ nome, especialidade, telefone });
    } else {
      profissionais[editandoIndex] = { nome, especialidade, telefone };
    }
    save();
    render();
    fecharModal(true);
  });

  render();
  lucide?.createIcons?.();
});

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(profissionais)); }

function render(){
  const lista = $("#listaProfissionais");
  lista.innerHTML = "";

  profissionais.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="info">
        <div class="avatar"><i data-lucide="user"></i></div>
        <div class="dados">
          <h3>${escapeHTML(p.nome)}</h3>
          <p>${escapeHTML(p.especialidade)}</p>
          <p>${escapeHTML(p.telefone)}</p>
        </div>
      </div>
      <div class="acoes">
        <button class="icon-btn" aria-label="Editar" onclick="editarProfissional(${i})">
          <i data-lucide="pencil"></i>
        </button>
        <button class="icon-btn" aria-label="Remover" onclick="removerProfissional(${i})">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;
    lista.appendChild(card);
  });

  lucide?.createIcons?.();
}

function editarProfissional(i){
  editandoIndex = i;
  const p = profissionais[i];
  $("#modalTitulo").textContent = "Editar Profissional";
  $("#btnSalvar").textContent = "Salvar";
  $("#nome").value = p.nome;
  $("#especialidade").value = p.especialidade;
  $("#telefone").value = p.telefone;
  abrirModalInterno();
}

function removerProfissional(i){
  profissionais.splice(i, 1);
  save();
  render();
}

function abrirModal(modo){
  editandoIndex = null;
  if (modo === "novo"){
    $("#modalTitulo").textContent = "Novo Profissional";
    $("#btnSalvar").textContent = "Adicionar";
    $("#formProfissional").reset();
  }
  abrirModalInterno();
}

function abrirModalInterno(){
  const overlay = $("#modalOverlay");
  overlay.classList.add("aberta");
  overlay.setAttribute("aria-hidden","false");
  setTimeout(() => $("#nome")?.focus(), 0);
  lucide?.createIcons?.();
}

function fecharModal(reset = false){
  const overlay = $("#modalOverlay");
  overlay.classList.remove("aberta");
  overlay.setAttribute("aria-hidden","true");
  if (reset) $("#formProfissional").reset();
}

function escapeHTML(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
