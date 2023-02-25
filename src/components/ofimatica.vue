<script setup>
  //firebase
  import { useFirestore, useCollection } from 'vuefire'

  //añadir documento
  import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'

  const db = useFirestore()
  const cursos = useCollection(collection(db, 'cursos'))

  //título componente
  defineProps({
    msg: {
      type: String,
      required: true
    }
  })

  const array_cursos= []

  function inscribirse(curso) {
    // console.log(curso['id']);
    // array_cursos.push(JSON.stringify(curso))
    // array_cursos[curso.nombre]= Object.values(curso) 
    sessionStorage.setItem(curso.nombre, JSON.stringify(curso) );

    // console.log(sessionStorage);
    for(var i = 0; i < sessionStorage.length; i++) { 
      var clave = sessionStorage.key(i);
      // console.log(sessionStorage.getItem(clave))
    }
    // console.log(sessionStorage)
  }

  

</script>



<template>
    <h1 class="green">{{ msg }}</h1>

    <!-- firebase: mostrar campos -->
    <ul>
      <section v-for="curso in cursos"  :key="curso.id">
        <div v-if="curso.categoria == 'ofimatica'">
          <router-link v-bind:to="'/detalle_curso/'+curso.id">{{curso.nombre}}</router-link>

          <ul>
            <li> {{ curso.categoria }} </li>
            <li> {{ curso.horas }} horas </li>
            <img v-bind:src="'/src/images/'+curso.imagen">
            <li> <button @click="inscribirse(curso)">Inscribirse</button> </li>
          </ul> <br><br>
        </div>
      </section>
    </ul>

</template>
