<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$id = $_GET['id_barbearia'] ?? null;

if (!$id) {
    echo json_encode(["erro" => "Nenhuma barbearia informada"]);
    exit();
}

$sql = "SELECT * FROM vw_servicos_barbearia WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$servicos = [];

while ($row = $result->fetch_assoc()) {
    $servicos[] = $row;
}

echo json_encode($servicos);
