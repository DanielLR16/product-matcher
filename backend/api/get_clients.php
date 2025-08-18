<?php
require_once '../config.php';

$stmt = $pdo->query("SELECT id, name, identifier FROM clients ORDER BY name");
$clients = $stmt->fetchAll();

echo json_encode($clients);
?>