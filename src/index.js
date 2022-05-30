import express from 'express';
import { create } from 'express-handlebars';
import fs from 'fs';

const app = express();
const PUERTO = 8080;
const hbs = create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './src/views/');

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
  });
});

app.get('/team/:id', (req, res) => {
  try {
    const equipos = fs.readFileSync('./src/data/equipos.db.json');
    res.render('team', {
      layout: 'main',
      data: equipos.filter((e) => (e.name?.replace(' ', '_') === req.params.id)),
    });
  } catch (error) {
    console.log(error);
    res.send(`404: "${req.params.id}" not found`);
  }
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
