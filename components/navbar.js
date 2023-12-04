app.component('nav-bar', 
{
    template:
    /*html*/
    `            
    <div>
        <img src="./assets/img/Logo Globo.png" alt="Logo de globo" id="img-logo">
        <div v-if="usuarioGuardado">
            <h4 class="usuario-guardado">{{ usuarioGuardado }}</h4>
            <button @click="eliminarUsuario" class="boton-usuario">Cerrar Sesión</button>
        </div>
        <div v-else>
            <input type="text" id="nombre" v-model="nuevoUsuario.nombre" placeholder="Ingresa tu usuario...">
            <button @click="agregarUsuario" class="boton-usuario">Ingresar</button>
        </div>
    </div>
    `,
    data() {
        return{
            nuevoUsuario: {
                nombre: "",
            },
        }
    },
    computed: {
        usuarioGuardado() {
          return localStorage.getItem('nombre');
        },
    },
    methods: {
        agregarUsuario () {
            if (!this.nuevoUsuario.nombre.trim()) {
                Swal.fire({
                    text: "El nombre del usuario no puede estar vacío",
                    icon: "error"
                });
                return;
            }
        
            let nuevo = {};
            nuevo.nombre = this.nuevoUsuario.nombre;
        
            this.nuevoUsuario.nombre = '';
        
            localStorage.setItem('nombre', nuevo.nombre);
            location.reload();
        },

        eliminarUsuario () {
            localStorage.removeItem('nombre');
            localStorage.removeItem('meGusta');
            localStorage.removeItem('seguir');
            localStorage.setItem('contador', 200);
            location.reload();
        },
    },
})