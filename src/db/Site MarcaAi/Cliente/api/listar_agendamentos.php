<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../../Tipo_Acesso/conexao.php';

$id_cliente = $_GET['id_cliente'] ?? null;

if (!$id_cliente) {
    echo json_encode(["success" => false, "message" => "ID do cliente não enviado"]);
    exit;
}

$sql = "
    SELECT 
        a.id,
        a.data_agenda AS data,
        a.hora,
        a.status,
        s.nome AS servico,
        p.nome AS profissional,
        b.nome AS barbearia,
        s.preco AS valor
    FROM agendamentos a
    INNER JOIN servicos s ON s.id_servico = a.id_servico
    INNER JOIN profissional p ON p.id = a.id_profissional
    INNER JOIN barbearias b ON b.id = a.id_barbearia
    WHERE a.id_cliente = ?
    ORDER BY a.data_agenda DESC, a.hora ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_cliente);
$stmt->execute();
$result = $stmt->get_result();

$lista = [];

while ($row = $result->fetch_assoc()) {
    $lista[] = $row;
}

echo json_encode(["success" => true, "agendamentos" => $lista]);
?>
