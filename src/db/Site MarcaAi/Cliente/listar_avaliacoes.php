<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$sql = "
    SELECT a.id, a.estrelas, a.comentario, a.data_avaliacao,
           b.nome AS barbearia,
           p.nome AS profissional
    FROM avaliacoes a
    JOIN barbearias b ON b.id = a.id_barbearia
    JOIN profissional p ON p.id = a.id_profissional
    ORDER BY a.id DESC
";

$result = $conn->query($sql);

$avaliacoes = [];

while ($row = $result->fetch_assoc()) {
    $avaliacoes[] = $row;
}

echo json_encode($avaliacoes);
?>
