
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

  montarDias();
  setupLogo();
}


function montarDias() {
  const wrap = $("#diasContainer");
  wrap.innerHTML = "";

  const DIAS = [
    "Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"
  ];

  DIAS.forEach((dia) => {

    if (!perfil.horarios[dia]) {
      perfil.horarios[dia] = {
        ativo: false,
        abertura: "",
        fechamento: "",
        intervaloInicio: "",
        intervaloFim: ""
      };
    }

    const cfg = perfil.horarios[dia];

    const card = document.createElement("div");
    card.className = "dia-card";

    card.innerHTML = `
      <div class="dia-topo">
        <div class="dia-nome">${dia}</div>
        <button class="switch ${cfg.ativo ? "on" : ""}" data-dia="${dia}">
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

  document.querySelectorAll(".switch").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dia = btn.dataset.dia;
      const ativo = btn.classList.toggle("on");
      perfil.horarios[dia].ativo = ativo;

      const conteudo = document.querySelector(
        `.dia-conteudo[data-conteudo="${dia}"]`
      );

      if (ativo) conteudo.classList.remove("oculto");
      else conteudo.classList.add("oculto");
    });
  });

  document.querySelectorAll(".dia-conteudo input").forEach((inp) => {
    inp.addEventListener("change", () => {
      const dia = inp.dataset.dia;
      const campo = inp.dataset.campo;
      perfil.horarios[dia][campo] = inp.value;
    });
  });
}


function setupLogo() {
  const preview = $("#logoPreview");

  if (perfil.logo) {
    preview.innerHTML = `<img src="${perfil.logo}" alt="Logo da Barbearia">`;
  } else {
    preview.innerHTML = `<i data-lucide="building-2"></i>`;
    lucide?.createIcons?.();
  }
}


async function salvarTudo() {
  console.log("FUNÇÃO salvarTudo() FOI CHAMADA!");

  const URL_BACKEND = "perfilUpdate.php";

  try {
    const resposta = await fetch(URL_BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: localStorage.getItem("barbeariaId"),
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
