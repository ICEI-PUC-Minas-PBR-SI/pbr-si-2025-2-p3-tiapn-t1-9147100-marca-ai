<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id_cliente = $_GET["id_cliente"] ?? null;

if (!$id_cliente) {
    echo json_encode(["success" => false, "message" => "Cliente não enviado"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM notificacoes WHERE id_cliente = ? ORDER BY data DESC");
$stmt->bind_param("i", $id_cliente);
$stmt->execute();

$result = $stmt->get_result();
$lista = [];

while ($row = $result->fetch_assoc()) {
    $lista[] = $row;
}

echo json_encode(["success" => true, "notificacoes" => $lista]);
?>
