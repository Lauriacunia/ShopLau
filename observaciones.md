Querida Lau, 

Quiero felicitarte por tu excelente trabajo. Apenas me lo entregaste supe que estaba frente a un trabajo muy bien hecho, pero sólo ahora, mirando en profundidad tu código, veo realmente lo bien que está. Cumplís a la perfección todas las consignas, respetaste la estructura propuesta a la perfección y aun así el diseño se siente muy original. 

Ire comentando tu trabajo de acuerdo a las consignas propuestas, y al final dejare algunos comentarios sueltos sobre tu codigo en general. Como siempre, la idea es darte las herramientas para que tu trabajo quede mejor aun. 

### Accesibilidad

En general tu sitio es accesible. Utilizas correctamente las etiquetas semanticas, por lo que un lector de pantalla puede orientarse facilmente en tu web. Los colores y contrastes son en general adecuados y utilizas bien las etiquetas aria. Usas el atributo alt muy bien. 

Falta aclarar el "lang" del documento HTML, que es algo muy util para que el lector automatico sepa en que idioma leer la web. 

La decisión que no entiendo fue la de eliminar el outline de tus botones. Esto hace que tu web sea practicamente imposible de navegar con teclado, ya que es imposible saber en qué producto hemos hecho foco. *Nunca* debemos eliminar el outline que viene por defecto en botones, links o elementos de formulario, a menos que lo reemplacemos con otra cosa que reaccione al foco del usuario: no puedo insistir lo suficiente en este punto. Asi como esta, son poquisimas las ocasiones donde hay foco visible en tu web y la navegacion por teclado es imposible. 

### Filtros y búsqueda

Tus filtros funcionan a la perfeccion. No solo eso, sino que la reutilizacion en responsive es perfecta. Nada que comentar aqui: se nota que hiciste un trabajo enorme y que pusiste mucho esfuerzo en que quedaran perfectos. 

### Carrito

Tu carrito funciona muy bien, esta muy bien maquetado y cumple todos los requerimientos. El unico problema que veo es que al reducir la cantidad de un producto, el total aumenta en lugar de achicarse. Esto ocurre porque los eventos del carrito siempre asumen que el usuario esta aumentando la cantidad:

```js
	for (inputQty of allInputsProductQty) {
		inputQty.onchange = () => {
			addProductToTheCartList(inputQty);
		};
	}
};
```

Eso ocurre porque estas usando getAttribute en lugar de .value dentro de la funcion addProductToTheCartList. Con este cambio, ya vas a tener el verdadero numero del input:

```js
// esto es incorrecto
  let qty = inputQty.getAttribute('value');
  
  // esto es el valor real 
	console.log(inputQty.value)
```

Podes leer sobre eso aqui, https://javascript.info/dom-attributes-and-properties, en el apartado "Property-attribute synchronization". 

A partir de eso, espero que puedas seguir mejorando la funcion, pero cualquier cosa me escribis. 

### Checkout

Tus inputs en el form no tienen el atributo "required", por lo que el usuario puede completar la compra sin haber rellenado esos campos. 

Tu boton de "Finalizar" es un button con el type button, por lo que no envia el formulario. Deberia ser un type="submit". Esto tambien mejora la accesibilidad ya que el evento submit puede ser disparado con un enter. 


### Misc 

Tu HTML esta muy bien. Excelente la indentacion, claro, completo, con las etiquetas semanticas adecuadas. Tu CSS tambien esta muy prolijo y bien hecho, reutilizas bien los estilos y los nombres de clases son claros y descriptivos. Noto bastante dependencia del codigo de Ada para resolver algunas cosas que podrias haber hecho mas sencillas con las herramientas que vimos en clase (el ::before en el banner por ejemplo)

Otro detalle, pero en el que valdria la pena invertir, es que habria apreciado mas efectos de hover en botones e iconos como el que tiene el carrito, para mostrarle al usuario que habia mas opcion de acciones. Un cambio de color en el hover de un boton le comunica muy rapidamente al usuario que ahi hay una accion que vale la pena tomar. 

No es mi idea enfocarme en el responsive, aunque debo comentar que en general lo que resolviste lo hiciste muy bien. En todas tus resoluciones tu web se comporta correctamente. 

Lo que menciono a nivel general del JS es que la cantidad de comentarios y console log dificultan la lectura. Obviamente yo como docente no tengo problema, pero tene en cuenta que para trabajos entregados se espera que no haya ningun comentario a menos que realmente sirva al lector (por ejemplo, para aclarar de que seccion es el codigo o para aclarar el proposito de alguna funcion compleja), pero todos los demas comentarios que fuiste dejando para vos misma se deben borrar. Lo mismo los console.log. Estos detalles suman mucho a la hora de presentar codigo para entrevistas, asi que vale la pena invertir desde ahora en eso. 

Tenes muchos y muy buenos commits, y ni hablar de la calidad de tu README. Este es un trabajo del que estar muy orgullosa. 

### Nota 

En resumen, hiciste un enorme trabajo, con relativamente pocos problemas en el producto entregado y con una enorme atencion al detalle y la calidad. El mayor problema sin duda es la decision de borrar el outline de los botones, que arruina cualquier esfuerzo para hacer este sitio web accesible y que impide que podamos navegarlo con el teclado. 

Con respecto a los restantes factores de evaluación: 
❌ No cumplido
✔️ Puede mejorar
✅ Cumplido

✅ Respeta la consigna.
✅ Estructura correcta de documento HTML.
✅ Respeta el diseño dado.
✅ Respeta el funcionamiento.
✅ Responsive funciona correctamente.
✅ Buena estructura de proyecto.
✅ Código bien indentado.
✅ Comentarios que permiten mejorar la legibilidad del código.
✅ Uso correcto de etiquetas semánticas.
✅ Buenos nombres de clases.
✅ Buenos nombres de funciones y variables.
✅ Reutilización de estilos.
✅ Funciones pequeñas.
✅ Commits con mensajes adecuados.
❌ Cumple con las condiciones de accesibilidad avanzada.

NOTA FINAL: 9




