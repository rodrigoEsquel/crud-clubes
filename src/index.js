import express from 'express';

const app = express();
const PUERTO = 8080;

app.listen(PUERTO);
console.log(`Escuchando en https://localhost:${PUERTO}`);
