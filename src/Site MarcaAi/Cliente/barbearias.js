document.addEventListener("DOMContentLoaded", async () => {
  lucide.createIcons();

  const container = document.getElementById("barbeariasContainer");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");

  async function carregarBarbearias() {
    const res = await fetch("api/getBarbearias.php");
    const data = await res.json();

    renderCards(data);
  }

  function renderCards(lista) {
    container.innerHTML = "";
    if (lista.length === 0) {
      noResults.style.display = "block";
      return;
    }
    noResults.style.display = "none";

    lista.forEach((b) => {
      const card = document.createElement("div");
      card.className = "barbearia-card";

      card.innerHTML = `
        <img src="../img/barbearia1.jpg">
        <div class="barbearia-info">
          <h2>${b.nome}</h2>
          <p><i data-lucide="map-pin"></i> ${b.endereco}</p>
        </div>
        <div class="barbearia-footer">
          <div class="rating">
            <i data-lucide="star"></i> ${(b.avaliacao ?? 4.5).toFixed(1)}
            <small>(0 avaliações)</small>
          </div>
          <button class="agendar-btn" data-id="${b.id}">
            <i data-lucide="calendar"></i> Agendar
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    lucide.createIcons();
    addEventListeners(lista);
  }

  function addEventListeners() {
    document.querySelectorAll(".agendar-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const barbeariaId = btn.getAttribute("data-id");

        // AGORA SIM: salvando o ID certo
        localStorage.setItem("barbearia_id", barbeariaId);

        console.log("ID SALVO:", barbeariaId);

        window.location.href = "agendar.html";
      });
    });
  }

  searchInput.addEventListener("input", async (e) => {
    const termo = e.target.value.toLowerCase();
    const res = await fetch("api/getBarbearias.php");
    const data = await res.json();

    const filtradas = data.filter((b) =>
      b.nome.toLowerCase().includes(termo)
    );

    renderCards(filtradas);
  });

  carregarBarbearias();
});
