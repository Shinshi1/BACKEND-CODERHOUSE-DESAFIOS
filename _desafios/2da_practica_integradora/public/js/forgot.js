const forgotEl = document.getElementById('forgotPassword')

forgotEl.addEventListener('click', function () {
  const email = document.getElementById('username').value
  const password = document.getElementById('password').value
  const repeatPassword = document.getElementById('repeatPassword').value

  fetch('/forgot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, repeatPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'success') {
        Swal.fire({
          title: `Contraseña actualizada Exitosamente!`,
          text: 'Lo estamos redirigiendo, debera iniciar sesión'
        })
        setTimeout(() => {
          window.location.href = '/login'
        }, 5000)
      } else {
        Swal.fire({
          title: `No se pudo actualizar la contraseña`,
        })
      }
    })
    .catch((error) => console.error(error))
})