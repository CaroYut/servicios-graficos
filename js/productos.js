let productos = []; 

const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];


fetch("./js/productos.json")
 .then (response => response.json()) 
 .then (data => {
  productos = data;
  cargarProductos (productos);
  })    


    
   const contenedorProductos = document.querySelector ("#contenedor-productos");
   const botonesCategorias = document.querySelectorAll (".boton-categoria");
   const tituloPrincipal = document.querySelector ("#titulo-principal");
   let botonesAgregar = document.querySelectorAll (".producto-agregar");
   const numerito = document.querySelector ("#numerito");
    
    
function actualizarNumerito () {
  let nuevoNumerito = productosEnCarrito.reduce ((acc,producto) => 
  acc + producto.cantidad, 0);
  numerito.innerText = nuevoNumerito;

}
actualizarNumerito ();

botonesCategorias.forEach(boton => boton.addEventListener ("click",() => {
  aside.classList.remove("aside-visible");
}))


/* CARDS */
    function cargarProductos (productosElegidos) {
    
    contenedorProductos.innerHTML = "";
     
      productosElegidos.forEach (producto => {
  
       const div = document.createElement ("div");
       div.classList.add ("producto");
       div.innerHTML =  `
         <img class="producto-imagen" src=${producto.imagen} alt="${producto.titulo}">	
         <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio"> $ ${producto.precio} </p>
                <button class="producto-agregar" id="${producto.id}"> Agregar </button>
          </div> 
       `;
      contenedorProductos.append (div);
      })
      
      actualizarBotonesAgregar ();
    }

 /*BOTONES DEL COSTADO*/     
     botonesCategorias.forEach (boton => {
       boton.addEventListener ("click", (e) => {      
       botonesCategorias.forEach (boton => boton.classList.remove ("active"));
       e.currentTarget.classList.add ("active"); 

       
       if (e.currentTarget.id != "todos") {
        const productoCategoria = productos.find (producto => producto.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.categoria.nombre;
       const productosBoton = productos.filter (producto => producto.categoria.id === e.currentTarget.id);
       cargarProductos(productosBoton);
       } else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos (productos);
       }
      
      })
    });
    
    /* ACTUALIZAR BOTON */
    function actualizarBotonesAgregar () {
     botonesAgregar = document.querySelectorAll (".producto-agregar"); 

     botonesAgregar.forEach ( boton => {
      boton.addEventListener ("click", agregarAlCarrito);
     });
    }

 /*CARRITO*/

 
 
    function agregarAlCarrito (e) {

      Toastify({
        text: "PRODUCTO AGREGADO",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,#00b09b, #96c93d )",
        },
        onClick: function(){} // Callback after click
      }).showToast();

const idBoton = parseInt(e.currentTarget.id);
const productoAgregado = productos.find (producto => producto.id === idBoton);
const productoAlCarrito = {...productoAgregado, cantidad: 1}
const existe = productosEnCarrito.some ((producto) => producto.id === idBoton)

if (existe) {
 const index = productosEnCarrito.findIndex ((producto) => producto.id === idBoton);
productosEnCarrito[index].cantidad++;
} else {

  productosEnCarrito.push (productoAlCarrito);
}
actualizarNumerito ();
console.log(productosEnCarrito);
localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}













