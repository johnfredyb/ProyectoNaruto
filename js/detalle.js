// JavaScript para la página de detalles del personaje - Diego Granados

// URL del JSON a consumir
const apiUrl =
  "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json";

// Elementos del DOM
const detallePersonaje = document.getElementById("detalle-personaje");
const cargandoElemento = document.getElementById("cargando");

// Función para obtener parámetros de la URL
function obtenerParametroUrl(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

// Función para cargar los datos del personaje seleccionado
async function cargarDetallePersonaje() {
  try {
    // Mostrar mensaje de carga
    cargandoElemento.style.display = "block";

    // Obtener el ID del personaje de la URL
    const personajeId = obtenerParametroUrl("id");

    // Verificar si se proporcionó un ID
    if (!personajeId) {
      throw new Error("No se especificó un ID de personaje");
    }

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

    // Buscar el personaje por ID
    const personaje = datos.personajes.find(
      (p) => p.id === parseInt(personajeId)
    );

    // Verificar si se encontró el personaje
    if (!personaje) {
      throw new Error(`No se encontró un personaje con el ID: ${personajeId}`);
    }

    // Ocultar mensaje de carga
    cargandoElemento.style.display = "none";

    // Mostrar los detalles del personaje
    mostrarDetallePersonaje(personaje);

    // Actualizar el título de la página
    document.title = `${personaje.nombre} - Naruto API`;
  } catch (error) {
    console.error("Error:", error);
    cargandoElemento.textContent = `Error: ${error.message}`;
    cargandoElemento.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
  }
}

// Función para mostrar los detalles del personaje
function mostrarDetallePersonaje(personaje) {
  // Crear elemento contenedor para los detalles
  detallePersonaje.innerHTML = `
    <div class="detalle-header">
      <img src="${personaje.imagen}" alt="${
    personaje.nombre
  }" onerror="this.src='img/silueta Naruto.png'">
      <h1 class="detalle-nombre">${personaje.nombre}</h1>
    </div>
    <div class="detalle-info">
      <h3>Información</h3>
      <p><strong>Aldea:</strong> ${personaje.aldea}</p>
      <p><strong>Rango:</strong> ${personaje.rango}</p>
      
      <h3>Jutsus</h3>
      <ul class="jutsus-lista">
        ${personaje.jutsus.map((jutsu) => `<li>${jutsu}</li>`).join("")}
      </ul>
      
      ${
        personaje.url
          ? `
        <h3>Más información</h3>
        <a href="${personaje.url}" target="_blank" class="enlace-perfil">Ver perfil oficial</a>
      `
          : ""
      }
    </div>
  `;
}

// Iniciar la carga de los detalles cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", cargarDetallePersonaje);
