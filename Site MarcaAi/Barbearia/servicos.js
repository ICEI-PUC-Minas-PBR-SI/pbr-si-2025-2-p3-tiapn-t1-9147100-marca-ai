const BARBEARIA_KEY =
  localStorage.getItem("barbeariaId") ||
  localStorage.getItem("emailBarbearia") ||
  localStorage.getItem("nomeBarbearia") ||
  "default";

const STORAGE_KEY = `servicos_${BARBEARIA_KEY}`;

let servicos = [];
let editando = null;

const $ = (s, r=document) => r.querySelector(s);

/* INIT */
document.addEventListener("DOMContentLoaded", () => {

  // Carregar serviços
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    servicos = raw ? JSON.parse(raw) : [];
    if(!Array.isArray(servicos)) servicos = [];
  }catch{
    servicos = [];
  }

  /* Eventos */
  $("#abrirModalAdicionar")?.addEventListener("click", () => abrirModal("novo"));
  $("#btnFecharModal")?.addEventListener("click", fecharModal);
  $("#btnCancelar")?.addEventListener("click", fecharModal);

  $("#modalOverlay")?.addEventListener("click", e => {
    if(e.target.id === "modalOverlay") fecharModal();
  });

  document.addEventListener("keydown", e => {
    if(e.key === "Escape") fecharModal();
  });

  $("#formServico")?.addEventListener("submit", salvarFormulario);

  render();
  lucide?.createIcons?.();
});

/* Salvar */
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(servicos));
}

/* Renderizar lista */
function render(){
  const lista = $("#listaServicos");
  lista.innerHTML = "";

  servicos.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="info">
        <div class="avatar"><i data-lucide="scissors"></i></div>

        <div class="dados">
          <h3>${escapeHTML(s.nome)}</h3>
          <p class="desc">${escapeHTML(s.descricao)}</p>

          <div class="linha-preco">
            <span class="preco">R$ ${Number(s.valor).toFixed(2)}</span>
            <span class="tempo">${s.duracao} min</span>
          </div>
        </div>
      </div>

      <div class="acoes">
        <button class="icon-btn" onclick="editarServico(${i})" aria-label="Editar">
          <i data-lucide="pencil"></i>
        </button>
        <button class="icon-btn" onclick="removerServico(${i})" aria-label="Excluir">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    lista.appendChild(card);
  });

  lucide?.createIcons?.();
}

/* Abrir modal */
function abrirModal(modo, index=null){
  editando = (modo === "editar") ? index : null;

  if(modo === "novo"){
    $("#modalTitulo").textContent = "Novo Serviço";
    $("#btnSalvar").textContent   = "Adicionar";
    $("#formServico").reset();
  } else {
    const s = servicos[index];
    $("#modalTitulo").textContent = "Editar Serviço";
    $("#btnSalvar").textContent   = "Salvar";

    $("#nomeServico").value = s.nome;
    $("#descricao").value   = s.descricao;
    $("#valor").value       = s.valor;
    $("#duracao").value     = s.duracao;
  }

  $("#modalOverlay").classList.add("aberta");
  $("#modalOverlay").setAttribute("aria-hidden","false");
  setTimeout(() => $("#nomeServico")?.focus(), 0);
  lucide?.createIcons?.();
}

/* Fechar modal */
function fecharModal(reset=false){
  $("#modalOverlay").classList.remove("aberta");
  $("#modalOverlay").setAttribute("aria-hidden","true");
  if(reset) $("#formServico").reset();
}

/* Editar / Remover */
function editarServico(i){
  abrirModal("editar", i);
}
function removerServico(i){
  servicos.splice(i,1);
  save();
  render();
}

/* Salvar formulário */
function salvarFormulario(e){
  e.preventDefault();

  const nome      = $("#nomeServico").value.trim();
  const descricao = $("#descricao").value.trim();
  const valor     = $("#valor").value.trim();
  const duracao   = $("#duracao").value.trim();

  if(!nome || !valor || !duracao) return;

  const obj = { 
    nome, 
    descricao,
    valor: Number(valor),
    duracao: Number(duracao)
  };

  if(editando === null){
    servicos.push(obj);
  } else {
    servicos[editando] = obj;
  }

  save();
  render();
  fecharModal(true);
}

/* Sanitização */
function escapeHTML(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
