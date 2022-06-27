/* eslint-disable import/extensions */
import { Router } from 'express';
import validateForm from '../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam, saveImage,
} from '../database.js';

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
      res.render('team_show', {
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
      res.render('team_edit', {
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

router.get('/ssr/main/:id/delete', (req, res) => {
  try {
    const fetchedTeam = getTeamByTla(req.params.id);
    if (fetchedTeam) {
      res.render('team_delete', {
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
    const emptyTeam = {
      name: '',
      tla: '',
      area: { name: '' },
      website: '',
      email: '',
    };
    res.render('team_edit', {
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
  const { pass, response } = validateForm({ ...req.body });
  console.log('req.body', req);
  console.log('pass', res);
  console.log('response', response);
  try {
    if (pass) {
      editTeam({ ...response, originalTla: req.params.id });
      res.render('resultado_form', {
        layout: 'main',
        mensaje: 'Éxito!',
      });
    } else {
      const errorTeam = { ...response, area: { name: response.areaName } };
      res.render('team_edit', {
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

router.post(
  '/ssr/new',
  (req, res, next) => {
    console.log('req.body', req.body);
    try {
      const { pass, response } = validateForm({ ...req.body, task: 'edit' });
      if (pass) {
        createTeam(response);
        next();
      } else {
        const errorTeam = { ...response, area: { name: response.areaName } };
        res.render('team_edit', {
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
  },

  saveImage('uploaded_file'),

  (req, res) => {
    try {
      res.render('resultado_form', {
        layout: 'main',
        mensaje: 'Éxito!',
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('server_error', {
        layout: 'main',
      });
    }
  },
);

router.delete('/ssr/main/:id/delete', (req, res) => {
  try {
    deleteTeam(req.params.id);
    res.render('resultado_form', {
      layout: 'main',
      mensaje: 'Éxito!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

export default router;
