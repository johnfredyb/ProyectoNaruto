const url = "https://johnfredyb.github.io/jsonNaruto.io/Json/jsonNaruto2.json";
const galeria = document.getElementById("galeria-grid");
const inputBusqueda = document.getElementById("busqueda");
const selectAldea = document.getElementById("filtroAldea");
const selectRango = document.getElementById("filtroRango");
const estadisticas = document.getElementById("estadisticas");
const toggleTema = document.getElementById("toggle-tema");

const btnVerFavoritos = document.getElementById("verFavoritos");
const btnExportarJson = document.getElementById("exportarJson");
const btnExportarCsv = document.getElementById("exportarCsv");

const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const modalImg = document.getElementById("modalImg");
const modalNombre = document.getElementById("modalNombre");
const modalAldea = document.getElementById("modalAldea");
const modalRango = document.getElementById("modalRango");

const btnPrev = document.getElementById("prevPage");
const btnNext = document.getElementById("nextPage");
const numPagina = document.getElementById("numPagina");

let personajesOriginales = [];
let paginaActual = 1;
const porPagina = 6;
let mostrarSoloFavoritos = false;


function esFavorito(nombre) {
  const favoritos = JSON.parse(localStorage.getItem("favoritosAbisax") || "[]");
  return favoritos.includes(nombre);
}

function toggleFavorito(nombre) {
  let favoritos = JSON.parse(localStorage.getItem("favoritosAbisax") || "[]");
  if (favoritos.includes(nombre)) {
    favoritos = favoritos.filter(n => n !== nombre);
  } else {
    favoritos.push(nombre);
  }
  localStorage.setItem("favoritosAbisax", JSON.stringify(favoritos));
}

function abrirModal(p) {
  modal.style.display = "flex";
  modalImg.src = p.imagen;
  modalNombre.textContent = p.nombre;
  modalAldea.textContent = `Aldea: ${p.aldea}`;
  modalRango.textContent = `Rango: ${p.rango}`;
}

cerrarModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }

function aplicarFiltros() {
  const texto = inputBusqueda.value.toLowerCase();
  const filtroAldea = selectAldea.value;
  const filtroRango = selectRango.value;

  let filtrados = personajesOriginales.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (filtroAldea === "" || p.aldea === filtroAldea) &&
    (filtroRango === "" || p.rango === filtroRango)
  );

  if (mostrarSoloFavoritos) {
    const favoritos = JSON.parse(localStorage.getItem("favoritosAbisax") || "[]");
    filtrados = filtrados.filter(p => favoritos.includes(p.nombre));
  }

  mostrarEstadisticas(filtrados);
  renderPagina(filtrados);
}

function renderPagina(lista) {
  const totalPaginas = Math.ceil(lista.length / porPagina);
  paginaActual = Math.max(1, Math.min(paginaActual, totalPaginas));
  numPagina.textContent = `Página ${paginaActual} de ${totalPaginas}`;

  const desde = (paginaActual - 1) * porPagina;
  const hasta = desde + porPagina;
  mostrarPersonajes(lista.slice(desde, hasta));

  btnPrev.disabled = paginaActual === 1;
  btnNext.disabled = paginaActual === totalPaginas;
}

function mostrarPersonajes(lista) {
  galeria.innerHTML = "";
  lista.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("tarjeta");

    const img = document.createElement("img");
    img.src = p.imagen;
    img.alt = p.nombre;

    const fav = document.createElement("div");
    fav.classList.add("favorito");
    fav.textContent = esFavorito(p.nombre) ? "★" : "☆";
    fav.onclick = (e) => {
      e.stopPropagation();
      toggleFavorito(p.nombre);
      fav.textContent = esFavorito(p.nombre) ? "★" : "☆";
    };

    const info = document.createElement("div");
    info.classList.add("info");
    info.innerHTML = `<p>${p.nombre}</p><p>Aldea: ${p.aldea}</p><p>Rango: ${p.rango}</p>`;

    card.onclick = () => abrirModal(p);
    card.appendChild(fav);
    card.appendChild(img);
    card.appendChild(info);
    galeria.appendChild(card);
  });
}

function mostrarEstadisticas(lista) {
  const total = lista.length;
  const porAldea = {};
  const porRango = {};

  lista.forEach(p => {
    porAldea[p.aldea] = (porAldea[p.aldea] || 0) + 1;
    porRango[p.rango] = (porRango[p.rango] || 0) + 1;
  });

  let texto = `Total: ${total} personajes. `;
  texto += " | Aldeas: " + Object.entries(porAldea).map(([a, c]) => `${a} (${c})`).join(", ");
  texto += " | Rangos: " + Object.entries(porRango).map(([r, c]) => `${r} (${c})`).join(", ");

  estadisticas.textContent = texto;
}

function obtenerListaFiltrada() {
  const texto = inputBusqueda.value.toLowerCase();
  const filtroAldea = selectAldea.value;
  const filtroRango = selectRango.value;
  let lista = personajesOriginales.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (filtroAldea === "" || p.aldea === filtroAldea) &&
    (filtroRango === "" || p.rango === filtroRango)
  );
  if (mostrarSoloFavoritos) {
    const favs = JSON.parse(localStorage.getItem("favoritosAbisax") || "[]");
    lista = lista.filter(p => favs.includes(p.nombre));
  }
  return lista;
}

function exportarJSON(lista) {
  const blob = new Blob([JSON.stringify(lista, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "personajes_abisax.json";
  a.click();
  URL.revokeObjectURL(url);
}

function exportarCSV(lista) {
  const encabezado = "Nombre,Aldea,Rango\n";
  const filas = lista.map(p => `"${p.nombre}","${p.aldea}","${p.rango}"`).join("\n");
  const csv = encabezado + filas;

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "personajes_abisax.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function initTema() {
  const tema = localStorage.getItem("temaAbisax") || "claro";
  document.body.classList.toggle("oscuro", tema === "oscuro");
  toggleTema.textContent = tema === "oscuro" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
}

toggleTema.onclick = () => {
  const oscuro = document.body.classList.toggle("oscuro");
  localStorage.setItem("temaAbisax", oscuro ? "oscuro" : "claro");
  toggleTema.textContent = oscuro ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
};


inputBusqueda.addEventListener("input", aplicarFiltros);
selectAldea.addEventListener("change", aplicarFiltros);
selectRango.addEventListener("change", aplicarFiltros);
btnPrev.addEventListener("click", () => { paginaActual--; aplicarFiltros(); });
btnNext.addEventListener("click", () => { paginaActual++; aplicarFiltros(); });

btnVerFavoritos.addEventListener("click", () => {
  mostrarSoloFavoritos = !mostrarSoloFavoritos;
  btnVerFavoritos.textContent = mostrarSoloFavoritos ? "🔁 Ver Todos" : "⭐ Ver Favoritos";
  aplicarFiltros();
});

btnExportarJson.addEventListener("click", () => {
  const lista = obtenerListaFiltrada();
  exportarJSON(lista);
});

btnExportarCsv.addEventListener("click", () => {
  const lista = obtenerListaFiltrada();
  exportarCSV(lista);
});


fetch(url)
  .then(res => res.json())
  .then(data => {
    personajesOriginales = data.personajes;

    const aldeas = [...new Set(data.personajes.map(p => p.aldea))];
    aldeas.forEach(a => {
      const opt = document.createElement("option");
      opt.value = a;
      opt.textContent = a;
      selectAldea.appendChild(opt);
    });

    const rangos = [...new Set(data.personajes.map(p => p.rango))];
    rangos.forEach(r => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      selectRango.appendChild(opt);
    });

    initTema();
    aplicarFiltros();
  })
  .catch(err => console.error("Error cargando personajes:", err));
