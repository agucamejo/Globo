//BOTON ME GUSTA
const botonLikes = document.querySelector('#boton-me-gusta');
const contadorLikes = document.querySelector('#contador-me-gusta');
const numLikes = document.querySelector('#num-likes');
let likes = 200;
let meGusta = localStorage.getItem('meGusta') === 'true';
let contador = likes;

if (meGusta) {
  contador++;
  botonLikes.textContent = 'Quitar me gusta';
  botonLikes.style.color = "#f95252";
}

numLikes.textContent = contador;

botonLikes.addEventListener('click', () => {
  if (!meGusta) {
    contador++;
    meGusta = true;
    botonLikes.textContent = 'Quitar me gusta';
    botonLikes.style.color = "#f95252";
    localStorage.setItem('meGusta', meGusta);
  } else {
    contador--;
    meGusta = false;
    botonLikes.textContent = 'Me gusta';
    botonLikes.style.color = "#3B82F6";
    localStorage.removeItem('meGusta');
  }

  if (contador < likes) {
    contador = likes;
  }

  numLikes.textContent = contador;
});

numLikes.style.fontWeight = 'bold';




//BOTON SEGUIR
const botonSeguir = document.querySelector('#boton-seguir');
let seguir = localStorage.getItem('seguir') === 'true';

if (seguir) {
  botonSeguir.textContent = 'Dejar de seguir';
  botonSeguir.style.backgroundColor = "#f95252";
} else {
  botonSeguir.textContent = 'Seguir';
  botonSeguir.style.backgroundColor = "#3B82F6";
}

botonSeguir.addEventListener('click', () => {
  seguir = !seguir;
  localStorage.setItem('seguir', seguir);
  
  if (seguir) {
    botonSeguir.textContent = 'Dejar de seguir';
    botonSeguir.style.backgroundColor = "#f95252";
  } else {
    botonSeguir.textContent = 'Seguir';
    botonSeguir.style.backgroundColor = "#3B82F6";
  }
});


//SECCIÓN COMENTARIOS
//Cosas a solucionar: - Que permita cerrar sesión al usuario e ingresar otro nombre
const nombreInput = document.getElementById("nombre");
const comentarioInput = document.getElementById("comentario");
const comentariosDiv = document.getElementById("comentarios");
const erroresDiv = document.getElementById("errores");

 // Obtener los comentarios del localStorage (si existen)
  let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

  // Agregar los comentarios almacenados al div de comentarios
  comentarios.forEach((comentario) => {
    const comentarioHTML = `
      <div>
        <strong>${comentario.nombre}</strong>: ${comentario.texto}
        <button class="eliminar">Eliminar</button>
      </div>
    `;
    comentariosDiv.innerHTML += comentarioHTML;
  });

  // Agregar evento click a los botones "Eliminar"
  function eliminarComentario() {
    const botonesEliminar = document.getElementsByClassName("eliminar");
    for (let i = 0; i < botonesEliminar.length; i++) {
      botonesEliminar[i].addEventListener("click", (event) => {
        const comentarioAEliminar = event.target.parentNode;
        const indiceComentario = Array.from(comentariosDiv.children).indexOf(comentarioAEliminar);

        // Eliminar el comentario del array y actualizar el localStorage
        comentarios.splice(indiceComentario, 1);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        comentariosDiv.removeChild(comentarioAEliminar);
      });
    }
  }

  eliminarComentario(); 

  //Evento click al boton de comentar y validaciones necesarias.
  document.getElementById("comentar").addEventListener("click", () => {
    const nombre = nombreInput.value.trim(); // Usar el usuario ingresado en el input
    const comentario = comentarioInput.value.trim();

    erroresDiv.innerHTML = ""; // Limpiar errores previos

    if (!nombre) {
      const errorHTML = "<p>Por favor, ingrese un usuario.</p>";
      erroresDiv.innerHTML += errorHTML;
    }

    if (!comentario) {
      const errorHTML = "<p>Por favor, ingrese un comentario.</p>";
      erroresDiv.innerHTML += errorHTML;
    }

    if (nombre && comentario) {      
      //Agregar un nuevo comentario
      const nuevoComentario = {
        nombre: nombre,
        texto: comentario,
      };
      comentarios.push(nuevoComentario);

      // Guardar los comentarios nuevos en el localStorage
      localStorage.setItem("comentarios", JSON.stringify(comentarios));

      const comentarioHTML = `
        <div class="comentarios">
          <strong>${nombre}</strong>: ${comentario}
          <button class="eliminar">Eliminar</button>
        </div>
      `;
      comentariosDiv.innerHTML += comentarioHTML;

      nombreInput.value = ""; // Limpiar el input de nombre
      comentarioInput.value = ""; // Limpiar el input de comentario
      
      eliminarComentario(); 
    }
  });

  //Efecto de historia al tocar imagen de perfil
  const imgPerfil = document.getElementById('img-perfil');

  imgPerfil.addEventListener('click', () => {
    document.body.appendChild(fondoOscuro);
    document.body.appendChild(imgAgrandada);
    document.body.style.overflow = "hidden";
  });
  
  const imgAgrandada = document.createElement('img');
  imgAgrandada.className = 'img-agrandada';
  imgAgrandada.src = 'img/Foto Historia.png';
  imgAgrandada.alt = 'Foto de perfil agrandada de Jane Doe';
  
  
  const fondoOscuro = document.createElement('div');
  fondoOscuro.className = 'fondo-oscuro';
  
  
  imgAgrandada.addEventListener('click', () => {
    document.body.removeChild(imgAgrandada);
    document.body.removeChild(fondoOscuro);
    document.body.style.overflow = "auto";
  });