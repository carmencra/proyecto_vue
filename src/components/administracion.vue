<script setup>
  //firebase
  import { useFirestore, useCollection } from 'vuefire'

  //añadir documento
  import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
  
  //subir archivos
  import { ref } from "vue"
  import { getStorage, ref as ref2, uploadBytes, getDownloadURL } from "firebase/storage";

  const db = useFirestore()
  const cursos = useCollection(collection(db, 'cursos'))

  let file= ref("")
    //subir archivos
    function subir_archivo() {
        const storage = getStorage();
        const storageRef = ref2(storage, file.value.files[0].name);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file.value.files[0]).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(storageRef)
            .then((url) => {
                console.log(url);
            })
        });
    }

  // si no hay datos vacíos, guarda el curso en la bd
  function nuevo_curso() {
    let categoria= document.getElementById("categoria").value;
    let nombre= document.getElementById("nombre").value;
    let horas= document.getElementById("horas").value;

    if (categoria != "" && nombre != "" && horas != "" && categoria != "") {
      addDoc(collection(db, "cursos"), {
        categoria: categoria,
        nombre: nombre,
        horas: horas,
        imagen: file.value.files[0].name 
      });
    }
  }


  function borra_curso(id) {
    deleteDoc(doc(db, "cursos", id));
  }
  

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
    
    <fieldset>
    <legend> <h2>Añadir curso</h2> </legend>
    <!-- <form> -->
      <label for="categoria">Categoría: </label>
      <input type="text" name="categoria" id="categoria"> <br>

      <label for="nombre">Nombre: </label>
      <input type="text" name="nombre" id="nombre"> <br>

      <label for="horas">Horas: </label>
      <input type="number" name="horas" id="horas" min="0"> <br>

      <label for="imagen">Imagen: </label>
      <input type="file" name="" accept="image/*" ref="file" @change="subir_archivo"> <br>

      <input type="submit" @click="nuevo_curso" value="Añadir curso"> 
    <!-- </form>  -->
  </fieldset> <br>

    <!-- firebase: mostrar campos -->
    <ul>
      <section v-for="curso in cursos"  :key="curso.id">
          <router-link v-bind:to="'/detalle_curso/'+curso.id">{{curso.nombre}}</router-link>

          <ul>
            <li> {{ curso.id }} </li>
            <li> {{ curso.categoria }} </li>
            <li> {{ curso.horas }} horas </li>
            <li> {{ curso.imagen }} </li>

            <!-- para editar el curso -->
            <li> 
              <router-link v-bind:to="'/editar_curso/'+curso.id">Editar curso</router-link>
            </li>

            <!-- añade un botón para borrar el curso -->
            <li> 
              <button @click="borra_curso(curso.id)">Borrar curso</button> 
            </li>

            <img v-bind:src="'/src/images/'+curso.imagen">
          </ul> <br><br>
      </section>
    </ul>

</template>
