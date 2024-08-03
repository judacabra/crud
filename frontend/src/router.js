import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from './components/HomePage.vue';
import ClientsTable from './components/ClientsTable.vue';
import FormData from './components/FormData.vue';

const  routes = [
    {
        path: '/',
        name: 'Inicio',
        component: HomePage
    },
    {
        path: '/clientes',
        name: 'Clientes',
        component: ClientsTable
    },
    {
        path: '/formulario',
        name: 'Formulario Crear',
        component: FormData
    },
    {
        path: '/formulario/:id?',
        name: 'Formulario Editar',
        component: FormData
      },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
