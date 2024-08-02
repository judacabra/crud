<template>
    <FormCrud/>
</template>

<script>
import FormCrud from './components/FormCrud.vue'

export default {
    name: 'App',
    components: {
        FormCrud,
    }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
