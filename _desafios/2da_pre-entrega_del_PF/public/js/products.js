const API_URL = '/api/products';

// DOM
// products
const productContainer = document.querySelector('#productContainer')
// pagination
const prevPageButton = document.querySelector('#prevPage-button');
const nextPageButton = document.querySelector('#nextPage-button');
const inputPage = document.querySelector('#inputPage')

const pagination = (data) => {
  console.log('pagination funciona')
  inputPage.setAttribute('max', data.totalPages)
  inputPage.addEventListener('input', () => {
    if (parseInt(inputPage.value) > parseInt(inputPage.max)) {
      inputPage.value = inputPage.max;
    }

    if (parseInt(inputPage.value) < 1) {
      inputPage.value = 1;
    }
  })

  nextPageButton.addEventListener('click', () => {
    if (inputPage.value < data.totalPages)
      inputPage.value++

  })
  prevPageButton.addEventListener('click', () => {
    if (inputPage.value > 1)
      inputPage.value--

  })

  inputPage.addEventListener('change', () => {
    fetch(`${API_URL}?page=${inputPage.value}`)
      .then(res => res.json())
      .then(data => {
        productContainer.innerHTML = '';

        let product = ''
        data.payload.forEach(item => {
          product += `
    <div class="card-item" data-code="${item.code}">
      <div class="card-img">
          <img src="${item.thumbnail}"
              alt="${item.title}">
      </div>
      <div class="card-details">
          <h5>${item.title}</h5>
          <p>${item.description}.</p>
          <span>Price: $${item.price}</span> <br>
          <button>Agregar al carrito</button>
      </div>
    </div>
    `
        });
        productContainer.innerHTML = product;
        // pagination
        pagination(data)
      })
      .catch(error => console.error( error))
  })
}

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    // products
    let product = ''
    data.payload.forEach(item => {
      product += `
      <div class="card-item" data-code="${item.code}">
        <div class="card-img">
            <img src="${item.thumbnail}"
                alt="${item.title}">
        </div>
        <div class="card-details">
            <h5>${item.title}</h5>
            <p>${item.description}.</p>
            <span>Price: $${item.price}</span> <br>
            <button>Agregar al carrito</button>
        </div>
      </div>
      `
    });
    productContainer.innerHTML = product;

    // pagination
    pagination(data)
  })
  .catch(error => console.error(error))

/*
fetch(`${API_URL}?page=${data.nextLink}`)
      .then(res => res.json())
      .then(data => {
        productContainer.innerHTML = '';

        let product = ''
        data.payload.forEach(item => {
          product += `
    <div class="card-item" data-code="${item.code}">
      <div class="card-img">
          <img src="${item.thumbnail}"
              alt="${item.title}">
      </div>
      <div class="card-details">
          <h5>${item.title}</h5>
          <p>${item.description}.</p>
          <span>Price: $${item.price}</span> <br>
          <button>Agregar al carrito</button>
      </div>
    </div>
    `
        });
        productContainer.innerHTML = product;
      })
*/