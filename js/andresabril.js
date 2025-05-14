document.addEventListener("DOMContentLoaded", function () {
  const galeria = document.getElementById("galeria-personajes");

  async function obtenerPersonajes() {
    try {
      const respuesta = await fetch(
        "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json"
      );
      const datos = await respuesta.json();
      mostrarPersonajes(datos.personajes);
    } catch (error) {
      console.error("Error al obtener los personajes:", error);
      galeria.innerHTML =
        "<p>Error al cargar los personajes. Por favor, intenta nuevamente más tarde.</p>";
    }
  }

  function mostrarPersonajes(personajes) {
    galeria.innerHTML = "";

    personajes.forEach((personaje) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-personaje";
      let imageUrl;
      try {
        const driveId =
          personaje.imagen.match(/id=([^&]+)/)?.[1] ||
          personaje.imagen.match(/\/file\/d\/([^\/]+)/)?.[1];
        imageUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`;
      } catch (e) {
        console.error("Error procesando imagen:", e);o
      }

      tarjeta.innerHTML = `
        <img src="${imageUrl}" alt="${personaje.nombre}" loading="lazy" 
             onerror="this.src='img/silueta Naruto.png'">
        <h3>${personaje.nombre}</h3>
        <p><strong>Aldea:</strong> ${personaje.aldea}</p>
        <p><strong>Rango:</strong> ${personaje.rango}</p>
        <a href="andresabril-detalle.html?id=${personaje.id}"><button>Ver detalles</button></a>
      `;

      galeria.appendChild(tarjeta);
    });
  }

  obtenerPersonajes();
});
