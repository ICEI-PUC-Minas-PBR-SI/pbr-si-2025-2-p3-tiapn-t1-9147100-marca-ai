<?php
header('Content-Type: application/json');
require_once "../../Tipo_Acesso/conexao.php";

$sql = "SELECT id, nome, telefone, endereco FROM barbearias ORDER BY nome";
$result = $conn->query($sql);

$barbearias = [];

while ($row = $result->fetch_assoc()) {
    $barbearias[] = $row;
}

echo json_encode($barbearias);
