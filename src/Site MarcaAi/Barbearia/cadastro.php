<?php
// Mostrar erros no navegador (somente para desenvolvimento)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Cabeçalhos JSON
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Conexão com o banco
include "../Tipo_Acesso/conexao.php";

// Verifica se a conexão existe e está ativa
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Erro na conexão com o banco."]);
    exit;
}

// Recebe os dados enviados via JSON
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

// Campos do formulário
$nome = trim($data["nome"] ?? "");
$cnpj = trim($data["cnpj"] ?? "");
$email = trim($data["email"] ?? "");
$telefone = trim($data["telefone"] ?? "");
$endereco = trim($data["endereco"] ?? "");
$senha = trim($data["senha"] ?? "");

// Validação
if (!$nome || !$cnpj || !$email || !$telefone || !$endereco || !$senha) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    exit;
}

// SQL de inserção
$sql = "INSERT INTO barbearias (nome, cnpj, email, telefone, endereco, senha)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro no SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("ssssss", $nome, $cnpj, $email, $telefone, $endereco, $senha);

// Executa o comando
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Barbearia cadastrada com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar: " . $stmt->error]);
}

// Fecha conexões
$stmt->close();
$conn->close();
?>
