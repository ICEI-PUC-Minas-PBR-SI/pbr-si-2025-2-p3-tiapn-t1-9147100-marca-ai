<?php
header('Content-Type: application/json');
include "../../Tipo_Acesso/conexao.php";

$id = intval($_POST['id_barbearia'] ?? 0);
$nome = $_POST['nome'] ?? '';
$cnpj = $_POST['cnpj'] ?? '';
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$endereco = $_POST['endereco'] ?? '';
$descricao = $_POST['descricao'] ?? '';

if ($id <= 0) {
    echo json_encode(['success'=>false,'message'=>'ID inválido']);
    exit;
}

$sql = "UPDATE barbearias SET nome=?, cnpj=?, email=?, telefone=?, endereco=?, descricao=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi", $nome, $cnpj, $email, $telefone, $endereco, $descricao, $id);
$ok = $stmt->execute();

if ($ok) {
    echo json_encode(['success'=>true,'message'=>'Atualizado']);
} else {
    echo json_encode(['success'=>false,'message'=>'Erro ao atualizar']);
}
