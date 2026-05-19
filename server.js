const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const VERCEL_TOKEN = "vck_0cGGRpSdlDrb458Cp3kybW4HAZCKmpe8WumrDYsDlxH14vSAD1VEqwN";

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch('https://api.vercel.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + VERCEL_TOKEN
            },
            body: JSON.stringify({ model: "gpt-4o", messages: req.body.messages })
        });
        const textoCrudo = await response.text();
        try {
            res.json(JSON.parse(textoCrudo));
        } catch (err) {
            res.json({ choices: [{ message: { content: textoCrudo } }] });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Abre la puerta grande para recibir la conexión de tu computadora
app.listen(3000, '0.0.0.0', () => {
    console.log("🚀 MÁQUINA ENCENDIDA: ESCUCHANDO EN EL PUERTO 3000");
});
