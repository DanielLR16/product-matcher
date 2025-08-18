<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$data = json_decode(file_get_contents('php://input'), true);
$client_id = $data['client_id'] ?? null;
$product_name = trim($data['name'] ?? '');

if (!$client_id || !$product_name) {
    http_response_code(400);
    exit('Missing parameters');
}

try {
    $stmt = $pdo->prepare("INSERT INTO client_products (client_id, name) VALUES (?, ?)");
    $stmt->execute([$client_id, $product_name]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>