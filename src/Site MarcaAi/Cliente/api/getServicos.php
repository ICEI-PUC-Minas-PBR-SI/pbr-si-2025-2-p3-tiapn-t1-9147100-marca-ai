<?php
header('Content-Type: application/json');
require_once "../../Tipo_Acesso/conexao.php";

$id_barbearia = $_GET['id'] ?? 0;

$sql = "SELECT * FROM vw_servicos_barbearia WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_barbearia);
$stmt->execute();

$result = $stmt->get_result();
$servicos = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($servicos);
