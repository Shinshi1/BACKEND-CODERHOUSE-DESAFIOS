const API_URL = `/api${window.location.pathname}`;

const productContainer = document.querySelector('#productContainer');

fetch(`${API_URL}`)
  .then(res => res.json())
  .then(data => {
    productContainer.innerHTML = '';

    let products = ''
    data.response.products.forEach(({product, quantity}) => {
      products += `
<div class="card-item" data-code="${product.code}">
  <div class="card-img">
      <img src="${product.thumbnail}"
          alt="${product.title}">
  </div>
  <div class="card-details">
      <h5>${product.title}</h5>
      <p>${product.description}.</p>
      <span>Price: $${product.price}</span> <br>
      <span>Cantidad: ${quantity}</span> <br>
      <span>Categoria: ${product.category}</span>

  </div>
</div>
`
    });
    productContainer.innerHTML = products;

  })
  .catch(error => console.error(error))