<?php
$servername = "localhost";
$username = "root";    
$password = "";        
$dbname = "marcaai_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success'=>false,'message'=>'Erro ao conectar ao banco']));
}
?>
