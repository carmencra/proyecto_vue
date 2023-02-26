<script setup>
import {useRoute} from "vue-router";

import { useFirestore } from 'vuefire'
import { doc, updateDoc } from "firebase/firestore";

const db = useFirestore()

var id_curso= useRoute().params.id
const curso_bd = doc(db, "cursos", id_curso);

function editar_curso() {
    let categoria= document.getElementById("categoria").value;
    let nombre= document.getElementById("nombre").value;
    let horas= document.getElementById("horas").value;

    if (categoria != "" && nombre != "" && horas != "" && categoria != "") {
        updateDoc(curso_bd, {
            capital: categoria,
            nombre: nombre,
            horas: horas,
            // imagen: file.value.files[0].name 
        });
    }
}

//título componente
defineProps({
    msg: {
        type: String,
        required: true
    }
})
</script>


<template>
    <h1 class="green">{{ msg }}</h1>
    
    <fieldset>
    <legend> <h2>Curso {{ id_curso }} </h2> </legend>
    <!-- <form> -->
      <label for="categoria">Categoría: </label>
      <input type="text" name="categoria" id="categoria"> <br>

      <label for="nombre">Nombre: </label>
      <input type="text" name="nombre" id="nombre"> <br>

      <label for="horas">Horas: </label>
      <input type="number" name="horas" id="horas" min="0"> <br>

      <label for="imagen">Imagen: </label>
      <!-- <input type="file" name="" accept="image/*" ref="file" @change="subir_archivo"> <br> -->

      <br>
      <input type="submit" @click="editar_curso" value="Editar curso"> 

  </fieldset>
</template>
