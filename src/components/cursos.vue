<script setup>
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

    <nav>
        <ul>
            <li>
                <router-link v-bind:to="'/ofimatica'">Ofimática</router-link>
            </li>
            
            <li>
                <router-link v-bind:to="'/programacion'">Programación</router-link>
            </li>
            
            <li>
                <router-link v-bind:to="'/sos'">SOs</router-link>
            </li>
        </ul>
    </nav>
        
</template>
