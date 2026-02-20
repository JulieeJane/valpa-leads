<?php
require_once '../includes/config.php';

$mensajeExito = "";
$mensajeError = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre   = trim($_POST["nombre"]);
    $email    = trim($_POST["email"]);
    $telefono = trim($_POST["telefono"]);
    $mensaje  = trim($_POST["mensaje"]);

    if ($nombre && $email) {
        try {
            $sql = "INSERT INTO prospectos (nombre, email, telefono, mensaje)
                    VALUES (:nombre, :email, :telefono, :mensaje)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ":nombre"   => $nombre,
                ":email"    => $email,
                ":telefono" => $telefono,
                ":mensaje"  => $mensaje
            ]);

            $mensajeExito = "Gracias, tus datos fueron enviados correctamente.";
        } catch (Exception $e) {
            $mensajeError = "Error al guardar la información.";
        }
    } else {
        $mensajeError = "Nombre y correo son obligatorios.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Contacto | VALPA</title>
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>

<h1>Contacto</h1>

<?php if ($mensajeExito): ?>
    <p style="color: green;"><?php echo $mensajeExito; ?></p>
<?php endif; ?>

<?php if ($mensajeError): ?>
    <p style="color: red;"><?php echo $mensajeError; ?></p>
<?php endif; ?>

<form method="post">
    <input type="text" name="nombre" placeholder="Nombre completo" required>
    <input type="email" name="email" placeholder="Correo electrónico" required>
    <input type="text" name="telefono" placeholder="Teléfono">
    <textarea name="mensaje" placeholder="Mensaje"></textarea>
    <button type="submit">Enviar</button>
</form>

</body>
</html>

