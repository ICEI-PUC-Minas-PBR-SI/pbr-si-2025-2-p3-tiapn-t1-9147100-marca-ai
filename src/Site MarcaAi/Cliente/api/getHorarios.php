<?php
header('Content-Type: application/json');
require_once "../../Tipo_Acesso/conexao.php";

$idProf = $_GET['id_profissional'] ?? 0;
$data = $_GET['data'] ?? null;

if (!$idProf || !$data) {
    echo json_encode([]);
    exit;
}

// Descobre o dia da semana: 0=Dom, 1=Seg, ..., 6=Sab
$diaSemana = date('w', strtotime($data));

// 1️⃣ Buscar horário de trabalho
$sql = "SELECT hora_inicio, hora_fim 
        FROM horarios 
        WHERE id_profissional = ? AND dia_semana = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $idProf, $diaSemana);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows == 0) {
    echo json_encode([]); // profissional não trabalha neste dia
    exit;
}

$horario = $res->fetch_assoc();
$inicio = strtotime($horario['hora_inicio']);
$fim = strtotime($horario['hora_fim']);

// 2️⃣ Gerar intervalos de 30 minutos
$intervalos = [];
for ($t = $inicio; $t < $fim; $t += 30 * 60) {
    $intervalos[] = date('H:i', $t);
}

// 3️⃣ Remover horários já agendados
$sql2 = "SELECT hora 
         FROM agenda 
         WHERE id_profissional = ? AND data_agenda = ?";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("is", $idProf, $data);
$stmt2->execute();
$res2 = $stmt2->get_result();

$ocupados = [];
while ($row = $res2->fetch_assoc()) {
    $ocupados[] = substr($row['hora'], 0, 5);
}

$livres = array_values(array_diff($intervalos, $ocupados));

echo json_encode($livres);
