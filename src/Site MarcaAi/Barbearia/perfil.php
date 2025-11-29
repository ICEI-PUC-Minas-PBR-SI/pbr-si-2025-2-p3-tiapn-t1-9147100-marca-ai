<?php
header("Content-Type: application/json; charset=UTF-8");


require_once "../Tipo_Acesso/conexao.php"; 


if ($conn->connect_error) {
    echo json_encode(["error" => "Erro na conexão: " . $conn->connect_error]);
    exit;
}


if ($_SERVER["REQUEST_METHOD"] === "GET") {

    if (!isset($_GET["id"])) {
        echo json_encode(["error" => "ID da barbearia não enviado"]);
        exit;
    }

    $id = intval($_GET["id"]);


    $sql = "SELECT nome, cnpj, email, telefone, endereco, descricao, logo 
            FROM barbearias 
            WHERE id = $id";

    $result = $conn->query($sql);

    if (!$result || $result->num_rows === 0) {
        echo json_encode(["error" => "Barbearia não encontrada"]);
        exit;
    }

    $info = $result->fetch_assoc();

    $sqlH = "SELECT dia, abre, fecha, status FROM horarios WHERE barbearia_id = $id";
    $resH = $conn->query($sqlH);

    $horarios = [];

    if ($resH && $resH->num_rows > 0) {
        while ($h = $resH->fetch_assoc()) {
            $horarios[$h["dia"]] = [
                "abre"   => $h["abre"],
                "fecha"  => $h["fecha"],
                "status" => $h["status"]
            ];
        }
    }

    echo json_encode([
        "info" => $info,
        "horarios" => $horarios,
        "logo" => $info["logo"] 
    ]);

    exit;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $json = file_get_contents("php://input");
    $data = json_decode($json, true);

    if (!$data) {
        echo json_encode(["error" => "JSON inválido"]);
        exit;
    }

    $id = intval($data["id"]);
    $i  = $data["info"];

 
    $sql = "UPDATE barbearias SET
                nome      = '".$conn->real_escape_string($i["nome"])."',
                cnpj      = '".$conn->real_escape_string($i["cnpj"])."',
                email     = '".$conn->real_escape_string($i["email"])."',
                telefone  = '".$conn->real_escape_string($i["telefone"])."',
                endereco  = '".$conn->real_escape_string($i["endereco"])."',
                descricao = '".$conn->real_escape_string($i["descricao"])."'
            WHERE id = $id";

    $ok1 = $conn->query($sql);

    $hor = $data["horarios"];

    foreach ($hor as $dia => $h) {
        $sqlH = "UPDATE horarios SET
                    abre   = '".$conn->real_escape_string($h["abre"])."',
                    fecha  = '".$conn->real_escape_string($h["fecha"])."',
                    status = '".$conn->real_escape_string($h["status"])."'
                 WHERE barbearia_id = $id AND dia = '$dia'";
        $conn->query($sqlH);
    }

    echo json_encode([
        "success" => true,
        "mensagem" => "Perfil atualizado com sucesso!"
    ]);

    exit;
}

?>
