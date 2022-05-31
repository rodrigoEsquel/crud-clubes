import express from 'express';
import { create } from 'express-handlebars';
import fs from 'fs';

const app = express();
const hbs = create();
const PUERTO = 8080;
const DIRECTORIO = './src';
const DATA_BASE = `${DIRECTORIO}/data/equipos.db.json`;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${DIRECTORIO}/views/`);

app.get('/', (req, res) => {
  try {
    const teams = JSON.parse(fs.readFileSync(DATA_BASE));
    const teamsData = teams.map(({ name, tla }) => (
      {
        tla,
        name,
      }));
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(teamsData));
  } catch (error) {
    res.status(500).render('500', {
      layout: 'main',
    });
  }
});

app.get('/:id', (req, res) => {
  try {
    const teams = JSON.parse(fs.readFileSync(DATA_BASE));
    const teamSearched = req.params.id.toUpperCase();
    const teamFetched = teams.filter((team) => (team.tla === teamSearched));
    if (teamFetched.length === 1) {
      res.setHeader('Content-Type', 'text/plain');
      res.end(JSON.stringify(teamFetched));
    } else {
      res.status(404).render('404', {
        layout: 'main',
        data: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).render('500', {
      layout: 'main',
    });
  }
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
