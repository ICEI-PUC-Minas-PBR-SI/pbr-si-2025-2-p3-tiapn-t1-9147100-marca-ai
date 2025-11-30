document.addEventListener("DOMContentLoaded", () => {
  const idBarbearia = localStorage.getItem("id_barbearia");
  if (!idBarbearia) { alert("Nenhuma barbearia logada"); return; }

  carregarPerfil(idBarbearia);

  const btn = document.getElementById("salvarBtn") || document.getElementById("btnSalvar");
  if (btn) {
    btn.addEventListener("click", () => atualizarPerfil(idBarbearia));
  } else {
    console.warn("Botão salvar não encontrado. Certifique-se de ter id='salvarBtn' no HTML.");
  }
});

async function carregarPerfil(id) {
  try {
    const res = await fetch(`api/perfil.php?action=buscar&id=${id}`);
    const data = await res.json();
    console.log("perfil fetch:", data);
    if (!data.success) { alert("Erro: "+(data.message||"")); return; }
    const p = data.data;
    document.getElementById("nome").value = p.nome || "";
    document.getElementById("cnpj").value = p.cnpj || "";
    document.getElementById("email").value = p.email || "";
    document.getElementById("telefone").value = p.telefone || "";
    document.getElementById("endereco").value = p.endereco || "";
    document.getElementById("descricao").value = p.descricao || "";
  } catch (e) {
    console.error("Erro ao carregar perfil", e);
    alert("Erro ao carregar perfil (ver console).");
  }
}

async function atualizarPerfil(id) {
  const f = new FormData();
  f.append("id_barbearia", id);
  f.append("nome", document.getElementById("nome").value);
  f.append("cnpj", document.getElementById("cnpj").value);
  f.append("email", document.getElementById("email").value);
  f.append("telefone", document.getElementById("telefone").value);
  f.append("endereco", document.getElementById("endereco").value);
  f.append("descricao", document.getElementById("descricao").value);

  try {
    const res = await fetch("api/perfilUpdate.php", { method: "POST", body: f });
    const data = await res.json();
    if (data.success) { alert("Perfil atualizado!"); }
    else { alert("Erro: "+(data.message||"")); }
  } catch (e) {
    console.error("Erro atualizar", e);
    alert("Erro ao atualizar (ver console).");
  }
}
