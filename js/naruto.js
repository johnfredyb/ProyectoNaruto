const url = "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto2.json";

const galeria = document.getElementById("contenedor-personajes");
const inputBusqueda = document.getElementById("busqueda");
let personajes2 = [];

function mostrarPersonajes(personajes) {
    galeria.innerHTML = "";
    personajes.forEach((personaje) => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const imagen = document.createElement("img");
        imagen.src = personaje.imagen;
        imagen.alt = personaje.nombre;

        const nombre = document.createElement("p");
        nombre.textContent = personaje.nombre;

        const aldea = document.createElement("p");
        aldea.textContent = `Aldea: ${personaje.aldea}`;

        const rango = document.createElement("p");
        rango.textContent = `Rango: ${personaje.rango}`;

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(nombre);
        tarjeta.appendChild(aldea);
        tarjeta.appendChild(rango);

        galeria.appendChild(tarjeta);

    });
}

fetch(url)
    .then((response) => response.json())
    .then((data) => {

        personajes2 = data.personajes;
        mostrarPersonajes(personajes2);

    })
    .catch((e) => {
        console.log("error", e);
    });

inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();
    const comoquiera = personajes2.filter((perosnaje) => perosnaje.nombre.toLowerCase().includes(texto)
        );
console.log(texto + " - valortexto ");
console.log(comoquiera + " - comoquiera ");
mostrarPersonajes(comoquiera);
  } );
