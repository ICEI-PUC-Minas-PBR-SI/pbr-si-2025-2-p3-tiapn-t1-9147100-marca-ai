<?php
header("Content-Type: text/plain");
include "../Tipo_Acesso/conexao.php";

$action = $_GET['action'] ?? $_POST['action'] ?? null;

if ($action === 'cadastrar') {
    $id_cliente = $_POST['id_cliente'];
    $id_barbearia = $_POST['id_barbearia'];
    $id_servico = $_POST['id_servico'];
    $id_profissional = $_POST['id_profissional'];
    $data = $_POST['data'];
    $hora = $_POST['hora'];

    // Exemplo de tabela 'agendamentos' (crie antes no banco)
    $sql = "INSERT INTO agendamentos (id_barbearia, id_cliente, id_servico, id_profissional, data_agenda, hora, status)
            VALUES (?, ?, ?, ?, ?, ?, 'pendente')";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiiss", $id_barbearia, $id_cliente, $id_servico, $id_profissional, $data, $hora);
    if ($stmt->execute()) {
        echo "Agendamento cadastrado com sucesso!";
    } else {
        http_response_code(500);
        echo "Erro ao cadastrar agendamento.";
    }
    exit;
}
