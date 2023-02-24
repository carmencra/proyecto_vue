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
</script>



<template>
    <h1 class="green">{{ msg }}</h1>

    <!-- firebase: mostrar campos -->
    <ul>
      <section v-for="curso in cursos"  :key="curso.id">
        <div v-if="curso.categoria == 'programacion'">
          <li>
            <router-link v-bind:to="'/detalle_curso/'+curso.id">{{curso.nombre}}</router-link>
          </li>

          <ul>
            <li> {{ curso.categoria }} </li>
            <li> {{ curso.horas }} horas </li>
            <img v-bind:src="'/src/images/'+curso.imagen">
            <li> <button>Inscribirse</button> </li>
          </ul> <br><br>
        </div>
      </section>
    </ul>

</template>
