<script setup>
import {useRoute} from "vue-router";

//firebase
import { useFirestore, useCollection } from 'vuefire'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { collection } from 'firebase/firestore'

const db = useFirestore()
const cursos = useCollection(collection(db, 'cursos'))

var nombre_curso= useRoute().params.nombre
var nombre_img= nombre_curso + '.png'
var nombre_pdf= nombre_curso + '.pdf'

// Create a reference with an initial file path and name
const storage = getStorage();
//obtener imagen curso
function carga_imagen() {
    const imagen_bd = ref(storage, nombre_img);
    getDownloadURL(imagen_bd)
    .then((url) => {
        const img = document.getElementById('ima');
        img.setAttribute('src', url);
    })
    .catch((error) => {
        // Handle any errors
    });
}

function carga_pdf() {
    const pdf_bd = ref(storage, nombre_pdf);
    getDownloadURL(pdf_bd)
    .then((url) => {
        const pdf = document.getElementById('pdf');
        pdf.setAttribute('href', url);
    })
    .catch((error) => {
        // Handle any errors
    });
}

carga_imagen()
carga_pdf()
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
                            <img v-bind:src="imagen" id="ima">
                        </td>
                        <td>
                            <a v-bind:href="pdf" id="pdf" target="_blank">{{ curso.nombre
                            }}.pdf</a>
                        </td>
                        <td> <button>Inscribirse</button> </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </section></template>
