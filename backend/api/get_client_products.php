<?php
require_once '../config.php';

$client_id = $_GET['client_id'] ?? null;

if (!$client_id) {
    http_response_code(400);
    exit('Missing client_id');
}

$stmt = $pdo->prepare("SELECT id, name FROM client_products WHERE client_id = ? ORDER BY name");
$stmt->execute([$client_id]);
$products = $stmt->fetchAll();

echo json_encode($products);
?>