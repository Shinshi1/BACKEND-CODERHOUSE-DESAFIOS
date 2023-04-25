const signupEl = document.getElementById('signup')

signupEl.addEventListener('click', (e) => {
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const age = document.getElementById('age').value;

  if (!first_name || !last_name || !email || !password || !age) {
    alert('Todos los campos son obligatorios')
  } else {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        age
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'success') {
          Swal.fire({
            title: `Cuenta Creada Exitosamente!`,
            text: 'Lo estamos redirigiendo, debera iniciar sesión'
          })
          setTimeout(() => {
            window.location.href = '/login'
          }, 3000)
        } else {
          alert('usuario no encontrado')
        }
      })
      .catch(error => console.error(error))
  }
})