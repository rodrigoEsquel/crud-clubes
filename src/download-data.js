import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const API_TOKEN = process.env.API_FOOTBALL_DATA;
const API_BASE = 'http://api.football-data.org/v2';
const ENGLAND_ID = 2021;

async function obtenerEquipos() {
  console.log('obteniendo equipos...');
  const resultado = await axios.get(`${API_BASE}/competitions/${ENGLAND_ID}/teams`, {
    headers: { 'X-Auth-Token': API_TOKEN },
  });
  return resultado.data.teams;
}

async function obtenerPlantel(id) {
  console.log(`obteniendo plantel id ${id}...`);
  const respuesta = await axios.get(`${API_BASE}/teams/${id}`, {
    headers: { 'X-Auth-Token': API_TOKEN },
  });

  return respuesta.data;
}

async function iniciar() {
  const DIRECTORIO = './src/data';
  const archivo = `${DIRECTORIO}/equipos.json`;

  let equipos;

  if (!fs.existsSync(archivo)) {
    equipos = await obtenerEquipos();
    fs.writeFileSync(archivo, JSON.stringify(equipos));
  }

  equipos = JSON.parse(fs.readFileSync(archivo));

  equipos.forEach(async (equipo) => {
    const archivoPlantel = `${DIRECTORIO}/equipos/${equipo.tla}.json`;

    if (!fs.existsSync(archivoPlantel)) {
      fs.writeFileSync(archivoPlantel, JSON.stringify(await obtenerPlantel(equipo.id)));
    }
  });
}

iniciar();

export default iniciar;
