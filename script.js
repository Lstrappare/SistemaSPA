//Preguntas frecuentes
window.abrirA.addEventListener("click", () => {
  window.ayuda.showModal();
});

window.cerrarA.addEventListener("click", () => {
  window.ayuda.close();
});

//Terminos y Condiciones
window.abrirT.addEventListener("click", () => {
  window.ley.showModal();
});

window.cerrarT.addEventListener("click", () => {
  window.ley.close();
});

//Iniciar sesión
window.abrirI.addEventListener("click", () => {
  window.iS.showModal();
});

window.cerrarI.addEventListener("click", () => {
  window.iS.close();
});


formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtener valores de correo y teléfono
  var email = document.getElementById('email').value;
  var emailV = document.getElementById('emailV').value;
  var telefono = document.getElementById('telefono').value;
  var telefonoV = document.getElementById('telefonoV').value;

  // Reiniciar mensajes de error
  document.getElementById('noMatchC').innerText = '';
  document.getElementById('noMatchT').innerText = '';

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
          "Nombre": formulario.nombre.value,
          "Apellido Paterno": formulario.apellidoP.value,
          "Apellido Materno": formulario.apellidoM.value,
          "Correo electronico": formulario.email.value,
          "Num telefono": formulario.telefono.value
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


