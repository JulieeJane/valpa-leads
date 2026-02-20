<?php
require_once '../../includes/config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $nombre = trim($_POST['nombre'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $telefono = trim($_POST['telefono'] ?? '');
    $servicio = trim($_POST['servicio_interes'] ?? '');
    $origen = trim($_POST['origen'] ?? '');
    $mensaje = trim($_POST['mensaje'] ?? '');

    if ($nombre && $email) {
        try {
            $sql = "INSERT INTO prospectos 
                (nombre, email, telefono, servicio_interes, origen, mensaje)
                VALUES 
                (:nombre, :email, :telefono, :servicio, :origen, :mensaje)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nombre'   => $nombre,
                ':email'    => $email,
                ':telefono' => $telefono,
                ':servicio' => $servicio,
                ':origen'   => $origen,
                ':mensaje'  => $mensaje
            ]);

            header("Location: ../contacto.php?ok=1");
            exit;

        } catch (Exception $e) {
            header("Location: ../contacto.php?error=1");
            exit;
        }
    }

    header("Location: ../contacto.php?error=1");
    exit;
}

