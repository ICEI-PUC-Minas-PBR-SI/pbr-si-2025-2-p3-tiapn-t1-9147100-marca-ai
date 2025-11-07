// Namespace por barbearia 
const BARBEARIA_KEY =
  localStorage.getItem("barbeariaId") ||
  localStorage.getItem("emailBarbearia") ||
  localStorage.getItem("nomeBarbearia") ||
  "default";

const STORAGE_KEY = `perfil_${BARBEARIA_KEY}`;

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const DIAS = [
  "Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"
];

let perfil = {
  logo: null,
  info: {
    nome: "", cnpj: "", email: "", telefone: "", endereco: "", descricao: ""
  },
  horarios: {
    // por dia: { ativo: boolean, abertura: "", fechamento: "", intervaloInicio:"", intervaloFim:"" }
  }
};

// Carregar do storage
function load(){
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") perfil = Object.assign(perfil, parsed);
    }
  } catch {}
}

// Salvar
function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
}

// Monta os cards dos dias com toggle que esconde/mostra campos
function montarDias(){
  const wrap = $("#diasContainer");
  wrap.innerHTML = "";

  DIAS.forEach(dia => {
    // garantir estrutura
    if(!perfil.horarios[dia]){
      perfil.horarios[dia] = { ativo:false, abertura:"", fechamento:"", intervaloInicio:"", intervaloFim:"" };
    }
    const cfg = perfil.horarios[dia];

    const card = document.createElement("div");
    card.className = "dia-card";

    card.innerHTML = `
      <div class="dia-topo">
        <div class="dia-nome">${dia}</div>
        <button class="switch ${cfg.ativo ? "on":""}" data-dia="${dia}" aria-label="Alternar funcionamento">
          <span class="dot"></span>
        </button>
      </div>

      <div class="dia-conteudo ${cfg.ativo ? "" : "oculto"}" data-conteudo="${dia}">
        <div class="campo">
          <label>Abertura</label>
          <input type="time" value="${cfg.abertura || ""}" data-dia="${dia}" data-campo="abertura" />
        </div>

        <div class="campo">
          <label>Fechamento</label>
          <input type="time" value="${cfg.fechamento || ""}" data-dia="${dia}" data-campo="fechamento" />
        </div>

        <div class="campo">
          <label>Início Intervalo</label>
          <input type="time" value="${cfg.intervaloInicio || ""}" data-dia="${dia}" data-campo="intervaloInicio" />
        </div>

        <div class="campo">
          <label>Fim Intervalo</label>
          <input type="time" value="${cfg.intervaloFim || ""}" data-dia="${dia}" data-campo="intervaloFim" />
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });

  // listeners de toggle
  $$(".switch", wrap).forEach(btn => {
    btn.addEventListener("click", () => {
      const dia = btn.dataset.dia;
      btn.classList.toggle("on");
      const ativo = btn.classList.contains("on");
      perfil.horarios[dia].ativo = ativo;
      const conteudo = $(`.dia-conteudo[data-conteudo="${dia}"]`);
      if(conteudo){
        if(ativo) conteudo.classList.remove("oculto");
        else conteudo.classList.add("oculto");
      }
      save();
    });
  });

  // listeners de mudanças nos inputs de hora
  $$(".dia-conteudo input", wrap).forEach(inp => {
    inp.addEventListener("change", () => {
      const dia = inp.dataset.dia;
      const campo = inp.dataset.campo;
      perfil.horarios[dia][campo] = inp.value;
      save();
    });
  });
}

function bindInfo(){
  const i = perfil.info;
  $("#nome").value = i.nome || "";
  $("#cnpj").value = i.cnpj || "";
  $("#email").value = i.email || "";
  $("#telefone").value = i.telefone || "";
  $("#endereco").value = i.endereco || "";
  $("#descricao").value = i.descricao || "";
}

function setupInfoListeners(){
  $("#nome").addEventListener("input",  e => perfil.info.nome = e.target.value);
  $("#cnpj").addEventListener("input",  e => perfil.info.cnpj = e.target.value);
  $("#email").addEventListener("input", e => perfil.info.email = e.target.value);
  $("#telefone").addEventListener("input", e => perfil.info.telefone = e.target.value);
  $("#endereco").addEventListener("input", e => perfil.info.endereco = e.target.value);
  $("#descricao").addEventListener("input", e => perfil.info.descricao = e.target.value);
}

function setupLogo(){
  const preview = $("#logoPreview");
  const input   = $("#logoInput");
  const remover = $("#removerLogo");

  const renderLogo = () => {
    if (perfil.logo){
      // mostrar imagem
      preview.innerHTML = `<img alt="Logo da Barbearia" />`;
      preview.querySelector("img").src = perfil.logo;
    } else {
      // placeholder
      preview.innerHTML = `<i data-lucide="building-2"></i>`;
      lucide?.createIcons?.();
    }
  };
  renderLogo();

  input.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      perfil.logo = reader.result;
      renderLogo();
      save();
    };
    reader.readAsDataURL(file);
  });

  remover.addEventListener("click", () => {
    perfil.logo = null; renderLogo(); save();
  });
}

function salvarTudo(){
  save();
  // feedback simples (opcionalmente você pode usar um toast padrão do projeto)
  const btn = $("#salvarBtn");
  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = "Salvo!";
  setTimeout(()=>{ btn.textContent = original; btn.disabled = false; }, 1200);
}

document.addEventListener("DOMContentLoaded", () => {
  load();

  // Info
  bindInfo();
  setupInfoListeners();

  // Dias e horários
  montarDias();

  // Logo
  setupLogo();

  // Salvar
  $("#salvarBtn").addEventListener("click", salvarTudo);

  // Icons
  lucide?.createIcons?.();
});
