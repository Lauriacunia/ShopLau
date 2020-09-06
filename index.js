const filtroNombre = document.querySelector('#input-busqueda');

const tarjetas = document.getElementsByClassName('tarjeta');

const filtroRating = document.getElementsByClassName('filtro-estrella');

const botonLimpiar = document.querySelector('.boton-tachito');

const filtroCategoria = document.getElementsByClassName('filtro-categoria');

const checkboxes = document.querySelectorAll(".checkbox-filtro")  


//*************** FILTRO DE BUSQUEDA ********************/

// cuando se escriba algo en el input
filtroNombre.oninput = () => {
    // recorro una a una cada tarjeta
    for (let tarjeta of tarjetas) {
      // me fijo el nombre de la tarjeta y qué buscó el usuario
      const titulo = tarjeta.dataset.nombre;
      console.log(titulo)
      const busqueda = filtroNombre.value;
      console.log(busqueda)
      // si el titulo incluye lo que buscó el usuario...
      if (titulo.includes(busqueda)) {
        // le quito la clase "hidden" a la tarjeta
        console.log("INCLUYEEEEEeeeeeeeeeeeeeeeeeeeeee")
        console.log(tarjeta.classList.contains('hidden'))
        tarjeta.classList.remove('hidden');
        console.log(tarjeta.classList.contains('hidden'))
      } else {
        // se la agrego
        console.log("NO INCLUYEEEeeeeeeeeeeeeeeeeeeeeee")
        console.log(tarjeta.classList.contains('hidden'))
        tarjeta.classList.add('hidden');
        console.log(tarjeta.classList.contains('hidden'))
      }
    }
  }

/******************* FILTRO POR PUNTAJE-ESTRELLAS ***************/

// Si hace click en un checkbox de estrella--> Filtra tarjetas

for (let checkbox of checkboxes) {
  checkbox.onclick = () => {
    filtrarTarjetas();
  };
}

// Funcion Booleana para saber si un checkbox esta checked.

const CheckboxOn = () => {
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      return true;
    }
  }
};

const comparoCheckboxVsTarjeta = tarjeta => {
console.log(tarjeta)
  for (let checkbox of checkboxes) { // Recorro los checkbox y comparo con el valor de rating de la tarjeta 
    if ((checkbox.value === tarjeta.dataset.rating) || (checkbox.value === tarjeta.dataset.categoria) && (checkbox.checked)) { // para filtro de ratings

      return true;}
   
  }
};

const filtrarTarjetas = () => {
  for (let tarjeta of tarjetas) { // Recorro tarjetas

    tarjeta.classList.add('hidden'); //Escondo todas las tarjetas para empezar 
    
    if (CheckboxOn()) { // chequeo que filtro esta seleccionado 
      if (comparoCheckboxVsTarjeta(tarjeta)) { // Si los valores coinciden--> Mostra tarjeta
        tarjeta.classList.remove('hidden');
      }
    }
    else {
      tarjeta.classList.remove('hidden')
    }
  }
};





/********************FILTRO POR CATEGORIA *******************/


  
/****************** LIMPIAR FILTROS ********************* */


const limpiarBusqueda = () => filtroNombre.value = "";
const limpiarCheckboxes = () => {
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {    
      checkbox.checked = false
    }
  }

}

const mostrarTarjetas = () => {
  for (let tarjeta of tarjetas) {
    tarjeta.classList.remove('hidden')
  }
}

botonLimpiar.onclick = () => { 
  limpiarCheckboxes();  //destildo todos los checkboxes
  limpiarBusqueda();   // borro form de busqueda
  mostrarTarjetas();  // vuelvo a mostrar todas las tarjetas
}
