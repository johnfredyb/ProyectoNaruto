const character = document.getElementById("characters");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const url = "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json";

async function cargarPersonajes() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    for (let char of data.personajes) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
        <img src="${char.imagen}" alt="${char.nombre}">
        <h2>${char.nombre}</h2>
        <a href="detalleWilliam.html?id=${char.id}" class="details-link">Ver Detalles</a>
      `;
      character.appendChild(div);
    }
  } catch (error) {
    console.error("Error al cargar los personajes:", error);
    character.innerHTML = "<p>Error al cargar los personajes.</p>";
  }
}

// Ejecutar la función
cargarPersonajes();
