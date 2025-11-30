<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

require "../Tipo_Acesso/conexao.php"; 

// ======================================================
// 1) ATUALIZAR PERFIL (POST)
// ======================================================
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["success" => false, "message" => "JSON inválido."]);
        exit;
    }

    $id = intval($data["id"] ?? 0);
    $nome = trim($data["nome"] ?? "");
    $email = trim($data["email"] ?? "");
    $telefone = trim($data["telefone"] ?? "");

    if ($id <= 0) {
        echo json_encode(["success" => false, "message" => "ID inválido."]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE usuarios SET nome = ?, email = ?, telefone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $nome, $email, $telefone, $id);
    $ok = $stmt->execute();

    if ($ok) {
        echo json_encode(["success" => true, "message" => "Perfil atualizado com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erro ao atualizar o perfil."]);
    }

    $stmt->close();
    $conn->close();
    exit;
}


// ======================================================
// 2) BUSCAR PERFIL (GET)
// ======================================================
$id = intval($_GET['id'] ?? 0);

if ($id <= 0) {
    echo json_encode(['success'=>false, 'message'=>'ID inválido']);
    exit;
}

$stmt = $conn->prepare("SELECT nome, email, telefone FROM usuarios WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

    $perfil = $result->fetch_assoc();

    echo json_encode([
        'success' => true,
        'perfil' => [
            'nome' => $perfil['nome'],
            'email' => $perfil['email'],
            'telefone' => $perfil['telefone'],
            'desde' => null   
        ]
    ]);

} else {

    echo json_encode(['success'=>false, 'message'=>'Usuário não encontrado']);

}

$stmt->close();
$conn->close();
?>
