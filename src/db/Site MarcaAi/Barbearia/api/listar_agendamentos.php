<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

include "../../Tipo_Acesso/conexao.php";  // ← CAMINHO CORRIGIDO

$id_barbearia = $_GET["id_barbearia"] ?? null;

if (!$id_barbearia) {
    echo json_encode(["success" => false, "message" => "Barbearia não informada"]);
    exit;
}

$sql = "
    SELECT 
        a.id,
        a.data_agenda,
        a.hora,
        a.status,

        s.nome AS servico,
        p.nome AS profissional,
        u.nome AS cliente

    FROM agendamentos a
    INNER JOIN servicos s ON s.id_servico = a.id_servico
    INNER JOIN profissional p ON p.id = a.id_profissional
    INNER JOIN usuarios u ON u.id = a.id_cliente
    WHERE a.id_barbearia = ?
    ORDER BY a.data_agenda ASC, a.hora ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_barbearia);
$stmt->execute();
$res = $stmt->get_result();

$agendamentos = [];

while ($row = $res->fetch_assoc()) {
    $agendamentos[] = $row;
}

echo json_encode([
    "success" => true,
    "agendamentos" => $agendamentos
]);
?>
