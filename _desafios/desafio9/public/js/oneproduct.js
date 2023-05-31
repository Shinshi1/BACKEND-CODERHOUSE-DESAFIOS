const productId = window.location.pathname.split('/')[2];
const API_URL = `/api/products/${productId}`;

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


fetch(API_URL)
  .then(response => response.json())
  .then(data => data.response)
  .then(product => {
    const productDetailsContainer = document.querySelector('#product-container');
    const productDetailsHTML = `
    <div class="product-img">
    <img src="${product.thumbnail}" alt="Imagen de ${product.title}">
  </div>
  <div class="product-details">
    <h3>${product.title}</h3>
    <p>
      ${product.description}
    </p>
    <span>$${product.price}</span>
    <div class="quantity">
      <span>Quantity</span>
      <div class="input-group">
        <button id="handleAdd">+</button>
        <input type="number" id="input-quantity" min="1" max="${product.stock}" value="1">
        <button id="handleSubstract">-</button>
      </div>
    </div>
    <button id="addProduct">Add to cart</button>
  </div>
    `
    productDetailsContainer.innerHTML = productDetailsHTML;

    const addProductButton = document.querySelector('#addProduct');
    const inputQuantity = document.querySelector('#input-quantity')
    const handleAddButton = document.querySelector('#handleAdd');
    const handleSubstractButton = document.querySelector('#handleSubstract');

    const handleAdd = () => {
      let inputValue = Number(inputQuantity.value);
      let inputValueMax = Number(inputQuantity.getAttribute('max'));
      if (inputValue >= inputValueMax) return inputValue = inputValueMax;

      inputQuantity.value = inputValue + 1;
    }

    const handleSubstract = () => {
      let inputValue = Number(inputQuantity.value);
      let inputValueMin = Number(inputQuantity.getAttribute('min'));
      if (inputValue <= inputValueMin) return inputValue = inputValueMin;

      inputQuantity.value = inputValue - 1;
    }

    const handleQuantityChange = () => {
      let inputValue = Number(inputQuantity.value);
      let inputValueMax = Number(inputQuantity.getAttribute('max'));
      let inputValueMin = Number(inputQuantity.getAttribute('min'));

      if (inputValue >= inputValueMax) {
        return inputQuantity.value = inputValueMax;
      } else if (inputValue <= inputValueMin) {
        return inputQuantity.value = inputValueMin;

      } else {
        inputQuantity.value = inputValue;
      }
    }

    handleAddButton.addEventListener('click', handleAdd)
    handleSubstractButton.addEventListener('click', handleSubstract)
    inputQuantity.addEventListener('change', handleQuantityChange)


    console.log('input vacio es igual a null?', inputQuantity.value === '')
    const addProductToCart = () => {
      debugger
      if (Number(inputQuantity.value) === 1) {
        fetch(`/api/carts/${cartId}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ _id: productId })
        })
          .then(response => response.json())
          .then(data => {
            alert('Producto agregador carrito', data)
          })
          .catch(error => console.error(error));
      } else {
        fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ quantity: Number(inputQuantity.value) })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            alert(`${inputQuantity.value} Productos agregador carrito`)
          })
          .catch(error => console.error(error));
      }
    }

    addProductButton.addEventListener('click', addProductToCart)
  })
  .catch(error => console.error(error))