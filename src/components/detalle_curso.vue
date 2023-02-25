<script setup>
    //firebase
    import { useFirestore, useCollection } from 'vuefire'

    //añadir documento
    import { collection } from 'firebase/firestore'

    const db = useFirestore()
    const cursos = useCollection(collection(db, 'cursos'))

</script>


<template>
    <section v-for="curso in cursos"  :key="curso.id">
        <div v-if="curso.id == $route.params.id">
            
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="5"> <h1 class="green">{{ curso.nombre }}</h1> </th>
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
                            <img v-bind:src="'/src/images/'+curso.imagen"></td>
                        <td>
                            <a v-bind:href="'/src/pdf/'+curso.categoria+'.pdf'" target="_blank">{{ curso.categoria }}.pdf</a>
                        </td>
                        <td> <button>Inscribirse</button> </td>
                    </tr>
                </tbody>
                
            </table>
        </div>
    </section>

</template>
