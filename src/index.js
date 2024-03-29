/* eslint-disable no-console */
import express from 'express';
import { create } from 'express-handlebars';
import morgan from 'morgan';
import ssrRoutes from './routes/ssr.routes.js';
import v1api from './routes/v1.routes.js';

const app = express();
const hbs = create();
const PUERTO = 8080;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views/');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(ssrRoutes);
app.use(v1api);

app.listen(PUERTO);
console.log(`Escuchando en http://localhost:${PUERTO}`);
console.log(`Server Side Render Site: http://localhost:${PUERTO}/ssr/main`);
