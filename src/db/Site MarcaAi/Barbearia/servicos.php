<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$action = $_GET["action"] ?? $_POST["action"] ?? null;


// ========================
// LISTAR SERVIÇOS
// ========================
if ($action === "listar") {
    $id_barbearia = $_GET["id_barbearia"];

    $sql = "SELECT * FROM servicos WHERE id_barbearia = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_barbearia);
    $stmt->execute();
    $result = $stmt->get_result();

    $servicos = [];
    while ($row = $result->fetch_assoc()) {
        $servicos[] = $row;
    }

    echo json_encode($servicos);
    exit;
}


// ========================
// BUSCAR UM SERVIÇO
// ========================
if ($action === "buscar") {
    $id = $_GET["id_servico"];

    $sql = "SELECT * FROM servicos WHERE id_servico = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode($stmt->get_result()->fetch_assoc());
    exit;
}


// ========================
// CADASTRAR SERVIÇO
// ========================
if ($action === "cadastrar") {

    $id_barbearia = $_POST["id_barbearia"];
    $nome = $_POST["nome"];
    $descricao = $_POST["descricao"];
    $preco = $_POST["preco"];
    $duracao = $_POST["duracao"];

    $sql = "INSERT INTO servicos (id_barbearia, nome, descricao, preco, duracao)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issdi", $id_barbearia, $nome, $descricao, $preco, $duracao);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Serviço cadastrado com sucesso!"]);
    exit;
}


// ========================
// EDITAR SERVIÇO
// ========================
if ($action === "editar") {

    $id = $_POST["id_servico"];
    $nome = $_POST["nome"];
    $descricao = $_POST["descricao"];
    $preco = $_POST["preco"];
    $duracao = $_POST["duracao"];

    $sql = "UPDATE servicos 
            SET nome = ?, descricao = ?, preco = ?, duracao = ?
            WHERE id_servico = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdii", $nome, $descricao, $preco, $duracao, $id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Serviço atualizado com sucesso!"]);
    exit;
}


// ========================
// EXCLUIR SERVIÇO
// ========================
if ($action === "excluir") {

    $id = $_GET["id_servico"];

    $sql = "DELETE FROM servicos WHERE id_servico = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Serviço removido com sucesso!"]);
    exit;
}
?>
