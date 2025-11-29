<?php
// Mostrar erros (somente para testes)
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Conexão com o banco
include("../Tipo_Acesso/conexao.php");

// Lê os dados enviados via JSON
$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$senha = trim($data["senha"] ?? "");

// Validação simples
if ($email === "" || $senha === "") {
    echo json_encode(["success" => false, "message" => "Preencha e-mail e senha."]);
    exit;
}

// 🔹 Busca o registro na tabela de barbearias
$stmt = $conn->prepare("SELECT id, nome, senha FROM barbearias WHERE email = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro no SQL: " . $conn->error]);
    exit;
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Barbearia não encontrada."]);
    $stmt->close();
    $conn->close();
    exit;
}

$barbearia = $result->fetch_assoc();

// Comparação direta (sem hash de senha ainda)
if ($senha === trim($barbearia["senha"])) {
    echo json_encode([
        "success" => true,
        "user" => [
            "id" => $barbearia["id"],
            "nome" => $barbearia["nome"],
            "tipo" => "barbearia"
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Senha incorreta."]);
}

$stmt->close();
$conn->close();
?>
