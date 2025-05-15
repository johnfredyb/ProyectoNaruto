// JavaScript para la galería de personajes de Naruto - Diego Granados

// URL del JSON a consumir
const apiUrl =
  "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json";

// Elementos del DOM
const galeriaPersonajes = document.getElementById("galeria-personajes");
const cargandoElemento = document.getElementById("cargando");

// Función para cargar los datos de la API
async function cargarPersonajes() {
  try {
    // Mostrar mensaje de carga
    cargandoElemento.style.display = "block";

    // Realizar la petición fetch al JSON
    const respuesta = await fetch(apiUrl);

    // Verificar si la respuesta es correcta
    if (!respuesta.ok) {
      throw new Error(`Error al cargar los datos: ${respuesta.status}`);
    }

    // Convertir la respuesta a JSON
    const datos = await respuesta.json();

    // Verificar si existen personajes en los datos
    if (!datos.personajes || !Array.isArray(datos.personajes)) {
      throw new Error("El formato de los datos no es el esperado");
    }

    // Ocultar mensaje de carga
    cargandoElemento.style.display = "none";

    // Mostrar los personajes en la galería
    mostrarPersonajes(datos.personajes);
  } catch (error) {
    console.error("Error:", error);
    cargandoElemento.textContent = `Error al cargar los personajes: ${error.message}`;
    cargandoElemento.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
  }
}

// Función para crear y mostrar las tarjetas de personajes
function mostrarPersonajes(personajes) {
  // Limpiar contenedor de galería
  galeriaPersonajes.innerHTML = "";

  // Crear una tarjeta para cada personaje
  personajes.forEach((personaje) => {
    // Crear tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-personaje";

    // Generar contenido HTML de la tarjeta
    tarjeta.innerHTML = `
      <div class="imagen-contenedor">
        <img src="${personaje.imagen}" alt="${personaje.nombre}" onerror="this.src='img/silueta Naruto.png'">
      </div>
      <div class="info-personaje">
        <h3>${personaje.nombre}</h3>
        <p><strong>Aldea:</strong> ${personaje.aldea}</p>
        <p><strong>Rango:</strong> ${personaje.rango}</p>
        <a href="detalleGranados.html?id=${personaje.id}" class="btn-detalles">Ver detalles</a>
      </div>
    `;

    // Agregar tarjeta a la galería
    galeriaPersonajes.appendChild(tarjeta);
  });
}

// Iniciar la carga de personajes cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", cargarPersonajes);
