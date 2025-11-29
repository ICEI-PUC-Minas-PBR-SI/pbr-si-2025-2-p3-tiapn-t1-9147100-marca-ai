<?php
require_once "../../Tipo_Acesso/conexao.php";
header("Content-Type: application/json");

$idBarbearia = $_GET['id'] ?? null;
$action = $_GET['action'] ?? null;

if ($action === "listar") {

    $sql = "SELECT * FROM vw_profissionais_barbearia WHERE id_barbearia = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idBarbearia);
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode($result->fetch_all(MYSQLI_ASSOC));

    exit;
}

echo json_encode(["erro" => "Ação inválida"]);
