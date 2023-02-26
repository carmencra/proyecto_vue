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
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>

    <div style="text-align: center;">
      <img v-bind:src="'/public/logo.png'">
      
      <h2 class="green">INFORMÁTICA S.L</h2>
    </div>
    
    <p>En nuestra empresa, apostamos por el crecimiento de la informática en todos sus sectores, facilitando el acceso al aprendizaje de la misma con diversos cursos programados para distintos ámbitos</p>

  </div>

</template>
