//funcion para obtener los productos de la API y los guarda en una variable
let products = [];
fetch("productos.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products); // muestra todos los productos al cargar la pagina
  })
  .catch((error) => console.error(error));

//Array de listado de productos en carrito
let carrito = [];

// Funcion para mostrar los productos
function displayProducts(products) {
  let output = "";
  products.forEach((product, index) => {
    output += `
      <div class="col-lg-4 col-md-6 mb-4 product" data-index="${index}">
          <div class="card h-100">
              <img class="card-img-top mx-auto" src="${product.image}" style="height: 200px; width: 175px;" alt="${product.title}">
              <div class="card-body">
                  <h4 class="card-title">${product.title}</h4>
                  <p class="card-text">${product.description}</p>
                  <h5>$${product.price}</h5>
              </div>
          </div>
      </div>
    `;
  });
  document.getElementById("product-list").innerHTML = output;

  // agrega un evento de clic a cada producto
  document.querySelectorAll(".product").forEach((product) => {
    product.addEventListener("click", function () {
      let index = this.dataset.index;
      showProductDetails(products[index]);
    });
  });
}

// Funcion para mostrar los detalles del producto en el modal
function showProductDetails(product) {
  let modalBody = document.getElementById("productModalBody");
  modalBody.innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <img src="${product.image}" style="height: 200px; width: 175px;" alt="${product.title}">
    </div>
    <h2>${product.title}</h2>
    <p>${product.description}</p>
    <p>Precio: $${product.price}</p>
    <p>Categoría: ${product.category}</p>
    <p>Stock: ${product.stock}</p>
  `;
  let productModal = new bootstrap.Modal(
    document.getElementById("productModal")
  );
  productModal.show();
  productoSeleccionado = product;
}

// funcion para filtrar los productos por categoria
function filterProducts(category) {
  let filteredProducts = products.filter(
    (product) => product.category === category
  );
  displayProducts(filteredProducts);
}

// agrega los event listeners a los botones
document.querySelectorAll(".btn-products").forEach((btn) => {
  btn.addEventListener("click", function (event) {
    let category;
    switch (event.target.innerText) {
      case "Joyas":
        category = "jewelery";
        break;
      case "Hombres":
        category = "men's clothing";
        break;
      case "Mujeres":
        category = "women's clothing";
        break;
      case "Tecnología":
        category = "electronics";
        break;
    }
    filterProducts(category);
  });
});

// Obtener el botón del carrito de compras y los botones dentro del modal
var carritoDeComprasBoton = document.getElementById("carritoDeComprasBoton");
var carritoModal = document.getElementById("carritoModal");
var botonCancelarModal = document.getElementById(
  "cancelarCarritoDeComprasModal"
);
var botonCerrarModal = document.getElementById("cerrarModal");

//Mostrar el modal de carrito de compras
carritoDeComprasBoton.addEventListener("click", function () {
  carritoModal.style.display = "block";
});

//Cerrar el modal de carrito de compras desde CANCELAR
botonCancelarModal.addEventListener("click", function () {
  carritoModal.style.display = "none";
});

//Cerrar el modal del carrito de compras desde CERRAR
botonCerrarModal.addEventListener("click", function () {
  carritoModal.style.display = "none";
});

// Función para actualizar la vista del carrito
function actualizarVistaCarrito() {
  let carritoModalBody = document.querySelector("#carritoModal .modal-body");
  let total = 0;
  let carritoHTML = '<ul class="list-group">';
  carrito.forEach((producto) => {
    carritoHTML += `<li class="list-group-item">${producto.title} - Precio: $${producto.price}</li>`;
    total += producto.price;
  });
  carritoHTML += `</ul><p class="mt-3">Total a Pagar: $${total.toFixed(2)}</p>`;
  carritoModalBody.innerHTML = carritoHTML;
}

// Función para agregar producto al carrito
function agregarAlCarrito() {
  let cantidadProducto = document.getElementById("quantity");
  let cantidad = parseInt(cantidadProducto.value);
  if (productoSeleccionado.stock >= cantidad && cantidad > 0) {
    for (let i = 0; i < cantidad; i++) {
      carrito.push(productoSeleccionado);
      productoSeleccionado.stock--; //Restarle al stock lo agregado al carrito
    }
    actualizarVistaCarrito();
  } else {
    alert("No hay suficiente stock disponible.");
  }
}

//Función para eliminar producto del carrito
function eliminarDelCarrito() {
  let cantidadProducto = document.getElementById("quantity");
  let cantidad = parseInt(cantidadProducto.value);
  if (cantidad > 0) {
    let index = carrito.findIndex(
      (producto) => producto === productoSeleccionado
    );
    if (index !== -1) {
      if (cantidad <= carrito[index].stock) {
        for (let i = 0; i < cantidad; i++) {
          //Eliminar la cantidad deseada
          carrito.splice(index, 1);
        }
        productoSeleccionado.stock += cantidad; //sumarle al stock lo elimnado del carrito
        actualizarVistaCarrito();
      } else {
        alert(
          "La cantidad ingresada es mayor que la cantidad del producto en el carrito"
        );
      }
    } else {
      alert("Este producto no está en el carrito");
    }
  } else {
    alert("La cantidad debe ser mayor que cero");
  }
}

//Agregar evento de agregar al botón en el modal de detalles del producto
document
  .querySelector("#agregarAlCarritoBtn")
  .addEventListener("click", function () {
    agregarAlCarrito(productoSeleccionado);
  });
//Agregar evento de eliminar al botón en el modal de detalles del producto
document
  .querySelector("#quitarDelCarritoBtn")
  .addEventListener("click", function () {
    eliminarDelCarrito(productoSeleccionado);
  });
