<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id_barbearia    = $_POST["id_barbearia"] ?? null;
$id_cliente      = $_POST["id_cliente"] ?? null;
$id_servico      = $_POST["id_servico"] ?? null;
$id_profissional = $_POST["id_profissional"] ?? null;
$data_agenda     = $_POST["data_agenda"] ?? null;
$hora            = $_POST["hora"] ?? null;

$original_id     = $_POST["original_id"] ?? null;

if (!$id_barbearia || !$id_cliente || !$id_servico || !$data_agenda || !$hora) {
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

// Verificar conflito de horário
$sql = "SELECT id FROM agendamentos 
        WHERE id_profissional = ? 
        AND data_agenda = ? 
        AND hora = ?
        LIMIT 1";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $id_profissional, $data_agenda, $hora);
$stmt->execute();
$result = $stmt->get_result();

// Se estiver reagendando e o horário encontrado não é o antigo -> erro
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    if (empty($original_id) || $row["id"] != $original_id) {
        echo json_encode(["erro" => "Horário já está reservado!"]);
        exit;
    }
}

// Inserir novo agendamento
$sql = "INSERT INTO agendamentos 
        (id_barbearia, id_cliente, id_servico, id_profissional, data_agenda, hora, status)
        VALUES (?, ?, ?, ?, ?, ?, 'pendente')";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iiiiss",
    $id_barbearia,
    $id_cliente,
    $id_servico,
    $id_profissional,
    $data_agenda,
    $hora
);

if ($stmt->execute()) {

    $novo_id = $stmt->insert_id;

    // 🔥 Criar notificação
    $titulo = "Novo Agendamento";
    $mensagem = "Seu agendamento foi marcado para dia $data_agenda às $hora.";

    $nt = $conn->prepare("INSERT INTO notificacoes (id_cliente, titulo, mensagem) VALUES (?, ?, ?)");
    $nt->bind_param("iss", $id_cliente, $titulo, $mensagem);
    $nt->execute();
    $nt->close();

    // 🔥 Se estava reagendando, apagar o antigo
    if (!empty($original_id)) {
        $del = $conn->prepare("DELETE FROM agendamentos WHERE id = ?");
        $del->bind_param("i", $original_id);
        $del->execute();
        $del->close();

        // Criar notificação sobre reagendamento
        $titulo2 = "Reagendamento concluído";
        $mensagem2 = "Seu agendamento antigo foi substituído pelo novo horário.";

        $nt2 = $conn->prepare("INSERT INTO notificacoes (id_cliente, titulo, mensagem) VALUES (?, ?, ?)");
        $nt2->bind_param("iss", $id_cliente, $titulo2, $mensagem2);
        $nt2->execute();
        $nt2->close();
    }

    echo json_encode(["sucesso" => true, "novo_id" => $novo_id]);

} else {
    echo json_encode(["erro" => $stmt->error]);
}
?>
