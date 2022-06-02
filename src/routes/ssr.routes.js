import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';

const router = Router();
const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, './data/escudos');
  },
  filename(req, file, next) {
    next(null, req.body.tla);
  },
});

const upload = multer({ storage });
const DIRECTORIO = './src';
const DATA_BASE = `${DIRECTORIO}/data/equipos.db.json`;

router.get('/ssr/main', (req, res) => {
  try {
    const teams = JSON.parse(fs.readFileSync(DATA_BASE));
    const teamsData = teams.map(({
      name, tla, crestUrl, area,
    }) => (
      {
        tla,
        name,
        crestUrl,
        country: area.name,
      }));
    res.render('list', {
      layout: 'main',
      teams: teamsData,
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.get('/ssr/main/:id', (req, res) => {
  try {
    const teams = JSON.parse(fs.readFileSync(DATA_BASE));
    const teamSearched = req.params.id.toUpperCase();
    const teamFetched = teams.filter((team) => (team.tla === teamSearched));
    if (teamFetched.length === 1) {
      res.render('team', {
        layout: 'main',
        team: teamFetched[0],
      });
    } else {
      res.status(404).render('404', {
        layout: 'main',
        param: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.get('/ssr/main/:id/edit', (req, res) => {
  try {
    const teams = JSON.parse(fs.readFileSync(DATA_BASE));
    const teamSearched = req.params.id.toUpperCase();
    const teamFetched = teams.filter((team) => (team.tla === teamSearched));
    if (teamFetched.length === 1) {
      res.render('team_form', {
        layout: 'main',
        team: teamFetched[0],
      });
    } else {
      res.status(404).render('404', {
        layout: 'main',
        param: req.params.id,
      });
    }
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.get('/ssr/new', (req, res) => {
  try {
    res.render('team_form', {
      layout: 'main',
      team: {
        name: '',
        tla: '',
        area: { name: '' },
        website: '',
        email: '',
      },
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.post('/ssr/main/:id/edit', upload.single('imagen'), (req, res) => {
  try {
    console.log(req.body);
    res.render('exito', {
      layout: 'main',
      mensaje: 'Éxito!',
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.post('/ssr/new', upload.single('imagen'), (req, res) => {
  try {
    console.log(req.body);
    res.render('exito', {
      layout: 'main',
      mensaje: 'Éxito!',
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

export default router;
