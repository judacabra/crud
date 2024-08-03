<template>
    <div class="container">
        <form @submit.prevent="validar">
            <h2 class="mb-10 cl-brown">INICIAR SESIÓN</h2>
            <div class="group mb-10">
                <label for="username" class="cl-brown">Nombre de usuario:</label>
                <input v-model="formData.username" id="username" type="text">
            </div>
            <div class="group mb-10">
                <label for="password" class="cl-brown">Contraseña:</label>
                <input v-model="formData.password" id="password" type="password">
            </div>
            <input type="submit" id="submit" class="btn" value="INGRESAR">
        </form>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

export default {
    setup() {
        const formData = reactive({
            username: '',
            password: '',
        });

        const API = 'http://localhost:8000';
        const router = useRouter();

        const validar = async () => {
            const { username, password } = formData;

            try {
                const response = await fetch(`${API}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (response.status === 200) {
                    router.push('/clientes');
                } else {
                    alert('Usuario o Contraseña Incorrectos.');
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
                alert('Hubo un error al procesar la solicitud.');
            }
        };

        return {
            formData,
            validar,
        };
    },
};
</script>

<style>
    * {
        font-family: 'Century gothic';
    }

    h2 {
        margin-top: 0;
    }

    input, select {
        border: #9b6565 solid 0.5px;
        border-radius: 10px;
        padding: 3%;
        width: 94%;
        outline: none;
    }

    .container {
        width: 20%;
        padding: 2%;
        margin: 10% auto auto;
        border-radius: 15px;
        box-shadow: #9b6565 0 0 30px;
    }

    .group {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .btn {
        height: 40px;
        font-family: 'Century gothic';
        padding: 0 5%;
        font-size: 15px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 10px;
        border: #9b6565 solid 0.5px;
        background: #9b6565;
        color: #ffffff;
    }

    .btn:hover {
        background: #725c5c;
    }

    .cl-brown {
        color: #9b6565;
    }

    .mb-10 {
        margin-bottom: 10%;
    }
</style>