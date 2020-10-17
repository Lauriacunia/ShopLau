/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                          FUNCIONES GENERALES
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

const hide = (element) => {
	return element.classList.add('is-hidden');
};
const show = (element) => {
	return element.classList.remove('is-hidden');
};
const normalize = (str) => {
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	str = str.toLowerCase();
	return str;
};
const showOverlay = () => {
	show(overlay);
};
const hiddeOverlay = () => {
	hide(overlay);
};
const bodyNoScroll = () => {
	document.body.classList.add('no-scroll');
};
const bodyScroll = () => {
	document.body.classList.remove('no-scroll');
};

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
const products = document.getElementsByClassName('product'); /*LISTA DE PRODUCTOS*/
const reviewFilters = document.getElementsByClassName('filter-review'); /*LISTA DE REVIEWS*/
const categoryFilters = document.getElementsByClassName('filter-category'); /* LISTA DE CATEGORIAS*/
const checkboxes = document.querySelectorAll('.filter'); /*LISTA DE CHECKBOXES*/
const clearBtn = document.querySelector('.clear-btn');

/************** 💛💛💛 3- FILTRAR PRODUCTOS 💛💛💛*********** */

/*----Chequea si hay checkbox chequeados ON */
const searchOn = () => {
	if (inputSearch.value.length !== 0) {
		return true;
	} else {
		return false;
	}
};
const categoryOn = () => {
	for (const filtro of categoryFilters) {
		if (filtro.checked) {
			return true;
		}
	}
	return false;
};
const reviewOn = () => {
	for (const filtro of reviewFilters) {
		if (filtro.checked) {
			return true;
		}
	}
	return false;
};

/* --------- Pasa Filtros por separado -----------*/
const passCategoryFilter = (product) => {
	const category = product.dataset.category;
	//selecciona UN solo filtro que coincide con la product y lo pone chequeado !!
	const categoryFilter = document.querySelector(`.filter-category[value="${category}"]`);
	return categoryFilter.checked;
};
const passReviewFilter = (product) => {
	const review = product.dataset.review;
	const reviewFilter = document.querySelector(`.filter-review[value="${review}"]`);
	return reviewFilter.checked;
};
const passInputSearch = (product) => {
	let name = product.dataset.name;
	let nameStandard = normalize(name);
	let inputSearchStandard = inputSearch.value;
	inputSearchStandard = normalize(inputSearchStandard);
	return nameStandard.includes(inputSearchStandard);
};

/* ------ Filtrado de cada Checkbox -------*/
const passAllFilters = (product) => {
	return (
		// condicion: si pasa filtro o no esta chequeado-incluyendo a todos
		(passCategoryFilter(product) || !categoryOn()) &&
		(passReviewFilter(product) || !reviewOn()) &&
		(passInputSearch(product) || !searchOn())
	);
};

/* ------- Actualizar products Filtrados ------ */
let productsQty = document.getElementById('products-qty');

const updateQtyProducts = () => {
	let contador = 0;
	for (const product of products) {
		if (passAllFilters(product)) {
			contador++;
		}
	}
	productsQty.innerText = `Mostrando ${contador} product(s) de ${products.length}`;
};

/* -------- Mostrar productos que pasen los filtros -------------*/

const showProducts = () => {
	for (const product of products) {
		hide(product); //Escondo todas las products para empezar
		if (passAllFilters(product)) {
			show(product);
		} else {
			hide(product);
		}
	}
};

/*-------- Inicio del proceso de filtrado ---------*/

const filterProducts = () => {
	showProducts();
	updateQtyProducts();
};

/******************💛💛💛 4- LIMPIAR FILTROS 💛💛💛********************* */

const clearSearchInput = () => {
  inputSearch.value = ''
};

const clearCheckboxesChequed = () => {
	for (let checkbox of checkboxes) {
		if (checkbox.checked) {
			checkbox.checked = false;
		}
	}
};

const showAllProducts = () => {
	for (let product of products) {
		show(product);
	}
};

/************** 💛💛💛 2- INICIALIZAR FILTROS 💛💛💛*********** */

// Si hace click en un checkbox o inicia una busqueda-> Filtrar productos

for (let checkbox of checkboxes) {
	checkbox.onclick = () => {
		filterProducts();
	};
}
// Si empieza una busqueda por nombre

inputSearch.oninput = () => {
	filterProducts();
};

clearBtn.onclick = () => {
	clearCheckboxesChequed(); //destildo todos los checkboxes
	clearSearchInput(); // borro form de busqueda
	showAllProducts(); // vuelvo a mostrar todas los productos
	updateQtyProducts(); // actualiza el conteo de productos que muestra
};

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                      LISTA DE PRODUCTOS:GRID o LIST
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar los botones de grid y list, y contenedor de productos
 * 2- Inicializar evento onclick para ambos botones
 * 3- Modificar layout de lista de productos:
 * agregar o quitar clases in-line o in-grid segun corresponda.
 * Mas agregar descripcion a cada tarjeta.
 */
/******************💛💛💛 1- SELECCIONAR BOTONES  💛💛💛***************/
const btnGrid = document.querySelector('#view-button-grid');
const btnList = document.querySelector('#view-button-list');
const productsListContainer = document.querySelector('.products-list');
const productsDescriptions = document.querySelectorAll('.product-description'); //todas las descripciones de los productos

/******************💛💛💛 2-MODIFICAR LAYOUT CONTENEDOR DE PRODUCTOS 💛💛💛***************/

showGrid = () => {
	productsListContainer.classList.remove('in-stack');
	productsListContainer.classList.add('in-grid');
	for (let p of products) {
		p.classList.remove('in-line-product');
	}
	for (let d of productsDescriptions) {
		hide(d);
	}
};

showList = () => {
	productsListContainer.classList.remove('in-grid');
	productsListContainer.classList.add('in-stack');
	for (let p of products) {
		p.classList.add('in-line-product');
	}
	for (let d of productsDescriptions) {
		show(d);
	}
};
/******************💛💛💛 3-INICIALIZAR EVENTO DE BOTONES GRID O LINE 💛💛💛***************/
btnGrid.onclick = () => {
	showGrid();
};

btnList.onclick = () => {
	showList();
};

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              FILTROS EN RESPONSIVE
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
const btnOpenFilters = document.querySelector('.open-filters-btn');
const btnCloseFilters = document.querySelector('.close-filters-btn');
const filtersAside = document.querySelector('.filters-aside');

btnOpenFilters.onclick = () => {
	filtersAside.classList.add('aside-responsive');
	filtersAside.classList.add('theme-sky-dark');
	filtersAside.style.display = 'block';
};

btnCloseFilters.onclick = () => {
	filtersAside.classList.remove('aside-responsive');
	filtersAside.classList.remove('theme-sky-dark');
	filtersAside.style.display = 'none';
};

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar todos los elementos necesarios
 * 2- Inicializar evento que escuche el on-click en el boton de abrir carrito
 * y otro que escuche el boton cerrar carrito
 * 3- Ir a la funcion Mostrar Carrito u Ocultar carrito 
 * segun corresponda.
 * Cuando se abre carrito mostrar overlay y evitar scroll en screen.
 * 4- Inicializar evento en Botones Comprar y en contador de 
 * productos del carrito
 * 5-Agregar Funcionalidades: contar productos del carrito y calcular
 * subtotal de la compra
 * 6-Agregar funcionalidades: dentro del carrito sumar mas productos
 * del mismo tipo o eliminarlos individualmente
 */

/******************💛💛💛 1-SELECCIONAR ELEMENTOS  💛💛💛***************/
const btnOpenCart = document.querySelector('.btn-cart');
const btnCloseCart = document.querySelector('.btn-close');
const cart = document.querySelector('.header-menu-add-to-card');
const overlay = document.querySelector('.overlay');
const cartSubtotalOutput = document.querySelectorAll('.cart-subtotal-value');
const allBtnAddToCart = document.querySelectorAll('.button-add-to-cart');
const counterProducts = document.querySelectorAll('.cart-qty');
const cartFullMsg = document.querySelector('.cart-full');
const cartEmptyMsg = document.querySelector('.cart-empty');
const carrito = document.querySelector('.cart-products-added');


let subtotalProductsAdded = 0; // empiezo con $0 de compra

/******************💛💛💛 3-MOSTRAR U OCULTAR CARRITO Y OVERLAY 💛💛💛***************/

const showCart = () => {
	show(cart);
  cart.classList.remove('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', false)
	for (let c of counterProducts) {
		if (c.innerText == 0) {
			hide(cartFullMsg);
			show(cartEmptyMsg);
		}
	}
};
const hiddeCart = () => {
  cart.classList.add('menu-add-to-card-hidde');
  cart.setAttribute('aria-hidden', true)
	hide(cart);
	show(cartFullMsg);
	hide(cartEmptyMsg);
};

/******************💛💛💛 5-FUNCIONALIDADES DE SUMAR SUBTOTAL Y
 *                                CAMBIAR CONTADOR DE PRODUCTOS  💛💛💛***************/

const addCounterCart = () => {
	for (let c of counterProducts) {
		let counterNumber = Number(c.innerText);
		counterNumber++;
		c.innerText = counterNumber;
	}
};
const subtractCounterCart = () => {
	for (let c of counterProducts) {
		let counterNumber = Number(c.innerText);
		counterNumber--;
		c.innerText = counterNumber;
	}
};

/** Saber cual es el producto que compraron
 * comparando id del boton con id del producto */
const knowProduct = (btn,list) => {
	for (let x of list)
		if (x.dataset.id === btn.getAttribute('id')) {
			console.log(x.dataset.id)
			console.log(btn.getAttribute('id'))
			console.log(x.dataset.id === btn.getAttribute('id'))
			return x;
		}
};



/** Ir sumando cada producto comprado al valor de Subtotal (de todos los comprados)
 * para usarlo en el checkout (y calcular descuentos y recargos)
 */
const addSubtotal = (subtotal) => {
	//variable acumuladora de subtotales(precio de cada producto)
	subtotalProductsAdded = subtotalProductsAdded + Number(subtotal);
	// para mostrarlo en pantalla
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

const subtractSubtotal = (subtotal) => {
	//variable acumuladora de subtotales(precio de cada producto)
	subtotalProductsAdded = subtotalProductsAdded - Number(subtotal);
	// para mostrarlo en pantalla
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

addPriceToSubtotal = (btnAddToCart) => {
	/** Algoritmo
   * 1- Recibir el boton para saber su id 
   * 2- Buscar que id de tarjeta coincide con el id del boton
   * 3- saber el precio del producto y sumarlo al subtotal
   * 4- Identificar con una clase el producto agregado
   *   (para seleccionalos y mostrarlos en el carrito)
   */

	let productAdded = knowProduct(btnAddToCart, products);
	let subtotal = productAdded.dataset.price;
	addSubtotal(subtotal);
};

const obtenerPlantillaProductoAgregado = (id, nombre, precio, imagen) => {
	return `<article class="cart-product-added" data-id="${id}" data-qty="1" data-price=${precio}>
    <img src="${imagen}" alt="" class="cart-product-img" />
    <div class="cart-product-details">
      <div class="cart-product-info">
        <h3 class="cart-product-name">${nombre}</h3>
        <button  type="button" class="remove-from-cart-btn" id="${id}"><i class="far fa-trash-alt"></i></button>
      </div>
      <div class="cart-product-price-qty">
        <label>
          <input data-precio="${precio}" type="number" min="0" value="1" class="cart-product-qty" />
          unidades
        </label>
        <p class="cart-product-price">x $${precio}</p>
      </div>
    </div>
  </article>`;
};

const showProductOnCart = (btnAddToCart) => {
	let productAdded = knowProduct(btnAddToCart, products);
	const plantilla = obtenerPlantillaProductoAgregado(
		productAdded.dataset.id,
		productAdded.dataset.name,
		productAdded.dataset.price,
		productAdded.dataset.image
	);
	carrito.innerHTML += plantilla;
	
};

/******************💛💛💛 3-INICIALIZAR EVENTO MOSTRAR CARRITO 💛💛💛***************/

btnOpenCart.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '2';
	bodyNoScroll();
	showCart();
};

btnCloseCart.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hiddeCart();
};
/******************💛💛💛 4-INICIALIZAR EVENTO SUMAR PRODUCTOS 💛💛💛***************/

const removeProductOfTheList = (btnRemove) => {
	/* Averiguar la tarjeta padre*/
	const allProductsAdded = document.querySelectorAll(".cart-product-added")	
	console.log(allProductsAdded)

	let productToRemove = knowProduct(btnRemove, allProductsAdded)

	let subtotal = productToRemove.dataset.price;
	console.log(subtotal)
	subtractSubtotal(subtotal)
	subtractCounterCart()
	productToRemove.remove();
	listenEventsOnCart();
};

const addProductToTheCartList = (inputQty) => {
	let qty = inputQty.getAttribute('value');
	console.log(qty)
	let subtotal = Number(inputQty.dataset.precio) * qty;
	console.log(subtotal)
	/**
	 * Falta: 
	 * -ver sumar o restar el monto si el numero crece o decrece
	 * en relacion a la cantida anterior.
	 * -Actualizar el subtotal de cada producto
	 * si cambia su cantidad
	 * -agregar condicion, si qty igual 0 mostrar mgs carrito vacio
	 */
	addSubtotal(subtotal);
	addCounterCart();
	listenEventsOnCart();
};

/** Escucha eventos remover o agregar producto en carrito*/

const listenEventsOnCart = () => {
	const allBtnRemove = document.querySelectorAll('.remove-from-cart-btn');
	console.log(allBtnRemove)
	const allInputsProductQty = document.querySelectorAll('.cart-product-qty');

	for (btnRemove of allBtnRemove) {
		btnRemove.onclick = () => {
			console.log(btnRemove)
			removeProductOfTheList(btnRemove);
		};
	}

	for (inputQty of allInputsProductQty) {
		inputQty.onchange = () => {
			console.log("apretaste sumar producto")
			addProductToTheCartList(inputQty);
		};
	}
};

/** INICIALIZA BOTONES QUE AGREGAN O QUITAN PRODUCTOS  */

for (let btnAddToCart of allBtnAddToCart) {
	btnAddToCart.onclick = () => {
		addCounterCart();
		addPriceToSubtotal(btnAddToCart);
		showProductOnCart(btnAddToCart);
		listenEventsOnCart();
	};
}

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             MODALES CARRITO
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/
/** Algoritmo
 * 1- Seleccionar elementos
 * 2-Inicializar eventos de boton vaciar carrito para
 * abrir modal
 * 3-Agregar Funcionalidad de vaciar carrito con boton
 * aceptar del modal
 */

/******************💛💛💛 1- SELECCIONAR ELEMENTOS 💛💛💛***************/

const btnOpenModalEmptyCart = document.querySelector('.btn-empty-cart');
const modalEmptyCart = document.querySelector('.modal-empty-cart');
const btnConfirmEmptyCart = document.querySelector('.confirm-cart-empty-btn');
const btnCancelEmptyCart = document.querySelector('.cancel-empty-cart-btn');

/******************💛💛💛 3- FUNCIONALIDAD DE VACIAR CARRITO 💛💛💛***************/

resetCounterCart = () => {
	for (let c of counterProducts) {
		c.innerText = '0';
	}
};

resetPriceToSubtotal = () => {
	subtotalProductsAdded = 0;
	for (let c of cartSubtotalOutput) {
		c.innerText = subtotalProductsAdded;
	}
};

hideAllProductsOnCart = () => {
	carrito.innerHTML = '';
};

const openModalEmptyCart = () => {
  show(modalEmptyCart);
  modalEmptyCart.setAttribute('aria-hidden', false)
};

const emptyCartConfirm = () => {
	resetCounterCart();
	resetPriceToSubtotal();
	hideAllProductsOnCart();
	showCart();
  hide(modalEmptyCart);
  overlay.style.zIndex = 2
  modalEmptyCart.setAttribute('aria-hidden', true)
};
/******************💛💛💛 2- INICIALIZAR EVENTO BTN VACIAR 💛💛💛***************/

btnOpenModalEmptyCart.onclick = () => {
	openModalEmptyCart();
	showOverlay();
    bodyNoScroll();
  overlay.style.zIndex = 4
};
btnConfirmEmptyCart.onclick = () => {
	emptyCartConfirm();
	hiddeOverlay();
	bodyScroll();
	hide(modalEmptyCart);
	overlay.style.zIndex = '1';
};
btnCancelEmptyCart.onclick = () => {
	hiddeOverlay();
	bodyScroll();
	hide(modalEmptyCart);
	overlay.style.zIndex = '1';
};
/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                             CHECKOUT
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

/**    Algoritmo
 * 1- Seleccionar todos los elementos
 * 2- Crear funcionalidad de abrir y cerrar Menu Checkout
 * 3- Crear funcionalidad de Descuentos y Recargos para 
 * calcular el total de la compra
 */
const btnOpenCheckout = document.querySelector('.btn-buy');
const btnFinishBuy = document.querySelector('.btn-finish-buy');
const btnCancelBuy = document.querySelector('.btn-cancel-buy');
const menuCheckout = document.querySelector('.menu-checkout');

/******************💛💛💛 2- ABRIR Y CERRAR CHECKOUT 💛💛💛***************/

const showCheckout = () => {
  show(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', false)
  overlay.style.zIndex = 4
};

const hiddeCheckout = () => {
  hide(menuCheckout);
  menuCheckout.setAttribute('aria-hidden', true)
};

btnOpenCheckout.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '3';
	bodyNoScroll();
	showCheckout();
	getTotal();
};

btnFinishBuy.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
  bodyScroll();
  resetCounterCart();
	resetPriceToSubtotal();
  hideAllProductsOnCart();
  resetOptionsPay()
	hiddeCheckout();
	hiddeCart();
};

btnCancelBuy.onclick = () => {
	hiddeOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hiddeCheckout();
	hiddeCart();
};

/******************💛💛💛 3- CALCULAR PRECIO TOTAL DEL CHECKOUT 💛💛💛***************/
const allPayOptions = document.querySelectorAll('.pay-option');
// checkboxes
const cashOption = document.querySelector('#cash-debit');
const creditOption = document.querySelector('#credit');
const deliveryOption = document.querySelector('#delivery');
const discountOption = document.querySelector('#discount');
// output values span
const cartTaxValue = document.querySelector('.cart-tax-value');
const discountValue = document.querySelector('.cart-discount-value');
const deliveryValue = document.querySelector('.cart-delivery-value');
const cartTotalValue = document.querySelector('.cart-total-value');

//parrrafos
const cartTax = document.querySelector('.cart-tax');
const discount = document.querySelector('.cart-discount');
const delivery = document.querySelector('.cart-delivery');


let cartTaxValueCalculated = 0;
let deliveryPrice = 0;
let discountCalculated = 0;
let cartTotalValueCalculated;
cartTotalValue.textContent = subtotalProductsAdded;

const getCartTax = () => {
	cartTaxValueCalculated = subtotalProductsAdded * 0.1;
};

const addDeliveryPrice = () => {
	deliveryPrice = 50;
};

const getDiscount = () => {
	discountCalculated = -subtotalProductsAdded * 0.1;
};

getTotal = () => {
	if (creditOption.checked) {
		getCartTax();
		show(cartTax);
	} else {
		cartTaxValueCalculated = 0;
		hide(cartTax);
	}
	if (deliveryOption.checked) {
		addDeliveryPrice();
		show(delivery);
	} else {
		deliveryPrice = 0;
		hide(delivery);
	}
	if (discountOption.checked) {
		getDiscount();
		show(discount);
	} else {
		discountCalculated = 0;
		hide(discount);
	}

	// Mostrar en pantalla
	cartTaxValue.textContent = cartTaxValueCalculated.toFixed(2);
	deliveryValue.textContent = deliveryPrice.toFixed(2);
	discountValue.textContent = discountCalculated.toFixed(2);

	totalValueCalculated = subtotalProductsAdded + deliveryPrice + discountCalculated + cartTaxValueCalculated;
	cartTotalValue.textContent = totalValueCalculated.toFixed(2);
};
// inicializa calculo de precio total
for (let payOption of allPayOptions) {
	payOption.onclick = () => {
		getTotal();
	};
}

const resetOptionsPay = () => {
 cashOption.checked = true
 creditOption.checked = false 
 deliveryOption.checked = false
 discountOption.checked = false
}