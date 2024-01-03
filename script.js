//Terminos y Condiciones
window.abrirT.addEventListener("click", () => {
  window.ventanaT.showModal();
});

window.cerrarT.addEventListener("click", () => {
  window.ventanaT.close();
});

//Iniciar sesión
window.abrirIS.addEventListener("click", () => {
  window.ventanaIS.showModal();
});

window.cerrarIS.addEventListener("click", () => {
  window.ventanaIS.close();
});

//Preguntas frecuentes
window.abrirA.addEventListener("click", () => {
  window.ventanaA.showModal();
});

window.cerrarA.addEventListener("click", () => {
  window.ventanaA.close();
});

//Token usuario
function generarToken() {
  return Math.random().toString(36).substring(2, 10);
}

const registro = document.getElementById('registro');
registro.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener valores de correo y teléfono
  let email = document.getElementById('email').value;
  let emailV = document.getElementById('emailV').value;
  let telefono = document.getElementById('telefono').value;
  let telefonoV = document.getElementById('telefonoV').value;

  // Reiniciar mensajes de error
  document.getElementById('noMatchC').innerText = '';
  document.getElementById('noMatchT').innerText = '';

  //Asignar token
  let token = generarToken();

  // Validar correo y teléfono
  if (email !== emailV) {
    document.getElementById('noMatchC').innerText = 'Los correos no coinciden, vuelve a verificarlos.';
  } else if (telefono !== telefonoV) {
    document.getElementById('noMatchT').innerText = 'El número de teléfono no coincide, vuelve a verificarlo.';
  }

  // Verificar si no hay errores
  if (!document.getElementById('noMatchC').innerText && !document.getElementById('noMatchT').innerText) {
    // Enviar a la base de datos y redireccionar
    try {
      const response = await fetch('https://sheet.best/api/sheets/ec0ee7dc-57a0-44d8-b14d-1f006afbbe58', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "Nombre": registro.nombre.value,
          "Apellido Paterno": registro.apellidoP.value,
          "Apellido Materno": registro.apellidoM.value,
          "Correo electronico": registro.email.value,
          "Num telefono": registro.telefono.value,
          "Token": token
        })
      });

      if (response.ok) {
        alert('Registro exitoso');
        window.location.href = 'spa.html';
      } else {
        alert('Hubo un problema, verifica los campos.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el formulario');
    }
  }
});


/* TOKEN, aun no funciona pero es la logiaca!  
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  // Configuración del servicio de correo electrónico (Gmail, Outlook, etc.)
  service: 'gmail',
  auth: {
    user: 'tucorreo@gmail.com',
    pass: 'tupassword',
  },
});

// Ruta para manejar el envío del formulario
app.post('/registro', (req, res) => {
  // Obtener los datos del formulario desde el cuerpo de la solicitud
  const { nombre, email } = req.body;

  // Generar un token único (puedes usar tu función generarToken aquí)
  const token = Math.random().toString(36).substring(2, 10);

  // Guardar el token y los datos del usuario en la base de datos (aquí deberías conectar con tu base de datos y almacenar los datos)

  // Enviar el correo electrónico con el token de confirmación
  transporter.sendMail({
    from: 'tucorreo@gmail.com',
    to: email,
    subject: 'Confirmación de registro',
    text: `Hola ${nombre}, gracias por registrarte. Tu token de confirmación es: ${token}.`,
    // Puedes personalizar el cuerpo del correo con instrucciones, enlaces, etc.
  }, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo de confirmación');
    } else {
      console.log('Correo de confirmación enviado: ' + info.response);
      res.status(200).send('Correo de confirmación enviado');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
*/

