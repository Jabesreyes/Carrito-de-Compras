//funcion para obtener los productos de la API y los guarda en una variable
let products = [];
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products); // muestra todos los productos al cargar la pagina
  })
  .catch(error => console.error(error));


// Funcion para mostrar los productos
function displayProducts(products) {
  let output = '';
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
  document.getElementById('product-list').innerHTML = output;

  // agrega un evento de clic a cada producto
  document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', function() {
      let index = this.dataset.index;
      showProductDetails(products[index]);
    });
  });
}

// Funcion para mostrar los detalles del producto en el modal
function showProductDetails(product) {
  let modalBody = document.getElementById('productModalBody');
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
  let productModal = new bootstrap.Modal(document.getElementById('productModal'));
  productModal.show();
}



// funcion para filtrar los productos por categoria
function filterProducts(category) {
  let filteredProducts = products.filter(product => product.category === category);
  displayProducts(filteredProducts);
}

// agrega los event listeners a los botones
document.querySelectorAll('.btn-products').forEach(btn => {
  btn.addEventListener('click', function (event) {
    let category;
    switch (event.target.innerText) {
      case 'Joyas':
        category = 'jewelery';
        break;
      case 'Hombres':
        category = "men's clothing";
        break;
      case 'Mujeres':
        category = "women's clothing";
        break;
      case 'Tecnología':
        category = 'electronics';
        break;
    }
    filterProducts(category);
  });
});

