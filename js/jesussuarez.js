const contenedorPersonajes = document.getElementById('personajes');
let personajes = [];
document.getElementById('pagina-1').addEventListener('click', () => mostrarPagina(0));
document.getElementById('pagina-2').addEventListener('click', () => mostrarPagina(1));
document.getElementById('pagina-3').addEventListener('click', () => mostrarPagina(2));



fetch("https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json")
    .then(res => res.json())
    .then(data => {
        personajes = data.personajes;
        mostrarPagina(0);
    });

function mostrarPagina(pagina) {
    const primerPersonaje = pagina * 6;
    const ultimoPersonaje = primerPersonaje + 6;
    const paginaPersonajes = personajes.slice(primerPersonaje, ultimoPersonaje);

    contenedorPersonajes.innerHTML = "";

    paginaPersonajes.forEach(personaje => {
        const contenedorPersonaje = document.createElement('div');
        contenedorPersonaje.classList.add("personaje");

        const imagenPersonaje = document.createElement("iframe");
        imagenPersonaje.src = convertirURL(personaje.imagen);
        imagenPersonaje.alt = "foto-personaje";

        const nombre = document.createElement("p");
        nombre.textContent = personaje.nombre;

        const aldea = document.createElement("p");
        aldea.textContent = personaje.aldea;

        contenedorPersonaje.addEventListener('click', () => {
            window.location.href = `jesussuarez-personaje.html?id=${personaje.id}`; // Redirige a la página deseada
        });
        contenedorPersonaje.appendChild(imagenPersonaje);
        contenedorPersonaje.appendChild(nombre);
        contenedorPersonaje.appendChild(aldea);

        contenedorPersonajes.appendChild(contenedorPersonaje);
    });

    function convertirURL(url) { // LA URL DE GOOGLE DRIVE NO ME ESTA CARGANDO, POR LO QUE ME OBLIGA A CONVERTIRLA A LA URL PREVIEW DEL ARCHIVO

        const id = url.split("id=")[1];
        return `https://drive.google.com/file/d/${id}/preview`;
    }

}

