<?php
header("Content-Type: application/json");
require_once "../../Tipo_Acesso/conexao.php";

$action = $_GET['action'] ?? null;

/* LISTAR OS SERVIÇOS DA BARBEARIA */
if ($action === "listar") {
    $idb = $_GET['id_barbearia'];

    $sql = "SELECT 
                bs.id AS id_relacao,
                s.id AS id_servico,
                s.nome AS nome,
                s.descricao,
                s.duracao,
                bs.preco
            FROM barbearia_servicos bs
            JOIN servicos s ON s.id = bs.id_servico
            WHERE bs.id_barbearia = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idb);
    $stmt->execute();

    echo json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
    exit;
}

/* CADASTRAR SERVIÇO */
if ($action === "cadastrar") {

    $idb      = $_POST['id_barbearia'];
    $nome     = $_POST['nome'];
    $desc     = $_POST['descricao'];
    $duracao  = $_POST['duracao'];
    $preco    = $_POST['preco'];

    // 1. Adiciona no catálogo de serviços
    $sql = "INSERT INTO servicos (nome, descricao, duracao)
            VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nome, $desc, $duracao);
    $stmt->execute();

    $id_servico = $conn->insert_id;

    // 2. Relaciona à barbearia
    $sql2 = "INSERT INTO barbearia_servicos (id_barbearia, id_servico, preco)
             VALUES (?, ?, ?)";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("iid", $idb, $id_servico, $preco);
    $stmt2->execute();

    echo json_encode(["status" => "ok"]);
    exit;
}

/* EDITAR SERVIÇO */
if ($action === "editar") {

    $id_relacao = $_POST['id_relacao'];
    $id_servico = $_POST['id_servico'];
    $nome       = $_POST['nome'];
    $desc       = $_POST['descricao'];
    $duracao    = $_POST['duracao'];
    $preco      = $_POST['preco'];

    // 1. Edita o catálogo
    $sql = "UPDATE servicos 
            SET nome = ?, descricao = ?, duracao = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssii", $nome, $desc, $duracao, $id_servico);
    $stmt->execute();

    // 2. Edita a tabela da barbearia
    $sql2 = "UPDATE barbearia_servicos
             SET preco = ?
             WHERE id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("di", $preco, $id_relacao);
    $stmt2->execute();

    echo json_encode(["status" => "ok"]);
    exit;
}

/* EXCLUIR SERVIÇO */
if ($action === "excluir") {

    $id_relacao = $_GET['id_relacao'];
    $id_servico = $_GET['id_servico'];

    // 1. Remove relacionamento
    $sql = "DELETE FROM barbearia_servicos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_relacao);
    $stmt->execute();

    // 2. Remove serviço do catálogo
    $sql2 = "DELETE FROM servicos WHERE id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("i", $id_servico);
    $stmt2->execute();

    echo json_encode(["status" => "ok"]);
    exit;
}

echo json_encode(["erro" => "Ação inválida"]);
