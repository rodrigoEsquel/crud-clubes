/* eslint-disable import/extensions */
import { Router } from 'express';
import multer from 'multer';
import validateForm from '../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam,
} from '../database.js';

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, './data/escudos');
  },
  filename(req, file, next) {
    next(null, file.fieldname + req.body.tla);
  },
});

const upload = multer({ storage });
const router = Router();

router.get('/ssr/main', (req, res) => {
  try {
    res.render('list', {
      layout: 'main',
      teams,
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.get('/ssr/main/:id', (req, res) => {
  try {
    const fetchedTeam = getTeamByTla(req.params.id);
    if (fetchedTeam) {
      res.render('team', {
        layout: 'main',
        team: fetchedTeam,
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
    const fetchedTeam = getTeamByTla(req.params.id);
    if (fetchedTeam) {
      res.render('team_form', {
        layout: 'main',
        team: fetchedTeam,
      });
    } else {
      res.status(404).render('404', {
        layout: 'main',
        param: req.params.id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.get('/ssr/new', (req, res) => {
  try {
    deleteTeam('LIV');
    const emptyTeam = {
      name: '',
      tla: '',
      area: { name: '' },
      website: '',
      email: '',
    };
    res.render('team_form', {
      layout: 'main',
      team: emptyTeam,
    });
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.post('/ssr/main/:id/edit', (req, res) => {
  const { pass, response } = validateForm({ ...req.body, originalTla: req.params.id });
  try {
    if (pass) {
      editTeam({ ...response, originalTla: req.params.id });
      res.render('resultado_form', {
        layout: 'main',
        mensaje: 'Éxito!',
      });
    } else {
      const errorTeam = { ...response, area: { name: response.areaName } };
      res.render('team_form', {
        layout: 'main',
        team: errorTeam,
      });
    }
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

router.post('/ssr/new', (req, res) => {
  try {
    const { pass, response } = validateForm({ ...req.body, task: 'edit' });
    if (pass) {
      createTeam(response);
      res.render('resultado_form', {
        layout: 'main',
        mensaje: 'Éxito!',
      });
    } else {
      const errorTeam = { ...response, area: { name: response.areaName } };
      res.render('team_form', {
        layout: 'main',
        team: errorTeam,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
}, upload.single('uploaded_file'));

export default router;
