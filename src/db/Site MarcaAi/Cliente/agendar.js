// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let servicoSelecionado = null;
let profissionalSelecionado = null;
let duracaoServico = null;
let dataSelecionada = null;
let horarioSelecionado = null;

// ELEMENTOS
const listaServicos = document.getElementById("listaServicos");
const listaProfissionais = document.getElementById("listaProfissionais");
const listaHorarios = document.getElementById("listaHorarios");
const inputData = document.getElementById("data");
const btnConfirmar = document.getElementById("btnConfirmar");

// ===============================
// AO CARREGAR A PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const idBarbearia = localStorage.getItem("id_barbearia") 
                     || localStorage.getItem("barbearia_id");

    console.log("ID da barbearia carregado:", idBarbearia);

    if (!idBarbearia) {
        alert("Nenhuma barbearia encontrada!");
        return;
    }

    carregarServicos(idBarbearia);
    carregarProfissionais(idBarbearia);
});

// ===============================
// CARREGAR SERVIÇOS
// ===============================
async function carregarServicos(idBarbearia) {
    try {
        const res = await fetch(`../Barbearia/view_servicos_barbearia.php?id_barbearia=${idBarbearia}`);

        const data = await res.json();
        listaServicos.innerHTML = "";

        data.forEach(servico => {
            const div = document.createElement("div");

            div.classList.add("card-item");
            div.dataset.id = servico.id_servico;
            div.dataset.duracao = servico.duracao;

            div.innerHTML = `
                <strong>${servico.nome_servico}</strong>
                <span>${servico.descricao ?? ""}</span>
                <span>R$ ${Number(servico.preco).toFixed(2)}</span>
            `;

            div.addEventListener("click", () => {
                document.querySelectorAll("#listaServicos .card-item").forEach(c => c.classList.remove("ativo"));
                div.classList.add("ativo");

                servicoSelecionado = servico.id_servico;
                duracaoServico = servico.duracao;

                carregarHorarios();
            });

            listaServicos.appendChild(div);
        });

    } catch (err) {
        console.error("Erro ao carregar serviços:", err);
    }
}

// ===============================
// CARREGAR PROFISSIONAIS
// ===============================
async function carregarProfissionais(idBarbearia) {
    try {
        const res = await fetch(`../Barbearia/view_profissionais_barbearia.php?id_barbearia=${idBarbearia}`);

        const data = await res.json();
        listaProfissionais.innerHTML = "";

        data.forEach(p => {
            const div = document.createElement("div");

            div.classList.add("card-item");
            div.dataset.id = p.id_profissional;

            div.innerHTML = `
                <strong>${p.nome_profissional}</strong>
                <span>${p.especialidade ?? ""}</span>
            `;

            div.addEventListener("click", () => {
                document.querySelectorAll("#listaProfissionais .card-item").forEach(c => c.classList.remove("ativo"));
                div.classList.add("ativo");

                profissionalSelecionado = p.id_profissional;

                carregarHorarios();
            });

            listaProfissionais.appendChild(div);
        });

    } catch (err) {
        console.error("Erro ao carregar profissionais:", err);
    }
}

// ===============================
// DATA
// ===============================
inputData.addEventListener("change", () => {
    dataSelecionada = inputData.value;
    carregarHorarios();
});

// ===============================
// CARREGAR HORÁRIOS
// ===============================
async function carregarHorarios() {

    if (!profissionalSelecionado || !dataSelecionada || !duracaoServico) {
        listaHorarios.innerHTML = "<p>Selecione serviço, profissional e data.</p>";
        return;
    }

    listaHorarios.innerHTML = "<p>Carregando horários...</p>";

    const diaSemana = new Date(dataSelecionada).getDay();

    const res = await fetch(
        `api/getHorarios.php?id_profissional=${profissionalSelecionado}&dia=${diaSemana}&duracao=${duracaoServico}&data=${dataSelecionada}`
    );

    const horarios = await res.json();

    listaHorarios.innerHTML = "";

    if (!horarios.length) {
        listaHorarios.innerHTML = "<p>Nenhum horário disponível.</p>";
        return;
    }

    horarios.forEach(hora => {
        const div = document.createElement("div");

        div.classList.add("item-h"); // usa seu CSS
        div.textContent = hora;

        div.addEventListener("click", () => {
            document.querySelectorAll(".item-h").forEach(x => x.classList.remove("ativo"));
            div.classList.add("ativo");

            horarioSelecionado = hora;
            btnConfirmar.disabled = false;
        });

        listaHorarios.appendChild(div);
    });
}

// ===============================
// CONFIRMAR AGENDAMENTO
// ===============================
btnConfirmar.addEventListener("click", async () => {

    const id_cliente = localStorage.getItem("cliente_id");
    const id_barbearia = localStorage.getItem("id_barbearia") || localStorage.getItem("barbearia_id");

    if (!id_cliente || !id_barbearia || !servicoSelecionado || !profissionalSelecionado || !dataSelecionada || !horarioSelecionado) {
        alert("Preencha todas as informações!");
        return;
    }

    const form = new FormData();
    form.append("id_barbearia", id_barbearia);
    form.append("id_cliente", id_cliente);
    form.append("id_servico", servicoSelecionado);
    form.append("id_profissional", profissionalSelecionado);
    form.append("data_agenda", dataSelecionada);
    form.append("hora", horarioSelecionado);

    const res = await fetch("api/salvarAgendamento.php", {
        method: "POST",
        body: form
    });

    const json = await res.json();
    console.log("Resposta salvar:", json);

    if (json.sucesso) {
        alert("Agendamento realizado com sucesso!");
        window.location.href = "agendamentos.html";
    } else {
        alert("Erro ao agendar: " + json.erro);
    }
});

