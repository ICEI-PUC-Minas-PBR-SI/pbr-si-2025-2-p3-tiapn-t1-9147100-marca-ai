<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id = $_POST["id"] ?? null;

if (!$id) {
    echo json_encode(["success" => false]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM notificacoes WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode(["success" => true]);
?>
