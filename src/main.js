import { createApp } from 'vue'
import App from './App.vue'

//router
import { createRouter, createWebHistory } from 'vue-router'

import inicio from "./components/inicio.vue" 
import NotFound from "./components/NotFound.vue"
import registro from "./components/registro.vue"

//cursos
import ofimatica from "./components/ofimatica.vue"
import programacion from "./components/programacion.vue"
import sos from "./components/sos.vue"
import detalle_curso from "./components/detalle_curso.vue"
import editar_curso from "./components/editar_curso.vue"

import miscursos from "./components/miscursos.vue"


//login, registro
import administracion from "./components/administracion.vue"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js"

import './assets/main.css'

//firebase
import { VueFire, VueFireAuth } from 'vuefire'
// the file we created above with `database`, `firestore` and other exports
import { firebaseApp } from './firebase.js'


const routes= [
    {
        path: "/",
        component: inicio,
        props: {
            msg: "Página de inicio"
        }
    },

    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    },

    {
        path: "/registro",
        component: registro,
        props: {
            msg: "Registro de usuario"
        }
    },

    {
        path: "/administracion",
        component: administracion,
        props: {
            msg: "Administración"
        },
        beforeEnter: (to, from) => {
            return autenticado; 
            //return true o false
        },
    },

    {
        path: "/ofimatica",
        component: ofimatica,
        props: {
            msg: "Ofimática"
        }
    },

    {
        path: "/programacion",
        component: programacion,
        props: {
            msg: "Programación"
        }
    },

    {
        path: "/sos",
        component: sos,
        props: {
            msg: "SOs"
        }
    },

    {
        path: "/detalle_curso/:nombre",
        component: detalle_curso
    },

    {
        path: "/editar_curso/:id",
        component: editar_curso,
        props: {
            msg: "Editar curso"
        }
    },

    {
        path: "/miscursos",
        component: miscursos,
        props: {
            msg: "Mis cursos"
        }
    }
]


const router= createRouter({
    history: createWebHistory(),
    routes
})

const app= createApp(App)

let autenticado= false;
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      autenticado= true;
      // ...
    } else {
        autenticado= false;
        router.push("/")
      // User is signed out
      // ...
    }
  });


//router
app.use(router)

//firebase
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.mount('#app')

export const router_main= router

