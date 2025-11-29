
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".bottom-nav");

  if (!navContainer) return;

  navContainer.innerHTML = `
    <div class="nav-item" id="nav-barbearias" onclick="window.location.href='barbearias.html'">
      <i data-lucide="scissors"></i>
      <span>Barbearias</span>
    </div>

    <div class="nav-item" id="nav-agendamentos" onclick="window.location.href='agendamentos.html'">
      <i data-lucide="calendar-days"></i>
      <span>Agendamentos</span>
    </div>

    <div class="nav-item" id="nav-perfil" onclick="window.location.href='perfil.html'">
      <i data-lucide="user"></i>
      <span>Perfil</span>
    </div>
  `;

  lucide.createIcons();
});


function setActiveNavIcon(pagina) {
  const itens = document.querySelectorAll(".nav-item");
  itens.forEach((item) => {
    item.classList.remove("ativo");
  });

  const ativo = document.getElementById(`nav-${pagina}`);
  if (ativo) ativo.classList.add("ativo");
}
