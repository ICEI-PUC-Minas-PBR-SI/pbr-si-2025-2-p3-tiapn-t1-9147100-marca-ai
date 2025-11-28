<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require "../Tipo_Acesso/conexao.php"; 

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
