
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              FILTROS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/*                         ALGORITMO
1- Seleccionar los elementos necesarios y guardarlos en variables

2- Inicializar filtros. Recorrer todos los inputs de los filtros
y llamar a la funcion -filtrarproducts- si el usuario hace click en alguno.

3- Filtrarproducts (incluye varias funciones)

4- Inicializar boton de limpiar filtros y Ejecutar la funcion
LImpiar Filtros
*/

/************** 💛💛💛 1- SELECCIONAR ELEMENTOS 💛💛💛*********** */ 

const inputSearch = document.querySelector('#input-search');
console.log(inputSearch)
const products = document.getElementsByClassName('product'); /*LISTA DE products*/
console.log(products)
const reviewFilters = document.getElementsByClassName('filter-review'); /*LISTA DE REVIEWS*/
console.log(reviewFilters)
const categoryFilters = document.getElementsByClassName('filter-category'); /* LISTA DE CATEGORIAS*/
console.log(categoryFilters)
const checkboxes = document.querySelectorAll(".filter")  /*LISTA DE CHECKBOXES*/
console.log(checkboxes)
const clearBtn = document.querySelector('.clear-btn');
console.log(clearBtn)


/************** 💛💛💛 3- FILTRAR products 💛💛💛*********** */

/*----Chequea si hay checkbox chequeados ON */

const searchOn = () => {

  if(inputSearch.value.length !== 0){
    return true
  }else {
    return false
  }
}

const categoryOn = () => {

  for (const filtro of categoryFilters) {
    if (filtro.checked) {
      return true
    }
  }

  return false
}

const reviewOn = () => {

  for (const filtro of reviewFilters) {
    if (filtro.checked) {
      return true
    }
  }

  return false
}
/* --------- Pasa Filtros por separado -----------*/
const passCategoryFilter = (product) => {
  const category = product.dataset.category
  //selecciona UN solo filtro que coincide con la product y lo pone chequeado !!
  const categoryFilter = document.querySelector(`.filter-category[value="${category}"]`)
  
  return categoryFilter.checked 
}

const passReviewFilter = (product) => {
  const review = product.dataset.review
  const reviewFilter = document.querySelector(`.filter-review[value="${review}"]`)

  return reviewFilter.checked
}

const passInputSearch = (product) => {
  const name = product.dataset.name
 //intente hacer una regex para que me tome acentos pero no lo logre. Como se haria?
  return name.toLowerCase().includes(inputSearch.value.toLowerCase())
}

/* ------ Filtrado de cada Checkbox -------*/

const passAllFilters = (product) => {

  return ( // condicion: si pasa filtro o no esta chequeado-incluyendo a todos
    (passCategoryFilter(product) || !categoryOn()) &&
    (passReviewFilter(product) || !reviewOn()) &&
    (passInputSearch(product) || !searchOn())
  )
  }


/* ------- Actualizar products Filtrados ------ */

const updateQtyProducts = () => {
  let contador = 0

  for (const product of products) {
    if (passAllFilters(product)) {
      contador++
    }
  }

  let productsQty = document.getElementById('products-qty')

  productsQty.innerText = `Mostrando ${contador} product(s) de ${products.length}`
}

/* -------- Mostrar products que pasen los filtros -------------*/


const showProducts = () => {

  for (const product of products) {

    product.classList.add('is-hidden'); //Escondo todas las products para empezar 
   
    if (passAllFilters(product)) {
      product.classList.remove('is-hidden')
    } else {
      product.classList.add('is-hidden')
    }
  }
}

/*-------- Inicio del proceso de filtrado ---------*/

const filterProducts = () => {
  showProducts()
  updateQtyProducts()
}



/******************💛💛💛 4- LIMPIAR FILTROS 💛💛💛********************* */


const clearSearchInput = () => inputSearch.value = "";
const clearCheckboxesChequed = () => {
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {    
      checkbox.checked = false
    }
  }

}

const showAllProducts = () => {
  for (let product of products) {
    product.classList.remove('is-hidden')
  }
}


/************** 💛💛💛 2- INICIALIZAR FILTROS 💛💛💛*********** */

// Si hace click en un checkbox o inicia una busqueda-> Filtrar products

for (let checkbox of checkboxes) {
  checkbox.onclick = () => {
    filterProducts();
  };
}
// Si empieza una busqueda por nombre

inputSearch.oninput = () =>{
    filterProducts();
}


clearBtn.onclick = () => { 
  clearCheckboxesChequed();  //destildo todos los checkboxes
  clearSearchInput();   // borro form de busqueda
  showAllProducts();  // vuelvo a mostrar todas los productos
  updateQtyProducts(); // actualiza el conteo de products que muestra
}



/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              LISTA DE PRODUCTOS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar los botones de grid y list, y contenedor de productos
 * 2- Inicializar evento onclic para ambos botones
 * 3- Modificar layout de lista de productos:
 * agregar o quitar clases in-line o in-grid segun corresponda.
 * Mas agregar descripcion a cada tarjeta.
 */
/******************💛💛💛 1- SELECCIONAR BOTONES  💛💛💛***************/
const btnGrid = document.querySelector('#view-button-grid');
const btnList = document.querySelector('#view-button-list');
const productsListContainer = document.querySelector('.products-list');
const productsDescriptions = document.querySelectorAll('.product-description');//todas las descripciones de los productos


/******************💛💛💛 2-MODIFICAR LAYOUT CONTENEDOR DE PRODUCTOS 💛💛💛***************/

showGrid = () =>{
  productsListContainer.classList.remove("in-stack")
  productsListContainer.classList.add("in-grid")
  for(let p of products){
    p.classList.remove("in-line-product");
  }
  for(let d of productsDescriptions){
    d.classList.add("is-hidden")
  }
}

showList = () =>{
  productsListContainer.classList.remove("in-grid")
  productsListContainer.classList.add("in-stack")
  for(let p of products){
    p.classList.add("in-line-product");
  }
  for(let d of productsDescriptions){
    d.classList.remove("is-hidden")
  }
}
/******************💛💛💛 3-INICIALIZAR EVENTO DE BOTONES GRID O LINE 💛💛💛***************/
btnGrid.onclick = () =>{
  showGrid();
}

btnList.onclick = () => {
  showList();
}



/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar todos los elementos necesarios
 * 2- Inicializar evento que escuche el on-click en el boton de abrir carrito
 * y otro que escuche el boton cerrar carrito
 * 3- Ir a la funcion Mostrar Carrito u Ocular arrito 
 * segun corresponda.
 * Cuando se abre carrito mostrar overlay y evitar scroll en screen.
 * 4- Inicializar evento en Botones Comprar y en contador de 
 * productos del carrito
 * 5-Agregar Funcionalidades: contar productos del carrito y calcular
 * subtotal de la compra
 */

/******************💛💛💛 1-SELECCIONAR ELEMENTOS  💛💛💛***************/
const btnOpenCart = document.querySelector(".btn-cart")
const btnCloseCart = document.querySelector(".btn-close")
const cart = document.querySelector(".header-menu-add-to-card")
const overlay = document.querySelector(".overlay")

const allBtnAddToCart = document.querySelectorAll(".button-add-to-cart")
const counterProducts = document.querySelectorAll(".cart-qty")

/******************💛💛💛 3-MOSTRAR U OCULTAR CARRITO Y OVERLAY 💛💛💛***************/
const showOverlay = () => {
  overlay.classList.remove("is-hidden")
  console.log("se muestra overlay")
}

const hiddeOverlay = () => {
  overlay.classList.add("is-hidden")
  console.log("se oculto overlay")
}

const bodyNoScroll = () => {
  document.body.classList.add("no-scroll")
}

const bodyScroll = () => {
  document.body.classList.remove("no-scroll")
}

const showCart = () => {
  cart.classList.remove("menu-add-to-card-hidde")
}

const hiddeCart = () => {
  cart.classList.add("menu-add-to-card-hidde")
}
/******************💛💛💛 5-FUNCIONALIDADES DE SUMAR SUBTOTAL Y
 *                                CAMBIAR CONTADOR DE PRODUCTOS  💛💛💛***************/ 
addCounterCart =()=>{
 for(let c of counterProducts){
   console.log("queres sumar productos")
   let counterNumber = Number(c.innerText);
   counterNumber++;
   console.log(counterNumber)

   c.innerText = counterNumber;
 }

}

addPriceToSubtotal = () => {
  console.log("aca vamos a sumar el subtotal")
}

/******************💛💛💛 3-INICIALIZAR EVENTO MOSTRAR CARRITO 💛💛💛***************/

btnOpenCart.onclick = () => {
  showOverlay()
  bodyNoScroll()
  showCart() 
}

btnCloseCart.onclick = () => {
  hiddeOverlay()
  bodyScroll()
  hiddeCart()
}
/******************💛💛💛 4-INICIALIZAR EVENTO SUMAR PRODUCTOS 💛💛💛***************/

for(btnAddToCart of allBtnAddToCart) {
  btnAddToCart.onclick = () => {
    addPriceToSubtotal()
    addCounterCart()
  }
}

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             MODALES CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/









/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             CHECKOUT
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

/**    Algoritmo
 * 1- Seleccionar todos los elementos
 * 2- Crear funcionalidad de abrir y cerrar Menu Checkout
 * 3- Crear funcionalidad de Descuentos y Recargos para 
 * calcular el total de la compra
 */
const btnOpenCheckout = document.querySelector(".btn-buy")
const btnFinishBuy = document.querySelector(".btn-finish-buy")
const btnCancelBuy = document.querySelector(".btn-cancel-buy")
const menuCheckout = document.querySelector(".menu-checkout")


/******************💛💛💛 2- ABRIR Y CERRAR CHECKOUT 💛💛💛***************/

const showCheckout = () => {
  menuCheckout.classList.remove("checkout-is-hidden")
}

const hiddeCheckout = () => {
  menuCheckout.classList.add("checkout-is-hidden")
}

btnOpenCheckout.onclick = () => {
  console.log("hiciste click en btn open checkout")
  showOverlay()
  bodyNoScroll()
  showCheckout() 
}

btnFinishBuy.onclick = () => {
  console.log("hiciste click en btn finish buy")
  hiddeOverlay()
  bodyScroll()
  hiddeCheckout()
  hiddeCart()
}

btnCancelBuy.onclick = () => {
  console.log("hiciste click en btn cancel buy")
  hiddeOverlay()
  bodyScroll()
  hiddeCheckout()
  hiddeCart()
}

