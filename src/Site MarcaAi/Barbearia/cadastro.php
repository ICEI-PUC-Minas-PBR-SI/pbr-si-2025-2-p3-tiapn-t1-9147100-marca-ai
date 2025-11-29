<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");


include "../Tipo_Acesso/conexao.php";


if (!isset($conn) || $conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro na conexão com o banco."]);
    exit;
}


$input = file_get_contents("php://input");
if (!$input) {
    echo json_encode(["success" => false, "message" => "Nenhum dado recebido."]);
    exit;
}

$data = json_decode($input, true);
if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "Formato de dados inválido."]);
    exit;
}


$nome = trim($data["nome"] ?? "");
$cnpj = trim($data["cnpj"] ?? "");
$email = trim($data["email"] ?? "");
$telefone = trim($data["telefone"] ?? "");
$endereco = trim($data["endereco"] ?? "");
$senha = trim($data["senha"] ?? "");


if (!$nome || !$cnpj || !$email || !$telefone || !$endereco || !$senha) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    exit;
}


$sql = "INSERT INTO barbearias (nome, cnpj, email, telefone, endereco, senha)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro no SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssss", $nome, $cnpj, $email, $telefone, $endereco, $senha);


if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Barbearia cadastrada com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $stmt->error]);
}


$stmt->close();
$conn->close();
?>
