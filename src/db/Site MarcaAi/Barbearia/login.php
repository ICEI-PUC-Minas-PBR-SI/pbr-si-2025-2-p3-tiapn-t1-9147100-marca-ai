<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");


include("../Tipo_Acesso/conexao.php");


$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data["email"] ?? "");
$senha = trim($data["senha"] ?? "");


if ($email === "" || $senha === "") {
    echo json_encode(["success" => false, "message" => "Preencha e-mail e senha."]);
    exit;
}


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
