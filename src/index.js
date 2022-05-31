import express from 'express';
import { create } from 'express-handlebars';
// eslint-disable-next-line import/extensions
import ssrRoutes from './routes/ssr.routes.js';

const app = express();
const hbs = create();
const PUERTO = 8080;
const DIRECTORIO = './src';

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', `${DIRECTORIO}/views/`);

app.use(ssrRoutes);

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
