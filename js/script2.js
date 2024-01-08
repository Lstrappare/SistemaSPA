document.addEventListener('DOMContentLoaded', function () {
    //Ventana Token
    abrirVT.addEventListener("click", () => {
        ventanaVT.showModal();
    });

    cerrarVT.addEventListener("click", () => {
        ventanaVT.close();
    });

    // Validar cuenta
    const token = localStorage.getItem('token');
    const tokenParagraph = document.getElementById('tokenParagraph');
    const cuentaValidadaElement = document.getElementById('cuentaValidada');
    const validarToken = document.getElementById('validarToken');
    tokenParagraph.innerText = `Tu Token: ${token}`;

    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault(); 

        const tokenInput = document.getElementById('inputToken');

        if (tokenInput && tokenInput.value) {
            const tokenInputValue = tokenInput.value.trim();
            document.getElementById('errorT').innerText = '';
            if (tokenInputValue === token) {
                cuentaValidadaElement.style.color = 'green';
                document.getElementById('cuentaValidada').innerText = 'Cuenta Validada';
                alert('Cuenta validada correctamente');
                validarToken.style.display = 'none';
            } else {
                document.getElementById('errorT').innerText = 'Token incorrecto';
                alert('Token incorrecto');
                console.error('Token incorrecto');
            }
        } 
    });
  });
  
 