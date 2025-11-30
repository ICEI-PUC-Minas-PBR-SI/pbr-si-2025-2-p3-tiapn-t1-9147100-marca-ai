<?php
header("Content-Type: application/json");
include "../../Tipo_Acesso/conexao.php";

$id_profissional = $_GET["id_profissional"] ?? null;
$diaSemana       = $_GET["dia"] ?? null;
$duracao         = $_GET["duracao"] ?? 30;  // duração do serviço
$data            = $_GET["data"] ?? null;   // data do agendamento

if (!$id_profissional || $diaSemana === null || !$data) {
    echo json_encode([]);
    exit;
}

// 1 — Buscar horário de trabalho deste dia
$sql = "SELECT hora_inicio, hora_fim 
        FROM horarios 
        WHERE id_profissional = ? AND dia_semana = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_profissional, $diaSemana);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows == 0) {
    echo json_encode([]); // não trabalha neste dia
    exit;
}

$row = $res->fetch_assoc();
$inicio = strtotime($row["hora_inicio"]);
$fim    = strtotime($row["hora_fim"]);

$horarios = [];

// 2 — Gera horários com base na duração do serviço
$duracaoMin = intval($duracao);

for ($t = $inicio; $t + ($duracaoMin * 60) <= $fim; $t += ($duracaoMin * 60)) {
    $horarios[] = date("H:i", $t);
}

// 3 — Remover horários já ocupados
$sql = "SELECT hora FROM agendamentos 
        WHERE id_profissional = ? AND data_agenda = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $id_profissional, $data);
$stmt->execute();
$res = $stmt->get_result();

$ocupados = [];
while ($r = $res->fetch_assoc()) {
    $ocupados[] = substr($r["hora"], 0, 5); // formato HH:MM
}

$horariosDisponiveis = array_values(array_diff($horarios, $ocupados));

echo json_encode($horariosDisponiveis);
