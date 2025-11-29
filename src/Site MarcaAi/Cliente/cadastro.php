<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Ajuste o caminho para o seu conexao.php se necessário
include("../Tipo_Acesso/conexao.php");

$data = json_decode(file_get_contents("php://input"), true);

$nome = trim($data["nome"] ?? "");
$email = trim($data["email"] ?? "");
$telefone = trim($data["telefone"] ?? "");
$senha = trim($data["senha"] ?? "");
$tipo = trim($data["tipo"] ?? "cliente"); // padrão cliente

if ($nome === "" || $email === "" || $telefone === "" || $senha === "") {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    exit;
}

// Verifica se e-mail já existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro na consulta."]);
    exit;
}
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "E-mail já cadastrado."]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// Insere no banco (senha em texto puro)
$stmt = $conn->prepare("INSERT INTO usuarios (nome, email, telefone, senha, tipo) VALUES (?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro ao preparar inserção."]);
    $conn->close();
    exit;
}
$stmt->bind_param("sssss", $nome, $email, $telefone, $senha, $tipo);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao cadastrar usuário."]);
}

$stmt->close();
$conn->close();
?>
