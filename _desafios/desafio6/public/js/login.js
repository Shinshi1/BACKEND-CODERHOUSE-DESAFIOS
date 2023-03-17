const loginEl = document.getElementById('login')
const githubLoginEl = document.getElementById('githubLogin')

loginEl.addEventListener('click', (e) => {
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
      if (data.status === 'success') {
        (window.location.href = '/products')
      } else {
        alert('usuario no encontrado')
      }
    })
    .catch(error => console.error(error))
})