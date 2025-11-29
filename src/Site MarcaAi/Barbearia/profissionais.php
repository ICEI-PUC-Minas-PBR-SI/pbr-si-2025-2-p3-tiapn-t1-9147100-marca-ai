<?php
require_once "../Tipo_Acesso/conexao.php";
header("Content-Type: application/json");

$action = $_GET['action'] ?? null;

// ===========================
// LISTAR PROFISSIONAIS
// ===========================
if ($action === "listar") {
    $idBarbearia = $_GET['id'];

    $sql = "SELECT * FROM vw_profissionais_barbearia WHERE id_barbearia = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idBarbearia);
    $stmt->execute();

    echo json_encode($stmt->get_result()->fetch_all(MYSQLI_ASSOC));
    exit;
}

// ===========================
// BUSCAR UM
// ===========================
if ($action === "buscar") {
    $id = $_GET['id'];

    $sql = "SELECT * FROM profissional WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode($stmt->get_result()->fetch_assoc());
    exit;
}

// ===========================
// CADASTRAR
// ===========================
if ($action === "cadastrar") {

    $idBarbearia = $_POST['id_barbearia'];
    $nome = $_POST['nome'];
    $esp = $_POST['especialidade'];
    $tel = $_POST['telefone'];

    $sql = "INSERT INTO profissional (id_barbearia, nome, especialidade, telefone)
            VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isss", $idBarbearia, $nome, $esp, $tel);
    $stmt->execute();

    echo "Profissional cadastrado com sucesso!";
    exit;
}

// ===========================
// EDITAR
// ===========================
if ($action === "editar") {

    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $esp = $_POST['especialidade'];
    $tel = $_POST['telefone'];

    $sql = "UPDATE profissional 
            SET nome = ?, especialidade = ?, telefone = ?
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nome, $esp, $tel, $id);
    $stmt->execute();

    echo "Profissional atualizado com sucesso!";
    exit;
}

// ===========================
// EXCLUIR
// ===========================
if ($action === "excluir") {

    $id = $_GET['id'];

    $sql = "DELETE FROM profissional WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo "Profissional excluído!";
    exit;
}

echo json_encode(["erro" => "Ação inválida"]);
