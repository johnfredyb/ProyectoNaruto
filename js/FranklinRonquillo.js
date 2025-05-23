const tarjetas = document.getElementById("tarjetas");

fetch("https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json")
  .then((response) => response.json())
  .then((data) => {
    data.personajes.forEach((personaje) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const imagen = document.createElement("img");
      imagen.src =
        "https://drive.usercontent.google.com/download?id=14eW62jBYv3gixXFIPEKD-vZhf-8agTxg&authuser=1";

      const nombre = document.createElement("h3");
      nombre.textContent = personaje.nombre;

      const aldea = document.createElement("p");
      aldea.textContent = `Aldea: ${personaje.aldea}`;

      const boton = document.createElement("button");
      boton.textContent = "Más Información";
      boton.onclick = () => {
        window.location.href = `FranklinRonquillo2.html?id=${personaje.id}`;
      };

      tarjeta.appendChild(imagen);
      tarjeta.appendChild(nombre);
      tarjeta.appendChild(aldea);
      tarjeta.appendChild(boton);

      tarjetas.appendChild(tarjeta);
    });
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const btnVolver = document.getElementById('volver');
    btnVolver.addEventListener('click', () => window.history.back());
});
