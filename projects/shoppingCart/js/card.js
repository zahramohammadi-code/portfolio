// ======================= variables =========================
const productContainer = document.querySelector('#product-container');
const shoppingBasket = document.querySelector('.shopping-basket tbody');
const clearCartBtn = document.querySelector('.button');

// ===================== eventlistener ========================
productContainer.addEventListener('click', buyProduct);

shoppingBasket.addEventListener('click', removeProductFromBasket);

clearCartBtn.addEventListener('click', removeAllProducts);

document.addEventListener('DOMContentLoaded', showProductsOnload);
// ======================= function ===========================

function buyProduct(e) {
  if (e.target.classList.contains('add')) {
    const product = e.target.parentElement.parentElement.parentElement;
    getContentInfo(product);
  }
}

// getting the product info that selectes by user
function getContentInfo(product) {
  const products = {
    title: product.querySelector('h4').textContent,
    price: product.querySelector('span').textContent,
    id: product.querySelector('a').getAttribute('data-id'),
  };
//   console.log(products);

  addToCart(products);
}

//adding the course to the cart
function addToCart(info) {
  const row = document.createElement('tr');
  row.innerHTML += `
        <td>
            <img src="img/${info.id}.jpg"  width='80'  height='70'/>
        </td>
        <td>
            ${info.title}
        </td>
        <td>
            ${info.price}
        </td>
        <td>
            <a class='remove' href='#' data-id="${info.id}">x</a>
        </td>
    `;
  shoppingBasket.appendChild(row);

  addToLocalStorage(info);
}

//remove course from cart
function removeProductFromBasket(e) {
    let product, Id
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        product=e.target.parentElement.parentElement
        Id= product.querySelector('a').getAttribute('data-id')

    }
    removeProductsFromLS(Id)
}

function removeAllProducts() {
  while (shoppingBasket.firstChild) {
    shoppingBasket.firstChild.remove();
  }
  removeAllProductsFromLS()
}

// add product to the local storage
function addToLocalStorage(info) {
  let products = getFromLS();
//   console.log(products);
  products.push(info);

  localStorage.setItem('products', JSON.stringify(products));
}

// get products form localstorage
function getFromLS() {
  let product = localStorage.getItem('products');
  let obj;
  if (product) {
    obj = JSON.parse(product);
  } else {
    obj = [];
  }
  return obj;
}

function showProductsOnload() {
  let products = getFromLS();

  products.forEach((info) => {
    const row = document.createElement('tr');
    row.innerHTML += `
        
            <td>
                <img src="img/${info.id}.jpg"  width='80'  height='70'/>
            </td>
            <td>
                ${info.title}
            </td>
            <td>
                ${info.price}
            </td>
            <td>
                <a class='remove' href='#' data-id="${info.id}">x</a>
            </td>
        
            `;
    shoppingBasket.appendChild(row);
  });
}



function removeAllProductsFromLS() {
    localStorage.clear()
}

function removeProductsFromLS(id){
    
    let products= getFromLS()
    products.forEach((item,index)=>{
        console.log(item.id, id)
        if (item.id===id) {
            products.splice(index,1)
            
        }
    })

    localStorage.setItem('products',JSON.stringify(products))
}