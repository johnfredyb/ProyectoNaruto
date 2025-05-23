const URL_IMAGES = 'https://res.cloudinary.com/dnjs1yx7m/image/upload/';

const getNameImage = (personaje_id) => `${URL_IMAGES + personaje_id}.webp`;
const getCoverImage = (personaje_id) => `${URL_IMAGES}/c_${personaje_id}.jpg`;
const getPersonage = (personaje_id) => `${URL_IMAGES}/p_${personaje_id}.png`;
function redirigir(personaje_id) {
    window.location.href = `personaje.html?id=${personaje_id}`
}

const generateHtml2 = (id) => `
    <a id="${id}" onclick=redirigir(${id}) alt="Mythrill" target="_blank">
      <div class="card">
        <div class="wrapper">
          <img src="${getCoverImage(id)}" class="cover-image" />
        </div>
        <img src="${getNameImage(id)}" class="title" />
        <img src="${getPersonage(id)}" class="character" />
      </div>
    </a>
`;

function crearTarjeta(personaje) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card';

    tarjeta.innerHTML = generateHtml2(personaje.id);

    return tarjeta;
}

async function cargarPersonajes() {
    try {
        const respuesta = await fetch('https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto.json');
        const data = await respuesta.json();

        const personajes = data.personajes;
        const contenedor = document.getElementById('personajes');

        personajes.forEach(personaje => {
            const tarjeta = crearTarjeta(personaje);
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error('Error al cargar los personajes:', error);
        const contenedor = document.getElementById('personajes');
        contenedor.innerHTML = '<p style="color:red;">No se pudieron cargar los personajes. Intenta de nuevo más tarde.</p>';
    }
}

cargarPersonajes();


