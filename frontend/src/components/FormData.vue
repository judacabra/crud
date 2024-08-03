<template>
    <div class="container" id="container">
        <h2 class="cl-brown">{{ client ? 'ACTUALIZAR' : 'CREAR' }} CLIENTE</h2>
        <form @submit.prevent="validarForm">
            <div class="group mb-10">
                <label class="cl-brown" for="name">Nombre o Razón social:</label>
                <input type="text" v-model="formData.business_name" id="name" required>
            </div>
            <div class="group mb-10">
                <label class="cl-brown" for="nit">Nit:</label>
                <input type="number" v-model="formData.nit" id="nit" required>
            </div>
            <div class="group mb-10">
                <label class="cl-brown" for="email">Correo electrónico:</label>
                <input type="email" v-model="formData.email" id="email" required>
            </div>
            <div class="group mb-10">
                <label class="cl-brown" for="phone">Teléfono:</label>
                <input type="tel" v-model="formData.phone" id="phone" required>
            </div>
            <div class="group mb-10">
                <label class="cl-brown" for="status">Estado:</label>
                <select id="status" v-model="formData.status" class="cl-brown w-100">
                    <option value="true">ACTIVO</option>
                    <option value="false">INACTIVO</option>
                </select>
            </div>
            <input type="submit" class="btn" id="submit">
        </form>
    </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Define reactive variables
const formData = ref({
    nit: '',
    business_name: '',
    email: '',
    phone: '',
    status: 'true',
    created_by: 1,
});

const charging = ref(false);
const API = 'http://localhost:8000';

const props = {
    client: null, 
};

const router = useRouter();
const route = useRoute();

let client = computed(() => props.client);

onBeforeMount(async () => {
    const { id } = route.params;

    if (id) {
        try {
            const response = await fetch(`${API}/clients/id/${id}`);

            if (response.ok) {
                client = true;
                
                const data = await response.json();
                
                formData.value = {
                    business_name: data[0].business_name,
                    nit: data[0].nit,
                    email: data[0].email,
                    phone: data[0].phone,
                    status: data[0].status ? 'true' : 'false',
                    created_by: 1,
                }
            } else {
                console.error('Failed to fetch client data');
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    }
});

watch(() => props.client, (newClient) => {
    if (newClient) {
        formData.value = {
            nit: newClient.nit,
            business_name: newClient.business_name,
            email: newClient.email,
            phone: newClient.phone,
            status: newClient.status ? 'true' : 'false',
            created_by: 1,
        };
    }
});

// Define methods
const clientsTable = () => {
    router.push('/clientes');
};

const validarForm = async () => {
    charging.value = true;

    try {
        const status = formData.value.status === 'true';

        const { id } = route.params;

        const data = {
            business_name: formData.value.business_name,
            nit: formData.value.nit,
            email: formData.value.email,
            phone: formData.value.phone,
            created_by: formData.value.created_by,
            status,
        };

        if (id) {
            await fetch(`${API}/clients/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            await fetch(`${API}/clients`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        clientsTable();
    } catch (error) {
        console.error('Error al procesar el formulario:', error);
        alert('Ocurrió un error al procesar el formulario');
    } finally {
        charging.value = false;
    }
};
</script>





<style>
#container {
    margin-top: 2.5%;
}

.w-100 {
    width: 100%;
}

#submit {
    width: 100%;
}
</style>
