<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$id = $_POST['id'] ?? null;

$stmt = $conn->prepare("DELETE FROM avaliacoes WHERE id = ?");
$stmt->bind_param("i", $id);
$ok = $stmt->execute();

echo json_encode(["sucesso" => $ok]);
?>
