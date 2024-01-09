document.addEventListener('DOMContentLoaded', function () {
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

  //Base de datos
  const registro = document.getElementById('registro');
  registro.addEventListener('submit', async (e) => {
    e.preventDefault();

     // Mostrar pantalla de carga
     document.getElementById('loader').style.display = 'flex';

    // Obtener de correo y teléfono
    let email = document.getElementById('email').value;
    let emailV = document.getElementById('emailV').value;
    let telefono = document.getElementById('telefono').value;
    let telefonoV = document.getElementById('telefonoV').value;

    //Reset de mensajes de error Correo y/o teléfono
    document.getElementById('noMatchC').innerText = '';
    document.getElementById('noMatchT').innerText = '';
    document.getElementById('savedT').innerText = '';
    document.getElementById('savedC').innerText = '';

    //Token usuario
    function generarToken() {
      return Math.random().toString(36).substring(2, 10);
    }

    //Asignar token
    let token = generarToken();
    //Local Storage
    localStorage.setItem('token', token);

    // Mensaje Correo y/o Teléfono no coincide
    if (email !== emailV) {
      document.getElementById('noMatchC').innerText = 'Los correos no coinciden, vuelve a verificarlos.';
      document.getElementById('loader').style.display = 'none';
    } else if (telefono !== telefonoV) {
      document.getElementById('noMatchT').innerText = 'El número de teléfono no coincide, vuelve a verificarlo.';
      document.getElementById('loader').style.display = 'none';
    }

    //Email y numero de telefonos ya registrados
    async function verificarExistencia(email, telefono) {
      try {
        // Registros ya existentes
        const response = await fetch('https://sheet.best/api/sheets/ec0ee7dc-57a0-44d8-b14d-1f006afbbe58', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();

          // Verificación
          const existeCorreo = data.some(entry => entry["Correo electronico"] === email);
          const existeTelefono = data.some(entry => entry["Num telefono"] === telefono);

          return existeCorreo || existeTelefono;
        } else {
          console.error('Error al consultar la base de datos:', response.status);
          return false; 
        }
      } catch (error) {
        console.error('Error al verificar la existencia:', error);
        return false;
      }
    }

    // Verificar errores
    if (!document.getElementById('noMatchC').innerText && !document.getElementById('noMatchT').innerText) {

      //Mensajes de Correo y/o Teléfono ya existentes
      if (await verificarExistencia(email, '')) {
        document.getElementById('savedC').innerText = 'El Correo electrónico ya se ha registrado.';
        document.getElementById('loader').style.display = 'none';
        return;
      }
      if (await verificarExistencia('', telefono)) {
        document.getElementById('savedT').innerText = 'El número de teléfono ya se ha registrado.';
        document.getElementById('loader').style.display = 'none';
        return;
      }

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
          window.location.href = 'spa.html';
        } else {
          alert('Hubo un problema, verifica los campos.');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario');
      } finally {
        // Ocultar pantalla de carga después de enviar el formulario (incluso si hay un error)
        document.getElementById('loader').style.display = 'none';
      }
    }
  });

  // Inicio de sesión 
  const formIniciarSesion = document.getElementById('formIniciarSesion');
  formIniciarSesion.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener datos del formulario
    const nombreIS = document.getElementById('nombreIS').value;
    const emailIS = document.getElementById('emailIS').value;
    const telefonoIS = document.getElementById('telefonoIS').value;

    // Obtener datos de la API 
    const dataFromAPI = await obtenerDatosDesdeAPI();

    // Validar nombre, correo y número de teléfono
    const usuarioValido = dataFromAPI.some(entry => 
      entry["Nombre"] === nombreIS &&
      entry["Correo electronico"] === emailIS &&
      entry["Num telefono"] === telefonoIS
    );

    // Reset mensajes de error IS
    document.getElementById('noSavedN').innerText = '';
    document.getElementById('noSavedC').innerText = '';
    document.getElementById('noSavedT').innerText = '';

    // Mensajes de error IS
    if (!usuarioValido) {
      if (!dataFromAPI.some(entry => entry["Nombre"] === nombreIS)) {
        document.getElementById('noSavedN').innerText = 'Nombre incorrecto';
      }
      if (!dataFromAPI.some(entry => entry["Correo electronico"] === emailIS)) {
        document.getElementById('noSavedC').innerText = 'Correo incorrecto';
      }
      if (!dataFromAPI.some(entry => entry["Num telefono"] === telefonoIS)) {
        document.getElementById('noSavedT').innerText = 'Teléfono incorrecto';
      }
    } else {
      alert('Inicio de sesión exitoso');  
      window.location.href = 'spa.html';
    }
  });

  // Recolectar datos para inicio de sesion
  async function obtenerDatosDesdeAPI() {
    try {
      const response = await fetch('https://sheet.best/api/sheets/ec0ee7dc-57a0-44d8-b14d-1f006afbbe58', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Error al obtener datos desde la API:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener datos desde la API:', error);
      return [];
    }
  } 
});
