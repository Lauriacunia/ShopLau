const filtroBusqueda = document.querySelector('#input-busqueda');

const productos = document.getElementsByClassName('tarjeta');

const filtrosRating = document.getElementsByClassName('filtro-estrella');

const botonLimpiar = document.querySelector('.boton-tachito');

const filtrosCategoria = document.getElementsByClassName('filtro-categoria');

const checkboxes = document.querySelectorAll(".checkbox-filtro")  



/******************💛💛💛 FILTROS 💛💛💛***************/

/*----Chequea si hay checkbox chequeados ON */

const busquedaOn = () => {

  if(filtroBusqueda.value.length !== 0){
    return true
  }else {
    return false
  }
}

const categoriaOn = () => {

  for (const filtro of filtrosCategoria) {
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
const pasaFiltroCategoria = (producto) => {
  const categoria = producto.dataset.categoria
  // aca empieza un truco de magia a lo Copperfield- selecciona UN solo filtro que coincide con la tarjeta y lo pone chequeado !!
  const filtroCategoria = document.querySelector(`.filtro-categoria[value="${categoria}"]`)
  
  return filtroCategoria.checked // charan!
}

const pasaFiltroRating = (producto) => {
  const rating = producto.dataset.rating
  const filtroRating = document.querySelector(`.filtro-estrella[value="${rating}"]`)

  return filtroRating.checked
}

const pasaFiltroBusqueda = (producto) => {
  const nombre = producto.dataset.nombre

  return nombre.toLowerCase().includes(filtroBusqueda.value.toLowerCase())
}

/* ------ Filtrado de cada Checkbox -------*/

const pasaFiltros = (producto) => {

  return ( // condicion: si pasa filtro o no esta chequeado-incluyendo a todos
    (pasaFiltroCategoria(producto) || !categoriaOn()) &&
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

  let productosFiltrados = document.getElementById('nro-productos')

  productosFiltrados.innerText = `Mostrando ${contador} producto(s) de ${productos.length}`
}

/* -------- Mostrar Productos que pasen los filtros -------------*/


const actualizarProductosFiltrados = () => {

  for (const producto of productos) {

    producto.classList.add('hidden'); //Escondo todas las tarjetas para empezar 
   
    if (pasaFiltros(producto)) {
      producto.classList.remove('hidden')
    } else {
      producto.classList.add('hidden')
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

const mostrarTarjetas = () => {
  for (let producto of productos) {
    producto.classList.remove('hidden')
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
  mostrarTarjetas();  // vuelvo a mostrar todas las tarjetas
  actualizarCantidadProductosFiltrados(); // actualiza el conteo de productos que muestra
}