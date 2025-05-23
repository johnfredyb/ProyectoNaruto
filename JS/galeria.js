// Ruta al archivo JSON local
const API_URL = '../personajes.json';

// Elementos del DOM
const galeriaContainer = document.getElementById('galeria-personajes');

// Función para cargar los personajes desde el archivo JSON local
async function cargarPersonajes() {
    try {
        console.log('Intentando cargar personajes desde:', API_URL);
        const response = await fetch(API_URL);
        console.log('Estado de la respuesta:', response.status);
        
        if (!response.ok) {
            throw new Error(`No se pudo obtener los datos. Estado: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        mostrarPersonajes(data);
    } catch (error) {
        console.error('Error al cargar los personajes:', error);
    }
}

// Función para mostrar los personajes en la galería
function mostrarPersonajes(data) {
    galeriaContainer.innerHTML = '';
    
    // Acceder al array de personajes dentro del objeto data
    const personajes = data.personajes;
    
    if (Array.isArray(personajes)) {
        personajes.forEach(personaje => {
            const personajeCard = document.createElement('div');
            personajeCard.className = 'personaje-card';
            
            personajeCard.innerHTML = `
                <img src="${personaje.imagen}" alt="${personaje.nombre}">
                <h3>${personaje.nombre}</h3>
                <p>Clan: ${personaje.clan || 'Desconocido'}</p>
                <p>Aldea: ${personaje.aldea || 'Desconocida'}</p>
                <a href="detalle.html?id=${personaje.id}" class="btn-detalle">Ver detalles</a>
            `;
            
            galeriaContainer.appendChild(personajeCard);
        });
    } else {
        console.error('El formato de los datos no es el esperado:', data);
    }
}
// Cargar personajes al iniciar la página
document.addEventListener('DOMContentLoaded', cargarPersonajes);
