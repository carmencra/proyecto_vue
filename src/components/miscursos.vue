<script setup>
    import {ref} from 'vue'
    const cursos= []

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

    {{ cursos["excell"]["categoria"]}}
    
    <section>
        <div v-for="cur in cursos">
        <p> {{ cursos[cur]["categoria"]}} </p>
        </div>
    </section>

    <!-- aquí coge los cursos vacíos(como se declara la constante) -->
    
</template>
