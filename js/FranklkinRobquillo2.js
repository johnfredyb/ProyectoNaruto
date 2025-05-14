document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("volver")
    .addEventListener("click", () => window.history.back());
});

const params = new URLSearchParams(window.location.search);
const personajeId = params.get("id");
const detalleContainer = document.getElementById("detalle");

fetch("https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json")
  .then((response) => response.json())
  .then((data) => {
    const personaje = data.personajes.find((p) => p.id == personajeId);

    if (personaje) {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const imagen = document.createElement("img");
      imagen.src = personaje.imagen;
      imagen.alt = personaje.nombre;

      const nombre = document.createElement("h2");
      nombre.classList.add("nombre");
      nombre.textContent = personaje.nombre;

      const aldea = document.createElement("p");
      aldea.textContent = `Aldea: ${personaje.aldea}`;

      const rango = document.createElement("p");
      rango.textContent = `Rango: ${personaje.rango}`;

      const jutsusTitle = document.createElement("p");
      jutsusTitle.textContent = "Jutsus:";

      const jutsusList = document.createElement("ul");
      const jutsusArray = Array.isArray(personaje.jutsus)
        ? personaje.jutsus
        : [personaje.jutsus];
      jutsusArray.forEach((jutsu) => {
        const li = document.createElement("li");
        li.textContent = jutsu;
        jutsusList.appendChild(li);
      });

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(aldea);
      tarjeta.appendChild(rango);
      tarjeta.appendChild(jutsusTitle);
      tarjeta.appendChild(jutsusList);

      detalleContainer.appendChild(tarjeta);
    } else {
      detalleContainer.innerHTML = "<p>Personaje no encontrado.</p>";
    }
  })
  .catch((error) => console.error("Error al cargar los detalles:", error));
