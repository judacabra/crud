const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');
const app = express();
const port = 8000;

// BD Config 
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'crud',
    password: 1234,
    port: 5432,
});

const corsOptions = {
    origin: '*', 
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Settings Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API CRUD',
            version: '1.0.0',
            description: 'API CRUD for clients',
            contact: {
                email: 'jcaicedo@hotmail.es',
                name: 'Julian Caicedo',
                phone: 3057506743,
            },
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./index.js'], // Rutas de la API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/*
    @author: jcaicedo
    @module: REGISTER 
    @method: POST
*/
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await pool.query('SELECT create_user($1, $2, $3)', [username, password, email]);
        res.status(201).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registrando usuario');
    }
});

/*
    @author: jcaicedo
    @module: LOGIN 
    @method: POST 
*/
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT authenticate_user($1, $2)', [username, password]);
        if (result.rows[0].authenticate_user) {
            res.status(200).send('Autenticación exitosa');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error autenticando usuario');
    }
});

/*
    @author: jcaicedo
    @module: CLIENTS 
    @method: POST  
    @action: CREATE CLIENT
*/
app.post('/clients', async (req, res) => {
    const { nit, business_name, email, phone, created_by } = req.body;

    try {
        await pool.query('SELECT create_client($1, $2, $3, $4, $5)', [nit, business_name, email, phone, created_by]);
        res.status(201).send('Cliente creado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando cliente');
    }
});

/*
    @author: jcaicedo
    @module: CLIENTS 
    @method: GET 
    @action: SELECT * CLIENTS
*/
app.get('/clients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_clients()');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error obteniendo clientes');
    }
});

/*
    @author: jcaicedo
    @module: CLIENTS 
    @method: GET 
    @action: SELECT CLIENT BY 1
*/
app.get('/clients/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM clients WHERE id = ($1)', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error obteniendo cliente');
    }
});

/*
    @author: jcaicedo
    @module: CLIENTS 
    @method: PUT | UPDATE
*/
app.put('/clients/:id', async (req, res) => {
    const client_id = req.params.id;
    const { nit, business_name, email, phone, status } = req.body;
    try {
        await pool.query('SELECT update_client($1, $2, $3, $4, $5, $6)', [client_id, nit, business_name, email, phone, status]);
        res.status(200).send('Cliente actualizado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error actualizando cliente');
    }
});

/*
    @author: jcaicedo
    @module: CLIENTS 
    @method: DELETE | DELETE
*/
app.delete('/clients/:id', async (req, res) => {
    const client_id = req.params.id;
    try {
        await pool.query('SELECT delete_client($1)', [client_id]);
        res.status(200).send('Cliente borrado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error borrando cliente');
    }
});

app.listen(port, ()=>{
    console.log(`Server is running at http:localhost:${port}`);
});