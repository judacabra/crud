<template>
    <div class="title">
        <h1 class="cl-brown"> LISTADO DE CLIENTES </h1>
        <button title="Crear cliente" @click="form()">+</button>
    </div>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE CLIENTE</th>
                <th>NIT</th>
                <th>CORREO ELECTRONICO</th>
                <th>TELÉFONO</th>
                <th>ESTADO</th>
                <th>CREADO POR</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.business_name }}</td>
                <td>{{ cliente.nit }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.phone }}</td>
                <td>{{ cliente.status ? 'Activo' : 'Inactivo' }}</td>
                <td>{{ cliente.username }}</td>
                <td class="center">
                    <span @click="editar(cliente.id)" class="icon">
                        🖊️
                    </span>
                </td>
                <td class="center">                    
                    <span @click="eliminar(cliente.business_name, cliente.id)" class="icon">
                        ✖️
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const API = 'http://localhost:8000';

const clientes = ref([]);
const router = useRouter();

const form = ()=>{
    router.push('/formulario');
}

const editar = (id) => {
    router.push(`/formulario/${id}`);
};

const eliminar = async (cliente, id) => {
    const respuesta = confirm(`¿Estás seguro de eliminar el cliente ${cliente}?`);

    if (respuesta) {
        try {
            const response = await fetch(`${API}/clients/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Cliente eliminado con éxito');
                // Actualizar la lista de clientes después de la eliminación
                clientes.value = clientes.value.filter(cliente => cliente.id !== id);
            } else {
                alert('Error al eliminar el cliente');
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
            alert('Error al eliminar el cliente');
        }
    }
};

onMounted(async () => {
    try {
        const response = await fetch(`${API}/clients`);

        if (response.ok) {
            clientes.value = await response.json();
        } else {
            alert('Error al obtener los clientes');
        }
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        alert('Error al obtener los clientes');
    }
});
</script>

<style>
table {
    width: 80%;
    border-collapse: collapse;
    margin: 20px auto;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #eaeaea;
}

.center {
    text-align: center;
}

.icon {
    cursor: pointer;
}

.title {
    margin: auto;
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.title button {
    width: 35px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: #9b6565;
    color: #ffffff;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.cl-brown {
    color: #9b6565;
}
</style>
