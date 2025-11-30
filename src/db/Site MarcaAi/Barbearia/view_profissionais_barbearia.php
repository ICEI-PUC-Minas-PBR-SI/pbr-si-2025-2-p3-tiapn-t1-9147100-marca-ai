<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$id = $_GET["id_barbearia"] ?? null;
if (!$id) { echo json_encode([]); exit; }

$sql = "SELECT * FROM vw_profissionais_barbearia WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

$out = [];
while ($row = $res->fetch_assoc()) $out[] = $row;
echo json_encode($out);
