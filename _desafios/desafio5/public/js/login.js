const elementExist = (id) => document.getElementById(id) !== null;

elementExist('login') && document.getElementById('login').addEventListener('click', (e) => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.message === 'success') {
        (window.location.href = '/products')
      } else {
        alert('usuario no encontrado')
      }
    })
    .catch(error => console.error(error))
})