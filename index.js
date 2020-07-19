// Import stylesheets
import "./style.css";
import "./css/custom.css";
import "./css/normalize.css";
import "./css/skeleton.css";

// Variables

const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

//Event Listeners

cargarEventListeners();
function cargarEventListeners() {
  //Activo al presionar "agregar carrito"
  cursos.addEventListener("click", comprarCurso);

  //Al eliminar curso seleccionado
  carrito.addEventListener("click", eliminarCurso);

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

//Functions

//Añadir curso al carrito
function comprarCurso(e) {
  //e funciona para elegir el elemento
  e.preventDefault();

  //Delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    //El curso al que se da click y sus datos, el contenedor
    const curso = e.target.parentElement.parentElement;
    //Enviar el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}

//Leer los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id")
  };

  insertarCarrito(infoCurso);
}
//Mostrar el curso seleccionado con su información en el carrito

// el parametro será el objeto con la información del curso
function insertarCarrito(curso) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${curso.img}" width="100px">
    </td>
    <td>
      ${curso.titulo}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
     <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `;

  listaCursos.appendChild(row);

  guardarCursoLocalStorage(curso);
}
// Almacenar en el carrito a LocalStorage
function guardarCursoLocalStorage(curso) {
  let cursos;
  // Toma el valor de un arreglo con los datos del localStorage o vacio
  cursos = obtenerCursosLocalStorage();

  // El curso seleccionado se agrega al arreglo LocalStorage
  cursos.push(curso);

  // Enviar arreglo al localStorage convertido en string
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

// Comprueba que haya elementos en localStorage
function obtenerCursosLocalStorage() {
  let cursosLS;

  // comprobar si hay algo en LocalStorage
  if (localStorage.getItem("cursos") === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse(localStorage.getItem("cursos"));
  }

  return cursosLS;
}

// imprime los cursos de localStorage en el carrito
function leerLocalStorage() {
  let cursosLS;

  cursosLS = obtenerCursosLocalStorage();
  // construir template
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <img src="${curso.img}" width="100px">
    </td>
    <td>
      ${curso.titulo}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
     <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
  `;
}

// Elimina curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  let curso;
  let cursoId;

  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;

    cursoId = curso.querySelector('a').getAttribute('data-id');

    console.log(cursoId);
  }

  eliminarCursoLocalStorage(cursoId);
}

// Eliminar todos los cursos del carrito en el DOM
function vaciarCarrito(e) {
  // forma lenta
  // listaCursos.innerHTML = '';

  // forma rapida recomendada
  // Mientras halla un elemento
  while (listaCursos.firstChild) {
    // Se irán removiendo
    listaCursos.removeChild(listaCursos.firstChild);
  }

  // vaciar carrito localStorage
  vaciarLocalStorage();
   return false;
}

// eliminar el curso por el id en localStorage
function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  // obtenemos el arreglo de cursos 
  cursosLS = obtenerCursosLocalStorage();
  // Iteramos comparando el ID del curso borrado con los del localStorage
  cursosLS.forEach(function(cursoLS, index) {
    if (cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });

  // añadimos el arreglo actual al localStorage
  localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos de localStorage
function vaciarLocalStorage() {
  localStorage.clear();
}