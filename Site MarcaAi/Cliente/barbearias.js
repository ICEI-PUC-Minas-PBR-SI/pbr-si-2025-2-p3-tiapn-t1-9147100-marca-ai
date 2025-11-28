document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const barbearias = [
    {
      nome: "Barbearia Elite",
      endereco: "Rua das Flores, 123 - Centro",
      avaliacao: 4.8,
      totalAvaliacoes: 127,
      imagem: "../img/barbearia1.jpg"
    },
    {
      nome: "Barbearia Clássica",
      endereco: "Av. Brasil, 200 - Jardim",
      avaliacao: 4.6,
      totalAvaliacoes: 89,
      imagem: "../img/barbearia2.jpg",
    },
    {
      nome: "Old School Barber",
      endereco: "Rua XV de Novembro, 45 - Centro",
      avaliacao: 4.9,
      totalAvaliacoes: 203,
      imagem: "../img/barbearia3.jpg",
    },
    {
      nome: "Barbearia Premium",
      endereco: "Av. Independência, 890 - Bela Vista",
      avaliacao: 4.7,
      totalAvaliacoes: 156,
      imagem: "../img/barbearia4.jpg",
    },
    {
      nome: "Barbearia Reino Dos Cortes",
      endereco: "Rua Projetada, 999 - Centro",
      avaliacao: 4.5,
      totalAvaliacoes: 42,
      imagem: "../img/barbearia5.jpg",
    },
    {
      nome: "Barbearia Vinicin",
      endereco: "Rua Dona Ana, 137 - Amazonas",
      avaliacao: 4.5,
      totalAvaliacoes: 29,
      imagem: "../img/barbearia6.jpg",
    },
    {
      nome: "Barbearia Do Zé",
      endereco: "Rua Tupi, 34 - Industrial",
      avaliacao: 4.8,
      totalAvaliacoes: 33,
      imagem: "../img/barbearia7.jpg",
    },
  ];

  const container = document.getElementById("barbeariasContainer");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");

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
        <img src="${b.imagem}" alt="Imagem da ${b.nome}">
        <div class="barbearia-info">
          <h2>${b.nome}</h2>
          <p><i data-lucide="map-pin"></i> ${b.endereco}</p>
        </div>
        <div class="barbearia-footer">
          <div class="rating">
            <i data-lucide="star"></i> ${b.avaliacao.toFixed(1)}
            <small>(${b.totalAvaliacoes} avaliações)</small>
          </div>
          <button class="agendar-btn">
            <i data-lucide="calendar"></i> Agendar
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    lucide.createIcons();
    addEventListeners(lista); 
  }

  function addEventListeners(listaBarbearias) {
    document.querySelectorAll(".agendar-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const barbeariaSelecionada = listaBarbearias[index];
        localStorage.setItem("barbeariaSelecionada", JSON.stringify({
          nome: barbeariaSelecionada.nome,
          endereco: barbeariaSelecionada.endereco,
          avaliacao: barbeariaSelecionada.avaliacao
        }));
        
        window.location.href = "agendar.html";
      });
    });
  }

  searchInput.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    const filtradas = barbearias.filter((b) =>
      b.nome.toLowerCase().includes(termo)
    );
    renderCards(filtradas);
  });

  renderCards(barbearias);
  setActiveNavIcon("barbearias");
});
