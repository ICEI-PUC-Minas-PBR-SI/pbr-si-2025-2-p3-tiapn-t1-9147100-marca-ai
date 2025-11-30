<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id_barbearia = $_GET["id_barbearia"] ?? 0;

if ($id_barbearia == 0) {
    echo json_encode(["success" => false, "message" => "ID inválido"]);
    exit;
}

$dados = [];

/* Profissionais */
$sql = "SELECT COUNT(*) AS total FROM profissional WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_barbearia);
$stmt->execute();
$dados["profissionais"] = $stmt->get_result()->fetch_assoc()["total"];

/* Serviços */
$sql = "SELECT COUNT(*) AS total FROM servicos WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_barbearia);
$stmt->execute();
$dados["servicos"] = $stmt->get_result()->fetch_assoc()["total"];

/* Agendamentos (todos) */
$sql = "SELECT COUNT(*) AS total FROM agendamentos WHERE id_barbearia = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_barbearia);
$stmt->execute();
$dados["agendamentos"] = $stmt->get_result()->fetch_assoc()["total"];

echo json_encode(["success" => true, "dados" => $dados]);
?>
