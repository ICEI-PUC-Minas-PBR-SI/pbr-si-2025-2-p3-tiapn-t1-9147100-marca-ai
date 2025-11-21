document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setActiveNavIcon("agendamentos");

  const listaServicos = document.getElementById("listaServicos");
  const listaProfissionais = document.getElementById("listaProfissionais");
  const listaHorarios = document.getElementById("listaHorarios");
  const btnConfirmar = document.getElementById("btnConfirmar");
  const dataInput = document.getElementById("data");
  const toastContainer = document.getElementById("toast-container");

  // Pega a barbearia selecionada da página anterior
  const barbeariaSelecionada = JSON.parse(localStorage.getItem("barbeariaSelecionada")) || {
    nome: "Barbearia Elite", 
    endereco: "Endereço não informado"
  };

  // Serviços disponíveis
  const servicos = [
    { nome: "Corte Simples", valor: "R$30,00", tempo: "30 min" },
    { nome: "Barba", valor: "R$25,00", tempo: "25 min" },
    { nome: "Sobrancelha", valor: "R$15,00", tempo: "15 min" },
    { nome: "Corte + Barba", valor: "R$50,00", tempo: "50 min" },
    { nome: "Corte + Barba + Sobrancelha", valor: "R$60,00", tempo: "60 min" },
    { nome: "Tintura", valor: "R$70,00", tempo: "60 min" }
  ];

  // Profissionais
  const profissionais = [
    { nome: "João", especialidade: "Cortes modernos e degradê" },
    { nome: "Pedro", especialidade: "Barbas e sobrancelhas" },
    { nome: "Marcos", especialidade: "Cortes clássicos e barba completa" },
    { nome: "Lucas", especialidade: "Tintura e cortes estilizados" }
  ];

  // Horários já ocupados
  const horariosOcupados = {
    "2025-11-12": ["09:00", "10:00", "15:30"],
    "2025-11-13": ["08:30", "12:00"]
  };

  // Estado atual do agendamento
  let selecionado = { servico: null, profissional: null, data: null, horario: null };

  // Renderiza lista de serviços
  servicos.forEach(s => {
    const card = document.createElement("div");
    card.className = "card-item";
    card.innerHTML = `
      <div>
        <strong>${s.nome}</strong>
        <span>${s.tempo}</span>
      </div>
      <div class="card-preco">${s.valor}</div>
    `;
    card.addEventListener("click", () => selecionarItem("servico", card, s.nome));
    listaServicos.appendChild(card);
  });

  // Renderiza lista de profissionais
  profissionais.forEach(p => {
    const card = document.createElement("div");
    card.className = "card-item";
    card.innerHTML = `<div><strong>${p.nome}</strong><span>${p.especialidade}</span></div>`;
    card.addEventListener("click", () => selecionarItem("profissional", card, p.nome));
    listaProfissionais.appendChild(card);
  });

  // Define data mínima (hoje)
  const hoje = new Date().toISOString().split("T")[0];
  dataInput.min = hoje;
  dataInput.addEventListener("change", () => {
    selecionado.data = dataInput.value;
    renderHorarios(dataInput.value);
    verificarCampos();
  });

  // Renderiza horários de funcionamento e disponibilidade
  function renderHorarios(dataSelecionada) {
    listaHorarios.innerHTML = "";
    if (!dataSelecionada) return;

    const data = new Date(dataSelecionada);
    if (data.getDay() === 0) {
      listaHorarios.innerHTML = "<p> Barbearia fechada neste dia.</p>";
      return;
    }

    const horarios = [];
    for (let h = 8; h < 19; h++) {
      horarios.push(`${String(h).padStart(2, "0")}:00`);
      horarios.push(`${String(h).padStart(2, "0")}:30`);
    }

    const ocupados = horariosOcupados[dataSelecionada] || [];
    horarios.forEach(h => {
      const item = document.createElement("div");
      item.textContent = h;
      item.className = "item-h";
      if (ocupados.includes(h)) {
        item.classList.add("ocupado");
      } else {
        item.addEventListener("click", () => selecionarItem("horario", item, h));
      }
      listaHorarios.appendChild(item);
    });
  }

  // Função genérica para seleção
  function selecionarItem(tipo, elemento, valor) {
    const grupo = {
      servico: listaServicos,
      profissional: listaProfissionais,
      horario: listaHorarios
    }[tipo];

    if (grupo) grupo.querySelectorAll(".ativo").forEach(el => el.classList.remove("ativo"));
    elemento.classList.add("ativo");
    selecionado[tipo] = valor;
    verificarCampos();
  }

  // Verifica se todas as seleções foram feitas
  function verificarCampos() {
    const completo = Object.values(selecionado).every(v => v);
    btnConfirmar.disabled = !completo;
  }

  // Toast de mensagens
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // Função para criar notificação de agendamento
  function criarNotificacaoAgendamento(barbearia, servico, profissional, data, horario) {
    let notificacoes = JSON.parse(localStorage.getItem("notificacoes")) || [];
    
    // Formatar a data para exibição (dd/mm/aaaa)
    const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    
    const novaNotificacao = {
      id: Date.now(),
      titulo: "Agendamento Confirmado",
      mensagem: `Seu ${servico.toLowerCase()} com ${profissional} na ${barbearia} foi confirmado para ${dataFormatada} às ${horario}`,
      data: new Date().toLocaleString("pt-BR"),
      lida: false
    };
    
    notificacoes.unshift(novaNotificacao);
    localStorage.setItem("notificacoes", JSON.stringify(notificacoes));
  }

  // Confirma agendamento e salva no localStorage
  btnConfirmar.addEventListener("click", () => {
    const precoSelecionado = document.querySelector(".card-item.ativo .card-preco")?.innerText || "R$ -";

    // Usa a barbearia que foi selecionada na página anterior
    const novoAgendamento = {
      barbearia: barbeariaSelecionada.nome, 
      servico: selecionado.servico,
      profissional: selecionado.profissional,
      data: selecionado.data,
      horario: selecionado.horario,
      valor: precoSelecionado
    };

    // Salva no localStorage
    let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(novoAgendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    // CRIA A NOTIFICAÇÃO AUTOMATICAMENTE
    criarNotificacaoAgendamento(
      novoAgendamento.barbearia,
      novoAgendamento.servico,
      novoAgendamento.profissional,
      novoAgendamento.data,
      novoAgendamento.horario
    );

    // Limpa a barbearia selecionada após o agendamento
    localStorage.removeItem("barbeariaSelecionada");

    // Exibe mensagem e redireciona
    showToast("Agendamento confirmado!");
    setTimeout(() => (window.location.href = "agendamentos.html"), 1500);
  });
});
