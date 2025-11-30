<?php
header("Content-Type: application/json");
include "../Tipo_Acesso/conexao.php";

$action = $_GET["action"] ?? $_POST["action"] ?? null;

// LISTAR
if ($action === "listar") {
    $id = $_GET["id"] ?? 0;

    $sql = "SELECT * FROM profissional WHERE id_barbearia = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    $dados = [];
    while ($row = $result->fetch_assoc()) {
        $dados[] = $row;
    }

    echo json_encode($dados);
    exit;
}

// BUSCAR UM PROFISSIONAL
if ($action === "buscar") {
    $id = $_GET["id"] ?? 0;

    $sql = "SELECT * FROM profissional WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $res = $stmt->get_result();
    echo json_encode($res->fetch_assoc());
    exit;
}

// CADASTRAR
if ($action === "cadastrar") {
    $id_barbearia = $_POST["id_barbearia"];
    $nome = $_POST["nome"];
    $especialidade = $_POST["especialidade"];
    $telefone = $_POST["telefone"];

    $sql = "INSERT INTO profissional (id_barbearia, nome, especialidade, telefone)
            VALUES (?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isss", $id_barbearia, $nome, $especialidade, $telefone);
    $stmt->execute();

    echo "Profissional cadastrado com sucesso!";
    exit;
}

// EDITAR
if ($action === "editar") {
    $id = $_POST["id"];
    $nome = $_POST["nome"];
    $especialidade = $_POST["especialidade"];
    $telefone = $_POST["telefone"];

    $sql = "UPDATE profissional SET nome = ?, especialidade = ?, telefone = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nome, $especialidade, $telefone, $id);
    $stmt->execute();

    echo "Profissional atualizado!";
    exit;
}

// ===============================
//   EXCLUIR (CORRIGIDO! 🔥)
// ===============================
if ($action === "excluir") {
    $id = intval($_GET["id"]);

    if ($id <= 0) {
        echo json_encode([
            "success" => false,
            "message" => "ID inválido."
        ]);
        exit;
    }

    // 1) EXCLUIR HORÁRIOS DO PROFISSIONAL
    $stmt = $conn->prepare("DELETE FROM horarios WHERE id_profissional = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    // 2) EXCLUIR O PROFISSIONAL
    $stmt2 = $conn->prepare("DELETE FROM profissional WHERE id = ?");
    $stmt2->bind_param("i", $id);

    if ($stmt2->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Profissional removido com sucesso!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Erro ao remover profissional: " . $stmt2->error
        ]);
    }

    $stmt2->close();
    $conn->close();
    exit;
}

?>
