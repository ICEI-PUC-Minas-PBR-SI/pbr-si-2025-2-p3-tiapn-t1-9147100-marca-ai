document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  carregarProfissionais();

  document.getElementById("abrirModalAdicionar").addEventListener("click", () => {
    abrirModalAdicionar();
  });

  document.getElementById("btnFecharModal").addEventListener("click", fecharModal);
  document.getElementById("btnCancelar").addEventListener("click", fecharModal);

  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") fecharModal();
  });

  document.getElementById("formProfissional").addEventListener("submit", salvarProfissional);
});



async function carregarProfissionais() {
  const lista = document.getElementById("listaProfissionais");
  const idBarbearia = localStorage.getItem("idBarbearia");

  const res = await fetch(`profissionais.php?action=listar&id=${idBarbearia}`);
  const data = await res.json();

  lista.innerHTML = "";

  data.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="info">
        <div class="avatar"><i data-lucide="user"></i></div>
        <div class="dados">
          <h3>${p.nome}</h3>
          <p>${p.especialidade}</p>
          <p>${p.telefone}</p>
        </div>
      </div>

      <div class="acoes">
        <button class="icon-btn" onclick="abrirModalEditar(${p.id})">
          <i data-lucide="pencil"></i>
        </button>

        <button class="icon-btn" onclick="excluirProfissional(${p.id})">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    lista.appendChild(card);
  });

  lucide.createIcons();
}



function abrirModalAdicionar() {
  document.getElementById("modalTitulo").innerText = "Novo Profissional";
  document.getElementById("btnSalvar").innerText = "Adicionar";

  document.getElementById("idProfissional").value = "";
  document.getElementById("formProfissional").reset();

  abrirModal();
}



async function abrirModalEditar(id) {
  const res = await fetch(`profissionais.php?action=buscar&id=${id}`);
  const p = await res.json();

  document.getElementById("modalTitulo").innerText = "Editar Profissional";
  document.getElementById("btnSalvar").innerText = "Salvar";

  document.getElementById("idProfissional").value = p.id;
  document.getElementById("nome").value = p.nome;
  document.getElementById("especialidade").value = p.especialidade;
  document.getElementById("telefone").value = p.telefone;

  abrirModal();
}



async function salvarProfissional(e) {
  e.preventDefault();

  const id = document.getElementById("idProfissional").value;
  const nome = document.getElementById("nome").value;
  const especialidade = document.getElementById("especialidade").value;
  const telefone = document.getElementById("telefone").value;
  const idBarbearia = localStorage.getItem("barbeariaId");

  const formData = new FormData();
  formData.append("id", id);
  formData.append("id_barbearia", idBarbearia);
  formData.append("nome", nome);
  formData.append("especialidade", especialidade);
  formData.append("telefone", telefone);

  const action = id ? "editar" : "cadastrar";

  const res = await fetch(`profissionais.php?action=${action}`, {
    method: "POST",
    body: formData
  });

  const msg = await res.text();
  alert(msg);

  fecharModal();
  carregarProfissionais();
}



async function excluirProfissional(id) {
  if (!confirm("Deseja realmente excluir este profissional?")) return;

  const res = await fetch(`profissionais.php?action=excluir&id=${id}`);
  const msg = await res.text();

  alert(msg);
  carregarProfissionais();
}



function abrirModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.add("aberta");
  overlay.setAttribute("aria-hidden", "false");
}

function fecharModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("aberta");
  overlay.setAttribute("aria-hidden", "true");
}
