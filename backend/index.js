const express = require('express');

const app = express();

const port = 8000;

app.get('/', (req, res)=>{
    res.send('Hola soy la raiz.')
});

app.get('/clientes/consultar', (req, res)=>{
    res.send(`Todos los Clientes`);
});

app.put('/clientes/actualizar', (req, res)=>{
    const id = req.query.id;

    res.send(`Se actualizó el cliente ${id}`);
});

app.delete('/clientes/borrar', (req, res)=>{
    const id = req.query.id;

    res.send(`Se eliminó el cliente ${id}`);
});

app.listen(port, ()=>{
    console.log(`Server is running at http:localhost:${port}`);
});