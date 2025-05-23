document.addEventListener("DOMContentLoaded", function () {
  const detalleContainer = document.getElementById("detalle-personaje");

  const urlParams = new URLSearchParams(window.location.search);
  const personajeId = urlParams.get("id");

  async function obtenerDetallePersonaje() {
    try {
      const respuesta = await fetch(
        "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json"
      );
      const datos = await respuesta.json();
      const personaje = datos.personajes.find((p) => p.id == personajeId);

      if (personaje) {
        mostrarDetallePersonaje(personaje);
      } else {
        detalleContainer.innerHTML = "<p>Personaje no encontrado.</p>";
      }
    } catch (error) {
      console.error("Error al obtener el detalle del personaje:", error);
      detalleContainer.innerHTML =
        "<p>Error al cargar los detalles del personaje. Por favor, intenta nuevamente más tarde.</p>";
    }
  }

  function mostrarDetallePersonaje(personaje) {
    let imageUrl;
    try {
      const driveId =
        personaje.imagen.match(/id=([^&]+)/)?.[1] ||
        personaje.imagen.match(/\/file\/d\/([^\/]+)/)?.[1];
      imageUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w800`;
    } catch (e) {
      console.error("Error procesando imagen:", e);
    }

    detalleContainer.innerHTML = `
      <div class="detalle-personaje">
        <img src="${imageUrl}" alt="${personaje.nombre}" 
             onerror="this.src='img/silueta Naruto.png'">
        <div class="detalle-info">
          <h2>${personaje.nombre}</h2>
          <p><strong>Aldea:</strong> ${personaje.aldea}</p>
          <p><strong>Rango:</strong> ${personaje.rango}</p>
          
          <h3>Jutsus:</h3>
          <ul>
            ${personaje.jutsus.map((jutsu) => `<li>${jutsu}</li>`).join("")}
          </ul>
          
          ${
            personaje.url
              ? `<a href="${personaje.url}" target="_blank">Más información oficial</a>`
              : ""
          }
          <a href="andresabril.html">Volver a la galería</a>
        </div>
      </div>
    `;
  }

  if (personajeId) {
    obtenerDetallePersonaje();
  } else {
    detalleContainer.innerHTML = "<p>No se ha especificado un personaje.</p>";
  }
});
