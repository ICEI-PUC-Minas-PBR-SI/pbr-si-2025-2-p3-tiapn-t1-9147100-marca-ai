<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id_agendamento = $_POST["id"] ?? null;
$id_cliente     = $_POST["id_cliente"] ?? null;

if (!$id_agendamento) {
    echo json_encode(["success" => false, "message" => "ID não enviado"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM agendamentos WHERE id = ?");
$stmt->bind_param("i", $id_agendamento);

if ($stmt->execute()) {

    // Criar notificação
    if ($id_cliente) {
        $titulo = "Agendamento Cancelado";
        $mensagem = "Seu agendamento foi cancelado com sucesso.";

        $nt = $conn->prepare("INSERT INTO notificacoes (id_cliente, titulo, mensagem) VALUES (?, ?, ?)");
        $nt->bind_param("iss", $id_cliente, $titulo, $mensagem);
        $nt->execute();
        $nt->close();
    }

    echo json_encode(["success" => true]);

} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}
?>
