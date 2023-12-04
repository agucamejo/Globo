app.component('datos-perfil', {
    template:
    /*html*/
    `
    <div id="info-perfil"> 
        <img src="./assets/img/Foto perfil.jpeg" alt="Foto de perfil de Jane Doe" id="img-perfil">
        
        <h2 id="nombre-perfil">Jane Doe</h2>
        <p><strong>Email:</strong> jane_doe@gmail.com</p>
        <p><strong>Fecha de nacimiento:</strong> 01/05/1996</p>
        <p><strong>Teléfono:</strong> 918-936-3985</p>
        <p><strong>Ciudad:</strong> Tokyo, Japón.</p>
        <p class="transparente">Trabajando en <strong>Lawn N</strong></p>

        <button id="boton-seguir" :style="{ color: '#FFF', backgroundColor: seguir ? '#f95252' : '#3B82F6' }" v-on:click="BotonSeguir">
        {{ seguir ? 'Dejar de seguir' : 'Seguir' }}
        </button>
    </div>
    `,
    data() {
        return{
            seguir: localStorage.getItem('seguir') === 'true',
        }
      },
      methods: {
        BotonSeguir() {
          this.seguir = !this.seguir;
          localStorage.setItem('seguir', this.seguir);
        },
      },
})