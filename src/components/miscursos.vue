<script setup>

    const cursos= []

    for(let i = 0; i < sessionStorage.length; i++) { 
        let clave = sessionStorage.key(i);
        cursos[clave]= sessionStorage.getItem(clave)
        
        document.getElementById("info").innerHTML += cursos[clave]

    
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

    <!-- aquí coge los cursos vacíos(como se declara la constante) -->
    {{ cursos }}

    <div v-for="curso in cursos">
        <p> {{ curso }}</p>

    </div>

    <div id="info"></div>

    

</template>
