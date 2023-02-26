<script setup>
  import { RouterLink, RouterView } from 'vue-router';
   
  import { ref, onMounted } from 'vue'

  import { auth } from "./firebase.js" 

  import { onAuthStateChanged, signOut } from "firebase/auth"

  let nombre_usuario= ref("")
    onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;

        nombre_usuario.value= user.email;
        }
    });

    function cerrar_sesion() { 
        signOut(auth).then(() => {
          nombre_usuario.value= ""
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        }); 
    }

    
  // preload
  const cargando= ref(true)
  onMounted(() => {
    //pasados 2.5 segundos, carga los datos de la página
    setTimeout(() => {
      cargando.value= false
    }, 2000)
  })


</script>

<template>
  <header>
   <nav>
    <router-link to="/">Inicio</router-link>
    <!-- <router-link to="/registro">Registro</router-link> -->
    <router-link v-bind:to="'/ofimatica'">Ofimática</router-link>
    <router-link v-bind:to="'/programacion'">Programación</router-link>
    <router-link v-bind:to="'/sos'">SOs</router-link>

    <!-- si no hay un usuario, muestra el registro -->
    <router-link v-if="nombre_usuario == ''" to="/registro">Registro</router-link> 

    <!-- si eres admin, te muestra la ruta de administración -->
    <router-link v-if="nombre_usuario == 'admin@gmail.com'" to="/administracion">Administración</router-link>

    <!-- cursos del usuario normal-->
    <router-link v-if="nombre_usuario != '' && nombre_usuario !='admin@gmail.com'" to="/miscursos">mis cursos</router-link>

    <!-- si hay un usuario, para cerrar sesión -->
    <router-link v-if="nombre_usuario != ''" to="/">
      <button @click="cerrar_sesion" class="cerrar">Cerrar sesión</button>
    </router-link>
    
<!-- intentar hacer cmponente cerrar que te hace push a / y cierra sesión -->

    <!-- <button v-if="nombre_usuario != ''" @click="cerrar_sesion" class="cerrar">Cerrar sesión</button> -->
    </nav>
  </header>

  <main>
    <div v-if="cargando" class="recarga"></div>
    <router-view v-else />
  </main>

  <footer>
    <p>&copy;Carmen CRA</p>

    <p>Política de privacidad</p>

    <p>Contacta con <u>INFORMÁTICA SL</u></p>
  </footer>
</template>


<style>
  .recarga {
    margin: 0 auto;
    width: 70px;
    height: 70px;
    border: 8px solid hsla(160, 100%, 37%, 1);;
    border-top: 10px solid blueviolet; 
    border-radius: 100%;
    animation: spin 0.8s ease-in-out infinite;
    backdrop-filter: blur(100px);
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

</style>
