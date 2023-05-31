const token = window.location.pathname.split('/')[2];
const API_URL = `/forgot/${token}`

const buttonForm = document.getElementById('forgotPassword')

buttonForm.addEventListener('click', function () {
  const password = document.getElementById('password').value
  const confirmPassword = document.getElementById('repeatPassword').value

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, confirmPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
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