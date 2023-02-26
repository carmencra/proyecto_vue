<script setup>
import { ref } from "vue"
import { auth } from "../firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

var usuario= ref(""), contrasena= ref("");

function alta_usuario() {
    createUserWithEmailAndPassword(auth, usuario.value, contrasena.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(userCredential.user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
    });
}


function login_usuario() {
    signInWithEmailAndPassword(auth, usuario.value, contrasena.value)
      .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
      }
    );
}


//login con google
const provider = new GoogleAuthProvider();
function login_google() {
    signInWithPopup(auth, provider)
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
      })
      .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
      }
    );
}


defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>



<template>
    <br><h1 class="green">{{ msg }}</h1>

    <label for="usuario">Gmail: </label>
    <input type="text" v-model="usuario"> <br><br>
    
    <label for="contrasena">Contraseña: </label>
    <input type="password" v-model="contrasena"> <br><br>

    <button @click="alta_usuario">Registrarse</button> &nbsp;
    <button @click="login_usuario">Login</button> &nbsp;

    <button @click="login_google">Login google</button>
</template>
