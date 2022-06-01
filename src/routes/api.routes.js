import { Router } from 'express';
import fs from 'fs';

const router = Router();
const DIRECTORIO = './src';
const DATA_BASE = `${DIRECTORIO}/data/equipos.db.json`;

router.get('/api/', (req, res) => {
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

router.get('/api/:id', (req, res) => {
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

export default router;
