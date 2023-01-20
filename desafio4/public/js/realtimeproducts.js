const productSocket = io()
console.log('been here')

// DOM connection
// form 
const productForm = document.querySelector('#productForm')
// form-inputs
const inputName = document.querySelector('#name')
const inputDescription = document.querySelector('#description')
const inputCode = document.querySelector('#code')
const inputPrice = document.querySelector('#price')
const inputStock = document.querySelector('#stock')
const inputCategory = document.querySelector('#category')
const inputThumbnail = document.querySelector('#thumbnail')
// btnEnviar
const btnEnviar = document.querySelector('#btnEnviar')

const dataForm = () => {
    let nombre = inputName.value
    let description = inputDescription.value
    let code = inputCode.value
    let price = inputPrice.value
    let stock = inputStock.value
    let category = inputCategory.value
    let thumbnail = inputThumbnail.value

    let product = {
        title: nombre,
        description: description,
        code: code,
        price: Number(price),
        stock: Number(stock),
        category: category,
        thumbnail: thumbnail,
    }
    console.log('from dataForm() prodcut is... ', product)
    return product
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault()
    productSocket.emit('productReceived', dataForm())
    alert('product sent')
})

