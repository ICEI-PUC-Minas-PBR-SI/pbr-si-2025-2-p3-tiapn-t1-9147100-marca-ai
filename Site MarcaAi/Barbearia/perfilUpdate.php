<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "marcaai_db");

if ($conn->connect_error) {
    echo json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados) {
    echo json_encode(["erro" => "Nenhum dado recebido"]);
    exit;
}

$idBarbearia = $dados["id"] ?? null;

if (!$idBarbearia) {
    echo json_encode(["erro" => "ID não informado"]);
    exit;
}

$nome     = $dados["info"]["nome"];
$cnpj     = $dados["info"]["cnpj"];
$email    = $dados["info"]["email"];
$telefone = $dados["info"]["telefone"];
$endereco = $dados["info"]["endereco"];

$stmt = $conn->prepare("
    UPDATE barbearias
    SET nome=?, cnpj=?, email=?, telefone=?, endereco=?
    WHERE id=?
");

$stmt->bind_param("sssssi",
    $nome, $cnpj, $email, $telefone, $endereco, $idBarbearia
);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["erro" => $stmt->error]);
}
?>
