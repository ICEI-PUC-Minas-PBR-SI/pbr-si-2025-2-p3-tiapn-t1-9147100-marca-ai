<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$barbearia = $_POST['barbearia'] ?? '';
$profissional = $_POST['profissional'] ?? '';
$comentario = $_POST['comentario'] ?? '';
$estrelas = intval($_POST['estrelas']);

// BUSCA BARBEARIA
$stmt = $conn->prepare("SELECT id FROM barbearias WHERE nome = ?");
$stmt->bind_param("s", $barbearia);
$stmt->execute();
$result = $stmt->get_result();
$barb = $result->fetch_assoc();

if (!$barb) {
    echo json_encode(["erro" => "Barbearia não encontrada"]);
    exit;
}
$id_barbearia = $barb["id"];

// BUSCA PROFISSIONAL
$stmt = $conn->prepare("SELECT id FROM profissional WHERE nome = ? AND id_barbearia = ?");
$stmt->bind_param("si", $profissional, $id_barbearia);
$stmt->execute();
$result = $stmt->get_result();
$prof = $result->fetch_assoc();

if (!$prof) {
    echo json_encode(["erro" => "Profissional não encontrado na barbearia"]);
    exit;
}
$id_profissional = $prof["id"];

// INSERIR AVALIAÇÃO
$stmt = $conn->prepare("
    INSERT INTO avaliacoes (id_barbearia, id_profissional, estrelas, comentario)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("iiis", $id_barbearia, $id_profissional, $estrelas, $comentario);
$ok = $stmt->execute();

echo json_encode(["sucesso" => $ok]);
?>
