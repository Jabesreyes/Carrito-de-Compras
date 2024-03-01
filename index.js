





   // PRODUCTOS-TAB


function openmodal(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
// URL de los archivos JSON
const productosUrl = 'productos.json';

// Función para cargar los archivos JSON
async function cargarArchivoJson(url) {
  const respuesta = await fetch(url);
  return await respuesta.json();
}

// Función principal para cargar los datos
async function cargarDatos() {

  // Cargar datos de productos
  const productosData = await cargarArchivoJson(productosUrl);
  console.log("Datos de productos:");
  console.log(productosData);

  // Función para mostrar productos según el filtro
  function mostrarProductos(productos) {
    const datosProductosDiv = document.getElementById('datosProductos');
    datosProductosDiv.innerHTML = "<h2>Datos de Productos</h2>";
    productos.forEach(producto => {
      const productoInfo = document.createElement('div');
      productoInfo.innerHTML = `
      <img src="${producto.image}" alt="Imagen de ${producto.nombre}">
        <p>nombre: ${producto.title}</p>
        <p>Precio: ${producto.price}</p>
        <p>Stock: ${producto.stock}</p>

        <p>Descripcion: ${producto.description}</p>
        <button class="btn btn-primary">Agregar al carrito</button>

        <button class="btn btn-primary" type="button" id="menos" onclick="javascript: compramenos()">+</button>
        <input  type="text" style="text-align: center;" value="1" size="4">
        <button class="btn btn-primary" type="button" id="menos" onclick="javascript: compramenos()">-</button>


      `;
      datosProductosDiv.appendChild(productoInfo);
    });
  }

  // Mostrar todos los productos al cargar la página
  mostrarProductos(productosData);

  // Filtrar productos con ID 20
  document.getElementById('mostrarTodosBtn').addEventListener('click', function() {
    const productosFiltrados20 = productosData.filter(producto => producto.category === 20 );

    mostrarProductos(productosFiltrados20);
  });

  document.getElementById('filtrarPrecioBtn').addEventListener('click', function() {
    // Filtrar productos con ID 10
    const productosFiltrados = productosData.filter(producto => producto.category === 10 );
    mostrarProductos(productosFiltrados);
  });

  document.getElementById('mostrarid30').addEventListener('click', function() {
    const productosFiltrados30 = productosData.filter(producto => producto.category === 30 );

    mostrarProductos(productosFiltrados30);
  });



}

// Llamar a la función para cargar los datos
cargarDatos();

