<?php
require_once '../config.php';

$query = $_GET['query'] ?? '';
$exclude_client = $_GET['exclude_client'] ?? 0;

if (strlen($query) < 3) {
    echo json_encode([]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT cp.id, cp.name, c.name AS client_name
    FROM client_products cp
    JOIN clients c ON c.id = cp.client_id
    WHERE cp.name LIKE ? AND cp.client_id != ?
    ORDER BY cp.name
    LIMIT 20
");

$stmt->execute(['%' . $query . '%', $exclude_client]);

$results = $stmt->fetchAll();
echo json_encode($results);
?>