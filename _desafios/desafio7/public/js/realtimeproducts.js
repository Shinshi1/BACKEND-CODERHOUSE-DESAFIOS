const productSocket = io()

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
const btnAgregar = document.querySelector('#btnAgregar')
const btnEliminar = document.querySelector('#btnEliminar')
// products
const productListHandlebars = document.querySelector('#productListHandlebars')
const productContainer = document.querySelector('#productContainer')

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
        status: true,
        stock: Number(stock),
        category: category,
        thumbnail: [thumbnail],
    }
    return product
}

const completeData = () => {
    debugger
    if (inputName.value && inputDescription.value && inputCode.value && inputPrice.value && inputStock.value && inputCategory.value) {
        console.log('datos completos')
        return true
    } else {
        alert('datos incompletos')
        return false
    }
}

productForm.addEventListener('submit', (e) => {
    e.preventDefault()
})

btnAgregar.addEventListener('click', () => {
    if (completeData()) {
        productSocket.emit('productReceived', dataForm())
        alert('product sent')
    }
})

btnEliminar.addEventListener('click', () => {
    const code = inputCode.value
    if (code === "") {
        alert('agregue el codigo del producto a eliminar')
        return
    }
    // Eliminar del DOM
    const elementDelete = (code) => {
        // buscar el elemento con el código especificado
        const productToDelete = document.querySelector(`[data-code="${code}"]`);
        // eliminar el elemento del DOM
        productToDelete.parentNode.removeChild(productToDelete);
    }
    elementDelete(code)
    // eliminar de fileSystem
    productSocket.emit('productDelete', code)
    alert(`producto con code: ${code} eliminado`)
})



// agregar productos
productSocket.on('addedProducts', (data) => {
    let productList = ''
    data.forEach((product) => {
        productList = `
        <ul data-code="${product.code}"> 
            <li>name: ${product.title}</li>
            <li>description: ${product.description}</li>
            <li>code: ${product.code}</li>
            <li>price: ${product.price}</li>
            <li>status: ${product.status}</li>
            <li>stock: ${product.stock}</li>
            <li>category: ${product.category}</li>
        </ul>
        `
    })
    productContainer.innerHTML += productList
})

