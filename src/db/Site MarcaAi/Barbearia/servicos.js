let servicos = [];
let editando = null;

const $ = (s, r = document) => r.querySelector(s);

const idBarbearia =
  localStorage.getItem("id_barbearia") ||   // nova chave correta
  localStorage.getItem("barbearia_id") ||   // chave antiga
  localStorage.getItem("barbeariaId") ||    // chave antiga
  localStorage.getItem("emailBarbearia");   // chave antiga


/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  if (!idBarbearia) {
    alert("Erro: Nenhuma barbearia encontrada.");
    return;
  }

  carregarServicos();

  $("#abrirModalAdicionar").addEventListener("click", () =>
    abrirModal("novo")
  );
  $("#btnFecharModal").addEventListener("click", fecharModal);
  $("#btnCancelar").addEventListener("click", fecharModal);

  $("#modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") fecharModal();
  });

  $("#formServico").addEventListener("submit", salvarFormulario);

  lucide?.createIcons?.();
});

/* ================================
   LISTAR SERVIÇOS
================================ */
async function carregarServicos() {
  const res = await fetch(
    `../Barbearia/servicos.php?action=listar&id_barbearia=${idBarbearia}`
  );
  servicos = await res.json();

  render();
}

/* ================================
   RENDERIZA
================================ */
function render() {
  const lista = $("#listaServicos");
  lista.innerHTML = "";

  if (!servicos.length) {
    lista.innerHTML = "<p>Nenhum serviço cadastrado.</p>";
    return;
  }

  servicos.forEach((s, i) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="info">
        <div class="avatar"><i data-lucide="scissors"></i></div>

        <div class="dados">
          <h3>${escapeHTML(s.nome)}</h3>
          <p class="desc">${escapeHTML(s.descricao ?? "")}</p>

          <div class="linha-preco">
            <span class="preco">R$ ${Number(s.preco).toFixed(2)}</span>
            <span class="tempo">${s.duracao} min</span>
          </div>
        </div>
      </div>

      <div class="acoes">
        <button class="icon-btn" onclick="editarServico(${i})">
          <i data-lucide="pencil"></i>
        </button>
        <button class="icon-btn" onclick="removerServico(${i})">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    lista.appendChild(card);
  });

  lucide?.createIcons?.();
}

/* ================================
   MODAL
================================ */
function abrirModal(modo, index = null) {
  editando = modo === "editar" ? index : null;

  if (modo === "novo") {
    $("#modalTitulo").textContent = "Novo Serviço";
    $("#btnSalvar").textContent = "Adicionar";
    $("#formServico").reset();
  } else {
    const s = servicos[index];

    $("#modalTitulo").textContent = "Editar Serviço";
    $("#btnSalvar").textContent = "Salvar";

    $("#nomeServico").value = s.nome;
    $("#descricao").value = s.descricao;
    $("#valor").value = s.preco;
    $("#duracao").value = s.duracao;
  }

  $("#modalOverlay").classList.add("aberta");
}

function fecharModal(reset = false) {
  $("#modalOverlay").classList.remove("aberta");
  if (reset) $("#formServico").reset();
}

/* ================================
   EDITAR
================================ */
function editarServico(i) {
  abrirModal("editar", i);
}

/* ================================
   EXCLUIR
================================ */
async function removerServico(i) {
  const s = servicos[i];

  if (!confirm("Deseja realmente excluir este serviço?")) return;

  await fetch(
    `../Barbearia/servicos.php?action=excluir&id_servico=${s.id_servico}`
  );

  carregarServicos();
}

/* ================================
   SALVAR (Adicionar/Editar)
================================ */
async function salvarFormulario(e) {
  e.preventDefault();

  const nome = $("#nomeServico").value.trim();
  const descricao = $("#descricao").value.trim();
  const preco = $("#valor").value.trim();
  const duracao = $("#duracao").value.trim();

  if (!nome || !preco || !duracao) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  const dados = new FormData();
  dados.append("id_barbearia", idBarbearia);
  dados.append("nome", nome);
  dados.append("descricao", descricao);
  dados.append("preco", preco);
  dados.append("duracao", duracao);

  if (editando === null) {
    // cadastrar
    await fetch(`../Barbearia/servicos.php?action=cadastrar`, {
      method: "POST",
      body: dados,
    });
  } else {
    // editar
    const s = servicos[editando];
    dados.append("id_servico", s.id_servico);

    await fetch(`../Barbearia/servicos.php?action=editar`, {
      method: "POST",
      body: dados,
    });
  }

  fecharModal(true);
  carregarServicos();
}

/* ================================
   Escape HTML
================================ */
function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
