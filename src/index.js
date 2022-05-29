import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const PUERTO = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
