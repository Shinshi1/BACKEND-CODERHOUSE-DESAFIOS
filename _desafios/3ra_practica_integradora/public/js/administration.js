const productName = document.querySelector('#productName')
const productDescription = document.querySelector('#productDescription')
const productCode = document.querySelector('#productCode')
const productPrice = document.querySelector('#productPrice')
const productImage = document.querySelector('#productImage')
const productStock = document.querySelector('#productStock')
const productCategory = document.querySelector('#productCategory')
const createProductButton = document.querySelector('#createProduct')

const productId = document.querySelector('#productId')
const deleteProductButton = document.querySelector('#deleteProduct')

const stockExist = () => {
  return productStock.value > 0
}

const createProduct = (e, data) => {
  e.preventDefault()
  const product = {
    title: productName.value,
    description: productDescription.value,
    code: productCode.value,
    price: productPrice.value,
    thumbnail: productImage.value,
    stock: productStock.value,
    category: productCategory.value,
    status: stockExist(),
    owner: data.user.email,
  }
  const productData = JSON.stringify(product)
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: productData
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        alert('Product created successfully')
        // window.location.href = '/products'
      }
    })
    .catch(err => console.error(err))
}

const deleteProduct = (e) => {
  e.preventDefault()
  fetch(`/api/products/${productId.value}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        alert('Product deleted successfully')
      }
    })
    .catch(err => console.error(err));
}


fetch('/sessions', {
  method: 'GET'
})
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if (Boolean(data.user)) {
      createProductButton.addEventListener('click', function (e) {
        createProduct(e, data)
      });

      deleteProductButton.addEventListener('click', function (e) {
        deleteProduct(e)
      });
    } else {
      alert(data.message)
      // window.location.href = '/login'
    }
  })
  .catch(err => console.log(err))





