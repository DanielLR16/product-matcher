<?php
$host = 'localhost';
$db   = 'product_matching';  
$user = ''; // user BD /** CHANGE **/ 
$pass = ''; // password BD /** CHANGE **/ 
$charset = 'utf8mb4';

// Cadena de conexión (DSN)
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Opciones de PDO
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,  // lanza excepciones en errores
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,        // devuelve arrays asociativos
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    //echo "✅ Conexión exitosa con PDO";
} catch (\PDOException $e) {
    echo "❌ Error de conexión: " . $e->getMessage();
}
?>

