const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public'))); 

let buses = {}; // { placa: { tiempo: string, ediciones: number } }

// Registrar o actualizar un bus
app.post('/buses Transmi', (req, res) => {
    const { placa, tiempo } = req.body;

    if (buses[placa]) {
        buses[placa].tiempo = tiempo;
        buses[placa].ediciones += 1;
        res.status(200).json({ message: 'Bus transmilenio actualizado' });
    } else {
        buses[placa] = { tiempo, ediciones: 0 };
        res.status(201).json({ message: 'Bus transmilenio registrado' });
    }
});

// Borrar un bus transmilenio
app.delete('/buses/:placa', (req, res) => {
    const { placa } = req.params;

    if (buses[placa]) {
        delete buses[placa];
        res.status(200).json({ message: 'Bus transmi borrado' });
    } else {
        res.status(404).json({ message: 'Bus transmi no encontrado' });
    }
});

// buscar un bus transmilenio
app.get('/transmilenio/:placa', (req, res) => {
    const { placa } = req.params;

    if (buses[placa]) {
        res.status(200).json(buses[placa]);
    } else {
        res.status(404).json({ message: 'Bus transmi no encontrado' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
