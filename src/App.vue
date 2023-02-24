<script setup>
  import { RouterLink, RouterView } from 'vue-router';
   
  import { ref } from "vue"
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

</script>

<template>
  <header>
   <nav>
    <router-link to="/">Inicio</router-link>
    <!-- <router-link to="/registro">Registro</router-link> -->
    <router-link to="/cursos">Cursos</router-link>

    <!-- si no hay un usuario, muestra el registro -->
    <router-link v-if="nombre_usuario == ''" to="/registro">Registro</router-link> 

    <!-- si hay un usuario, muestra administración y cerrar sesión -->
    <router-link v-if="nombre_usuario != ''" to="/administracion">Administración</router-link>

    <router-link v-if="nombre_usuario != ''" to="/">
      <button @click="cerrar_sesion" class="cerrar">Cerrar sesión</button>
    </router-link>
    
<!-- intentar hacer cmponente cerrar que te hace push a / y cierra sesión -->

    <!-- <button v-if="nombre_usuario != ''" @click="cerrar_sesion" class="cerrar">Cerrar sesión</button> -->
    </nav>
  </header>

  <main>
    <router-view />
  </main>

  <footer>
    <p>&copy;Carmen CRA</p>

    <p>Política de privacidad</p>

    <p>Contacta con <u>INFORMÁTICA SL</u></p>
  </footer>
</template>
