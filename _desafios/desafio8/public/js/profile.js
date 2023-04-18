const logoutEl = document.querySelector('#logout')

logoutEl.addEventListener('click', () => {
  window.location.pathname += '/logout'
})