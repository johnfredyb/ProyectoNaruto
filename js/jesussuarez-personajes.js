let urlParams = new URLSearchParams(window.location.search);
let id = parseInt(urlParams.get('id'));

console.log(id);

fetch("https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json")
    .then(res => res.json())
    .then(data => {
        const personaje = data.personajes.find(personaje => personaje.id === id);
        const contenedorPresentacion = document.getElementById('presentacion');
        const contenedorDatos = document.getElementById('datos');
        const contenedorJutsus = document.getElementById('jutsus');

        const imagenPersonaje = document.createElement("iframe");
        imagenPersonaje.src = convertirURL(personaje.imagen);
        imagenPersonaje.alt = "foto-personaje";

        const nombre = document.createElement("a");
        nombre.textContent = personaje.nombre.split(" ")[0];
        nombre.href = personaje.url;

        contenedorPresentacion.appendChild(imagenPersonaje);
        contenedorPresentacion.appendChild(nombre);


        const hNombre = document.createElement("h1");
        hNombre.textContent = "NOMBRE COMPLETO";
        const nombreCompleto = document.createElement("p");
        nombreCompleto.textContent = personaje.nombre;

        const hAldea = document.createElement("h1");
        hAldea.textContent = "ALDEA";
        const aldea = document.createElement("p");
        aldea.textContent = personaje.aldea;

        const hRango = document.createElement("h1");
        hRango.textContent = "RANGO";
        const rango = document.createElement("p");
        rango.textContent = personaje.rango;

        contenedorDatos.appendChild(hNombre);
        contenedorDatos.appendChild(nombreCompleto);
        contenedorDatos.appendChild(hAldea);
        contenedorDatos.appendChild(aldea);
        contenedorDatos.appendChild(hRango);
        contenedorDatos.appendChild(rango);

        const ul = document.createElement("ul");

        personaje.jutsus.forEach((jutsu) => {
            const li = document.createElement("li");
            li.textContent = jutsu;
            ul.appendChild(li);
        });

        contenedorJutsus.appendChild(ul);







        function convertirURL(url) { // LA URL DE GOOGLE DRIVE NO ME ESTA CARGANDO, POR LO QUE ME OBLIGA A CONVERTIRLA A LA URL PREVIEW DEL ARCHIVO

            const id = url.split("id=")[1];
            return `https://drive.google.com/file/d/${id}/preview`;
        }

    });