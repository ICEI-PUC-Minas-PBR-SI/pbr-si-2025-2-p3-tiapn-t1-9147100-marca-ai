<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

// Importa conexão MySQLi
require_once "../../Tipo_Acesso/conexao.php";

// Query com colunas que existem na sua tabela
$sql = "SELECT 
            id,
            nome,
            endereco,
            telefone,
            descricao,
            logo
        FROM barbearias";

$result = $conn->query($sql);

$barbearias = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        // Para manter compatível com o JS (que usa avaliacao)
        $row["avaliacao"] = 4.5; 

        $barbearias[] = $row;
    }
}

echo json_encode($barbearias, JSON_UNESCAPED_UNICODE);

$conn->close();
