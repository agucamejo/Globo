<template>
  <h4 class="transparente">Publicado hace 1 semana</h4>
  <img
    src="../assets/img/imagen publicacion.jpeg"
    alt="Imagen publicada por Jane Doe"
    id="img-publicacion"
  /><br />

  <div id="sector-mg">
    <button
      :style="{ color: meGusta ? '#f95252' : '#3B82F6' }"
      @click="BotonMeGusta"
    >
      {{ meGusta ? "Quitar me gusta" : "Me gusta" }}
    </button>
    <span id="contador-likes" :style="{ fontWeight: 'bold' }"
      >{{ contador }} likes</span
    >
  </div>

  <h4 class="titulo">Comentarios</h4>
  <p><strong>Juan Perez:</strong> ¡Wow, esa foto de Tokio es impresionante!</p>
  <p>
    <strong>Kathleen J Rennie:</strong> ¡Esta foto de Tokio es simplemente
    espectacular! Me trae tantos recuerdos.
  </p>

  <div id="comentarios">
    <div
      v-for="(comentario, indice) in comentarios"
      :key="indice"
      class="comentarios"
    >
      <strong>{{ comentario.nombre }}</strong
      >: {{ comentario.texto }}
      <button
        class="eliminar"
        v-if="comentario.nombre === nombre"
        @click="eliminarComentario(indice)"
      >
        Eliminar
      </button>
    </div>
  </div>

  <div id="errores">
    <p v-for="error in errores" :key="error">{{ error }}</p>
  </div>

  <input
    type="text"
    id="input-comentario"
    v-model="comentario"
    placeholder="Deja tu comentario..."
  />
  <button id="comentar" @click="agregarComentario">Comentar</button>
</template>

<script>
export default {
  data() {
    return {
      likes: 200,
      meGusta: localStorage.getItem("meGusta") === "true",
      contador: localStorage.getItem("contador")
        ? parseInt(localStorage.getItem("contador"))
        : 200,

      nombre: localStorage.getItem("nombre") || "",
      comentario: "",
      comentarios: JSON.parse(localStorage.getItem("comentarios")) || [],
      errores: [],
    };
  },

  methods: {
    BotonMeGusta() {
      if (!this.meGusta) {
        this.contador++;
        this.meGusta = true;
        localStorage.setItem("meGusta", "true");
      } else {
        this.contador--;
        this.meGusta = false;
        localStorage.removeItem("meGusta");
      }

      if (this.contador < this.likes) {
        this.contador = this.likes;
      }

      localStorage.setItem("contador", this.contador.toString());
    },

    eliminarComentario(indice) {
      this.comentarios.splice(indice, 1);
      localStorage.setItem("comentarios", JSON.stringify(this.comentarios));
    },

    agregarComentario() {
      this.errores = [];

      if (!this.nombre) {
        this.errores.push("Por favor, ingrese un usuario.");
      }

      if (!this.comentario) {
        this.errores.push("Por favor, ingrese un comentario.");
      }

      if (this.nombre && this.comentario) {
        const nuevoComentario = {
          nombre: this.nombre,
          texto: this.comentario,
        };

        if (nuevoComentario.texto.trim() !== "") {
          this.comentarios.push(nuevoComentario);
          localStorage.setItem("comentarios", JSON.stringify(this.comentarios));
          this.comentario = "";
        } else {
          this.errores.push("El comentario no puede estar vacío.");
        }
      }
    },
  },
};
</script>
