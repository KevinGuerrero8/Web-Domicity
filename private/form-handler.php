<?php
/**
 * DomiCity — form-handler.php
 * Receives POST data from the contact form,
 * validates required fields and sends an email.
 * Returns a JSON response.
 */

/* ─── HEADERS ───────────────────────────────── */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/* ─── ONLY ACCEPT POST ──────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit;
}

/* ─── SANITIZE HELPER ───────────────────────── */
function sanitize(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

/* ─── READ & SANITIZE INPUTS ────────────────── */
$nombre        = sanitize($_POST['nombre']        ?? '');
$cargo         = sanitize($_POST['cargo']         ?? '');
$empresa       = sanitize($_POST['empresa']       ?? '');
$correo        = sanitize($_POST['correo']        ?? '');
$fija          = sanitize($_POST['fija']          ?? '');
$movil         = sanitize($_POST['movil']         ?? '');
$observaciones = sanitize($_POST['observaciones'] ?? '');

/* ─── VALIDATE REQUIRED FIELDS ─────────────── */
$errors = [];

if (empty($nombre)) {
    $errors['nombre'] = 'El nombre es obligatorio.';
}

if (empty($empresa)) {
    $errors['empresa'] = 'La empresa es obligatoria.';
}

if (empty($correo)) {
    $errors['correo'] = 'El correo electrónico es obligatorio.';
} elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errors['correo'] = 'Ingresa un correo electrónico válido.';
}

if (empty($movil)) {
    $errors['movil'] = 'La línea móvil es obligatoria.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

/* ─── COMPOSE EMAIL ─────────────────────────── */
$to      = 'tecnologia2@domicity.com'; // ← Change to your actual email
$subject = "Nuevo contacto desde la web: {$nombre} — {$empresa}";

$body  = "Se recibió un nuevo mensaje desde el formulario de contacto.\n\n";
$body .= "─────────────────────────────────\n";
$body .= "Nombre:    {$nombre}\n";
$body .= "Cargo:     {$cargo}\n";
$body .= "Empresa:   {$empresa}\n";
$body .= "Correo:    {$correo}\n";
$body .= "Línea fija:{$fija}\n";
$body .= "Móvil:     {$movil}\n";
$body .= "─────────────────────────────────\n";
$body .= "Observaciones:\n{$observaciones}\n";
$body .= "─────────────────────────────────\n";
$body .= "Enviado desde domicity.com\n";

$headers  = "From: noreply@domicity.com\r\n";
$headers .= "Reply-To: {$correo}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* ─── SEND EMAIL ────────────────────────────── */
$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.',
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.',
    ]);
}
