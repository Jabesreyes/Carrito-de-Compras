//funcion para obtener los productos de la API y los guarda en una variable
let products = [];
fetch('https://fakestoreapi.com/products')
  .then(response => response.json()) // convierte la respuesta en JSON
  .then(data => {
    products = data;
    displayProducts(products); // muestra todos los productos al cargar la pagina
  })
  .catch(error => console.error(error)); 


// Función para mostrar los productos
function displayProducts(products) {
  let output = '';
  products.forEach(product => {
    // para cada producto crea un bloque de HTML y lo inserta en la pagina
    output += `
          <div class="col-lg-4 col-md-6 mb-4">
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

