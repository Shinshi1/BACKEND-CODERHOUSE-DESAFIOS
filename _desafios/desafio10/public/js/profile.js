const logoutEl = document.querySelector('#logout')
const clearCartButton = document.querySelector('#clear-cart-button');
const purchaseButton = document.querySelector('#buy-cart-button');

logoutEl.addEventListener('click', () => {
  window.location.pathname += '/logout'
})

const getCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim("");

    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}
// cartId Cookie
const cartIdEncoded = getCookie('cartId')
const cartIdDecoded = cartIdEncoded ? decodeURIComponent(cartIdEncoded) : null
const cartIdStartIndex = cartIdDecoded.indexOf('"cartId');
const cartIdEndIndex = cartIdDecoded.indexOf('"', cartIdStartIndex + 10);
const cartId = cartIdDecoded.substring(cartIdStartIndex + 10, cartIdEndIndex);
const cartIdUrl = cartId ? `/api/carts/${cartId}` : null;

// orderURL
const orderURL = `/profile/tickets`

// cart view
fetch(cartIdUrl)
  .then(response => response.json())
  .then(data => data.response)
  .then(cart => {
    const cartContainer = document.querySelector('#cartItems');
    if (cart.products.length !== 0) {
      cart.products.forEach((item) => {
        const product = item.product;
        const quantity = item.quantity
        const cartItemHTML = `
        <div class="cart-item" data-id="${product._id}">
          <div class="cart-item-image">
            <img src="${product.thumbnail}" alt="">
          </div>
          <div class="cart-item-details">
            <p> ${quantity} X ${product.title}</p>
            <button class="remove-product-button"><img src="/assets/cart-download.svg" alt="eliminar-producto"></button>
            <p>$${product.price}</p>
          </div>
        </div>
        `
        cartContainer.innerHTML += cartItemHTML;
      })
    } else {
      clearCartButton.remove()
      purchaseButton.remove()
      cartContainer.innerHTML = `<p class="not-products">No hay productos en el carrito</p>`
    }
    const removeProductButtons = document.getElementsByClassName('remove-product-button');

    function clearCart() {
      fetch(`/api/carts/${cartId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          alert('Productos eliminados del carrito');

          while (cartContainer.firstChild) {
            cartContainer.removeChild(cartContainer.firstChild)
          }
        })
        .catch(error => console.error('Error al eliminar los productos del carrito:', error))
    }

    function purchase() {
      fetch(`/api/carts/${cartId}/purchase`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log('Compra realizada con exito:', data);
          clearCart()
          alert('Felicidades tu compra ha sido realizada con exito')
          setTimeout(() => {
            window.location.reload();
          }, 3000)
        })
        .catch(error => console.error('Error al eliminar los productos del carrito:', error))
    }

    function removeProduct(event) {
      const button = event.target;
      const cartItem = button.closest('.cart-item');
      const productId = cartItem.dataset.id

      fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          alert('Producto eliminado del carrito', data)
          cartItem.remove();
        })
        .catch(error => console.error('Error al eliminar el producto del carrito:', error))
    }



    clearCartButton.addEventListener('click', clearCart);

    purchaseButton.addEventListener('click', purchase)

    Array.from(removeProductButtons).forEach(button => {
      button.addEventListener('click', removeProduct);
    });

    // orders view
    fetch(orderURL)
      .then(response => response.json())
      .then(data => data.userTickets)
      .then(userTickets => {
        const ticketList = document.querySelector('#tickets');
        userTickets.forEach(item => {
          const date = new Date(item.purchase_datetime).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
          const ticketItemHTML = `
          <div class="ticket-item">
          <h4>Ticket ID: ${item._id}</h4>
          <p>Fecha: <span>${date}</span></p>
          <p>Total: <span>$ ${item.amount}</span></p>
        </div>
          `
          ticketList.innerHTML += ticketItemHTML;
        })
      })
  })
  .catch(error => console.error(error));