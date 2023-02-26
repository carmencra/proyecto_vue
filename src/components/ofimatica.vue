<script setup>
  //firebase
  import { useFirestore, useCollection } from 'vuefire'
  import { getStorage, ref, getDownloadURL } from "firebase/storage";

  import { collection } from 'firebase/firestore'

  const db = useFirestore()
  const cursos = useCollection(collection(db, 'cursos'))

  // Create a reference with an initial file path and name
  const storage = getStorage();
  //obtener imagen curso
  function carga_imagen(nombre_imagen, nombre_curso) {
      const imagen_bd = ref(storage, nombre_imagen);
      getDownloadURL(imagen_bd)
      .then((url) => {
          const img = document.getElementById(nombre_curso);
          img.setAttribute('src', url);
      })
      .catch((error) => {
          // Handle any errors
      });
  }

  //título componente
  defineProps({
    msg: {
      type: String,
      required: true
    }
  })

  function inscribirse(curso) {
    sessionStorage.setItem(curso.nombre, JSON.stringify(curso) );

    for(var i = 0; i < sessionStorage.length; i++) { 
      var clave = sessionStorage.key(i);
    }
  }
</script>


<template>
    <h1 class="green">{{ msg }}</h1>

    <!-- firebase: mostrar campos -->
    <ul>
      <section v-for="curso in cursos"  :key="curso.id">
        <div v-if="curso.categoria == 'ofimatica'">
          <li>
            <router-link v-bind:to="'/detalle_curso/'+curso.nombre">{{curso.nombre}}</router-link>
          </li>

          <ul>
            <li> {{ curso.categoria }} </li>
            <li> {{ curso.horas }} horas </li>
            <img v-bind:src="carga_imagen(curso.imagen, curso.nombre)" v-bind:id="curso.nombre">
            <li> 
              <button @click="inscribirse(curso)">Inscribirse</button> 
            </li>
          </ul> <br><br>
        </div>
      </section>
    </ul>

</template>
