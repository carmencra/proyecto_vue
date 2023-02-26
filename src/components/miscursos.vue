<script setup>
    const cursos= []

    // por cada sesión, guarda el nombre del curso como key y el objeto curso como value
    for(let i = 0; i < sessionStorage.length; i++) { 
        let clave = sessionStorage.key(i);
        cursos[clave]= JSON.parse(sessionStorage.getItem(clave))    
    }
    console.log(cursos)

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

    <p>Los cursos inscritos están en la consola</p>

    <!-- esto no lo está leyendo bien -->
    <section>
        <div v-for="cur in cursos">
        <p> {{ cursos[cur]}} </p>
        </div>
    </section>

</template>
