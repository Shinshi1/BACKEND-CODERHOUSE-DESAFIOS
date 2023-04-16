const API_URL = '/api/products/';
const SESSION_URL = '/sessions'
let user
// DOM
// icon profile
const iconProfile = document.querySelector('#icon-profile')
// products
const productContainer = document.querySelector('#productContainer')
// pagination
const prevPageButton = document.querySelector('#prevPage-button');
const nextPageButton = document.querySelector('#nextPage-button');
const inputPage = document.querySelector('#inputPage')

iconProfile.addEventListener('click', () => {
  window.location.pathname = '/profile'
})


const pagination = ({ data, nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler }) => {
  inputPage.value = data.page
  inputPage.setAttribute('max', data.totalPages)
  inputPage.addEventListener('input', inputPageInputHandler)

  nextPageButton.addEventListener('click', nextPageClickHandler)

  prevPageButton.addEventListener('click', prevPageClickHandler)

  inputPage.addEventListener('change', inputPageChangeHandler)
}

const removePaginationHandlers = ({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler }) => {
  nextPageButton.removeEventListener('click', nextPageClickHandler)
  prevPageButton.removeEventListener('click', prevPageClickHandler)
  inputPage.removeEventListener('change', inputPageChangeHandler)
  inputPage.removeEventListener('input', inputPageInputHandler)

}

const eventUploadFetch = (page) => {
  fetch(`${API_URL}?page=${page}`)
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

      const nextPageClickHandler = () => {
        let pageNext = data.nextLink;
        let page = Number(inputPage.value);
        if (data.hasNextPage) {
          page = pageNext;
          removePaginationHandlers({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler })
          eventUploadFetch(page);
        }
      }

      const prevPageClickHandler = () => {
        let pagePrev = data.prevLink
        if (data.hasPrevPage) {
          page = pagePrev
          removePaginationHandlers({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler })
          eventUploadFetch(page)
        }

      }

      const inputPageChangeHandler = () => {
        if (page > data.totalPages) {
          page = data.totalPages;
          inputPage.value = page;
        } else if (page < 1) {
          page = 1;
          inputPage.value = page;
        } else {
          page = inputPage.value
        }


        removePaginationHandlers({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler })
        eventUploadFetch(page)
      }

      const inputPageInputHandler = () => {
        debugger
        console.log('event input')
        if (page > data.totalPages) {
          page = inputPage.max;
        } else if (page < 1) {
          page = 1;
        } else {
          page = inputPage.value
        }


        removePaginationHandlers({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler })
        eventUploadFetch(page)
      }

      removePaginationHandlers({ nextPageClickHandler, prevPageClickHandler, inputPageChangeHandler, inputPageInputHandler })

      pagination({
        data,
        nextPageClickHandler,
        prevPageClickHandler,
        inputPageChangeHandler,
        inputPageInputHandler
      });
    })
    .catch(error => console.error(error))
}

eventUploadFetch(1)

fetch(SESSION_URL)
  .then(res => res.json())
  .then(data => {
    Swal.fire({
      title: `Te damos la bienvenida ${data.user.first_name} ${data.user.last_name}`,
    })
  })
  .catch(error => console.log(error))

