<template>
   <h1 class="cl-brown"> {{ title }} </h1>
   <h4> {{ question }} </h4>
   <div class="opciones">
       <button class="btn mb-3 cl-brown" v-on:click="consultar"> Consultar todos los clientes </button>
       <button class="btn mb-3 cl-brown" v-on:click="irACrear"> Crear un cliente </button>
   </div>
</template>

<script>
    export default {
        name: 'FormCurd',
        data (){
            return {
                title: 'CRUD Project with Node.js / Express.js / Vue.js',
                question: 'Por favor seleccione la acción que desea realizar:',
                path : 'http://localhost:8000',
            }
        },
        methods: {
            consultar() {
                window.location.href = `${this.path}/clientes/consultar`;
            },
            irACrear(){
                window.location.href = `${this.path}/clientes/creacion`;
            },
        }
    }
</script>

<style>
    .opciones {
        margin: auto;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .mb-3 {
        margin-bottom: 3%;
    }

    .btn {
        padding: 2%;
        font-family: 'Century gothic';
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 10px;
        border: #9b6565 solid 0.5px;
        background: #ffffff;
    }

    .btn:hover {
        background: #9b6565;
        color: #ffffff !important;
    }

    .cl-brown {
        color: #9b6565;
    }
</style>