const filtroBusqueda = document.querySelector('#input-search');

const productos = document.getElementsByClassName('product');

const filtrosRating = document.getElementsByClassName('filter-review');

const botonLimpiar = document.querySelector('.clear-btn');

const filtroscategory = document.getElementsByClassName('filter-category');

const checkboxes = document.querySelectorAll(".filter")  



/******************💛💛💛 FILTROS 💛💛💛***************/

/*----Chequea si hay checkbox chequeados ON */

const busquedaOn = () => {

  if(filtroBusqueda.value.length !== 0){
    return true
  }else {
    return false
  }
}

const categoryOn = () => {

  for (const filtro of filtroscategory) {
    if (filtro.checked) {
      return true
    }
  }

  return false
}

const ratingOn = () => {

  for (const filtro of filtrosRating) {
    if (filtro.checked) {
      return true
    }
  }

  return false
}
/* --------- Pasa Filtros por separado -----------*/
const pasaFiltrocategory = (producto) => {
  const category = producto.dataset.category
  // aca empieza un truco de magia a lo Copperfield- selecciona UN solo filtro que coincide con la product y lo pone chequeado !!
  const filtrocategory = document.querySelector(`.filter-category[value="${category}"]`)
  
  return filtrocategory.checked // charan!
}

const pasaFiltroRating = (producto) => {
  const rating = producto.dataset.rating
  const filtroRating = document.querySelector(`.filter-review[value="${rating}"]`)

  return filtroRating.checked
}

const pasaFiltroBusqueda = (producto) => {
  const nombre = producto.dataset.nombre

  return nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
}

/* ------ Filtrado de cada Checkbox -------*/

const pasaFiltros = (producto) => {

  return ( // condicion: si pasa filtro o no esta chequeado-incluyendo a todos
    (pasaFiltrocategory(producto) || !categoryOn()) &&
    (pasaFiltroRating(producto) || !ratingOn()) &&
    (pasaFiltroBusqueda(producto) || !busquedaOn())
  )
  }


/* ------- Actualizar Productos Filtrados ------ */

const actualizarCantidadProductosFiltrados = () => {
  let contador = 0

  for (const producto of productos) {
    if (pasaFiltros(producto)) {
      contador++
    }
  }

  let productosFiltrados = document.getElementById('products-qty')

  productosFiltrados.innerText = `Mostrando ${contador} producto(s) de ${productos.length}`
}

/* -------- Mostrar Productos que pasen los filtros -------------*/


const actualizarProductosFiltrados = () => {

  for (const producto of productos) {

    producto.classList.add('is-hidden'); //Escondo todas las products para empezar 
   
    if (pasaFiltros(producto)) {
      producto.classList.remove('is-hidden')
    } else {
      producto.classList.add('is-hidden')
    }
  }
}

/*-------- Inicio del proceso de filtrado ---------*/

const filtrarProductos = () => {
  actualizarProductosFiltrados()
  actualizarCantidadProductosFiltrados()
}



/******************💛💛💛 LIMPIAR FILTROS 💛💛💛********************* */


const limpiarBusqueda = () => filtroBusqueda.value = "";
const limpiarCheckboxes = () => {
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {    
      checkbox.checked = false
    }
  }

}

const mostrarproducts = () => {
  for (let producto of productos) {
    producto.classList.remove('is-hidden')
  }
}


/************** 💛💛💛 INICIALIZAR FILTROS 💛💛💛*********** */

// Si hace click en un checkbox o inicia una busqueda-> Filtrar PRODUCTOS

for (let checkbox of checkboxes) {
  checkbox.onclick = () => {
    filtrarProductos();
  };
}
// Si empieza una busqueda por nombre

filtroBusqueda.oninput = () =>{
    filtrarProductos();
}


botonLimpiar.onclick = () => { 
  limpiarCheckboxes();  //destildo todos los checkboxes
  limpiarBusqueda();   // borro form de busqueda
  mostrarproducts();  // vuelvo a mostrar todas las products
  actualizarCantidadProductosFiltrados(); // actualiza el conteo de productos que muestra
}


/******************💛💛💛 OVERLAY HEADER 💛💛💛***************/

const botonAbrirMenu = document.querySelector(".btn-cart")
const botonCerrarMenu = document.getElementById("cerrar-menu")

const menu = document.getElementById("menu")

const overlay = document.getElementById("overlay")



botonAbrirMenu.onclick = () => {

  mostrarOverlay()
  bodySinScroll()
  mostrarCarrito() 
}

botonCerrarMenu.onclick = () => {

  ocultarOverlay()
  bodyConScroll()
  ocultarCarrito()
}


const mostrarOverlay = () => {
  overlay.classList.remove("is-hidden")
}

const ocultarOverlay = () => {
  overlay.classList.add("is-hidden")
 
}

const bodySinScroll = () => {
  document.body.classList.add("no-scroll")
}

const bodyConScroll = () => {
  document.body.classList.remove("no-scroll")
}

const mostrarCarrito = () => {
  menu.classList.add("show-cart")
}

const ocultarCarrito = () => {
  menu.classList.remove("show-cart")
}
