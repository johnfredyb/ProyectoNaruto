document.addEventListener('DOMContentLoaded', cargarDetallePersonaje);

async function cargarDetallePersonaje() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
      document.body.innerHTML = "<p>No se especificó un personaje.</p>";
      return;
    }

    const res = await fetch('../personajes.json');
    const data = await res.json();

    const personajes = data.personajes;

    const personaje = personajes.find(p => p.id === Number(id));

    if (!personaje) {
      document.body.innerHTML = "<p>Personaje no encontrado.</p>";
      return;
    }

    mostrarPersonaje(personaje);

  } catch (error) {
    console.error('Error al cargar los datos:', error);
    document.body.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  }
}

function mostrarPersonaje(personaje) {
  const contenedor = document.createElement('div');

  const nombre = document.createElement('h1');
  nombre.textContent = personaje.nombre;
  contenedor.appendChild(nombre);

  const imagen = document.createElement('img');
  imagen.src = personaje.imagen;
  imagen.alt = personaje.nombre;
  contenedor.appendChild(imagen);

  const lista = document.createElement('ul');

  if(personaje.aldea) {
    const liAldea = document.createElement('li');
    liAldea.innerHTML = `<strong>Aldea:</strong> ${personaje.aldea}`;
    lista.appendChild(liAldea);
  }

  if(personaje.rango) {
    const liRango = document.createElement('li');
    liRango.innerHTML = `<strong>Rango:</strong> ${personaje.rango}`;
    lista.appendChild(liRango);
  }

  if(Array.isArray(personaje.jutsus)) {
    const liJutsus = document.createElement('li');
    liJutsus.innerHTML = `<strong>Jutsus:</strong> ${personaje.jutsus.join(', ')}`;
    lista.appendChild(liJutsus);
  }

  if(personaje.url) {
    const liUrl = document.createElement('li');
    const enlace = document.createElement('a');
    enlace.href = personaje.url;
    enlace.textContent = "Más información";
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    liUrl.appendChild(enlace);
    lista.appendChild(liUrl);
  }

  contenedor.appendChild(lista);
  document.body.appendChild(contenedor);
}
