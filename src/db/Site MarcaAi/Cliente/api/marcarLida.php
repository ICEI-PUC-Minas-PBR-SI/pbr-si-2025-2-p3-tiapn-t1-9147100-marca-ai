<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include "../../Tipo_Acesso/conexao.php";

$id = $_POST["id"] ?? null;

if (!$id) {
    echo json_encode(["success" => false]);
    exit;
}

$stmt = $conn->prepare("UPDATE notificacoes SET lida = 1 WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

echo json_encode(["success" => true]);
?>
