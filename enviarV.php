<?php

require 'phpmailer/phpmailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$destinatario = $_POST['email']; 
$mensaje = 'Gracias por registrarte!';
$token = $POST['token'];

$mail = new PHPMailer(true);

try {
    //configurar el servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'siemprerelaxspa@gmail.com';
    $mail->Password = 'siemprerelax123';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    //asunto
    $mail->setFrom('siemprerelaxspa@gmail.com', 'Siempre Relax');
    $mail->addAddress($destinatario);
    $mail->Subject = 'Confirmación de Registro';

    //mensaje
    $mail->Body = $mensaje . 'tú token es: ' . $token;

    //enviar el correo
    $mail->send();

    echo 'Correo enviado con éxito';
} catch (Exception $e) {
    echo 'Hubo un problema al enviar el correo: ' . $mail->ErrorInfo;
}
?>
