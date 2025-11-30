<?php
header('Content-Type: application/json');
include "../../Tipo_Acesso/conexao.php";

$action = $_GET['action'] ?? '';
$id = intval($_GET['id'] ?? 0);

if ($action === 'buscar') {
    if ($id <= 0) {
        echo json_encode(['success'=>false,'message'=>'ID inválido']);
        exit;
    }
    $sql = "SELECT id, nome, cnpj, email, telefone, endereco, descricao, logo FROM barbearias WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($res->num_rows === 0) {
        echo json_encode(['success'=>false,'message'=>'Não encontrado']);
        exit;
    }
    $row = $res->fetch_assoc();
    echo json_encode(['success'=>true,'data'=>$row]);
    exit;
}

// fallback
echo json_encode(['success'=>false,'message'=>'Ação inválida']);
