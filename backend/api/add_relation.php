<?php
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$data = json_decode(file_get_contents('php://input'), true);
$product_a = $data['product_a'] ?? null;
$product_b = $data['product_b'] ?? null;

if (!$product_a || !$product_b) {
    http_response_code(400);
    exit('Missing parameters');
}

try {
    $stmt = $pdo->prepare("INSERT INTO product_relations (product_a, product_b) VALUES (?, ?)");
    $stmt->execute([$product_a, $product_b]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { 
        http_response_code(409); 
        echo json_encode([
            'success' => false,
            'error' => 'La relación ya existe'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Error en el servidor'
        ]);
    }
}
?>
