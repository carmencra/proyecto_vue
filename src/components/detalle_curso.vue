<script setup>
import {useRoute} from "vue-router";

//firebase
import { useFirestore, useCollection } from 'vuefire'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

//añadir documento
import { collection } from 'firebase/firestore'

const db = useFirestore()
const cursos = useCollection(collection(db, 'cursos'))

var nombre_curso= useRoute().params.nombre
var nombre_img= nombre_curso + '.png'

console.log(nombre_img)

// Create a reference with an initial file path and name
const storage = getStorage();
const pathReference = ref(storage, nombre_img);

getDownloadURL(pathReference)
  .then((url) => {
    const img = document.getElementById('ima');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });
</script>


<template>
    <section v-for="curso in cursos" :key="curso.nombre">
        <div v-if="curso.nombre == $route.params.nombre">

            <table border="1">
                <thead>
                    <tr>
                        <th colspan="5">
                            <h1 class="green">{{ curso.nombre }}</h1>
                        </th>
                    </tr>

                    <tr>
                        <th style="width: 100px;">Categoría</th>
                        <th style="width: 80px;">Horas</th>
                        <th style="width: 210px;">Imagen</th>
                        <th style="width: 150px;">Pdf</th>
                        <th style="width: 100px;">Inscribirse</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td> {{ curso.categoria }} </td>
                        <td> {{ curso.horas }} horas </td>
                        <td>
                            <!-- <img v-bind:src="'/src/images/' + curso.imagen"> -->
                            <img v-bind:src="image" id="ima">
                        </td>
                        <td>
                            <!-- aquí, al ser un pdf por curso, sería en vez de con categoría con nombre, pero no he hecho un pdf por curso así que por categoría va a ser :) -->
                            <a v-bind:href="'/src/pdf/' + curso.categoria + '.pdf'" target="_blank">{{ curso.categoria
                            }}.pdf</a>
                        </td>
                        <td> <button>Inscribirse</button> </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </section></template>
