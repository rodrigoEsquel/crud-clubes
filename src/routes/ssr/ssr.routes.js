/* eslint-disable import/extensions */
import { Router } from 'express';
import validateForm from '../../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam, saveImage, loadForm,
} from '../../database.js';

const router = Router();

const renderList = (req, res) => {
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
};

const handleForm = (req, res, next) => {
  const { pass } = validateForm({ ...req.body });
  try {
    if (pass) {
      try {
        res.render('resultado_form', {
          layout: 'main',
          mensaje: 'Éxito!',
        });
      } catch (error) {
        res.status(500).render('server_error', {
          layout: 'main',
        });
      }
    } else {
      try {
        res.render('resultado_form', {
          layout: 'main',
          mensaje: 'Éxito!',
        });
      } catch (error) {
        res.status(500).render('server_error', {
          layout: 'main',
        });
      }
    }
  } catch (error) {
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
};

function renderTeamInView(view, team = 'default') {
  return ((req, res) => {
    try {
      const fetchedTeam = (team === 'default'
        ? getTeamByTla(req.params.id)
        : team);
      if (fetchedTeam) {
        res.render(view, {
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
}
const emptyTeam = {
  name: '',
  tla: '',
  area: { name: '' },
  website: '',
  email: '',
};

router.get('/ssr/main', renderList);
router.get('/ssr/main/:id', renderTeamInView('team_show'));
router.get('/ssr/main/:id/edit', renderTeamInView('team_edit'));
router.get('/ssr/main/:id/delete', renderTeamInView('team_delete'));
router.get('/ssr/new', renderTeamInView('team_edit', emptyTeam));
router.post('/ssr/main/:id/edit', loadForm, handleForm);

/*
router.post('/ssr/main/:id/edit', loadForm(), (req, res) => {
  const { pass, response } = validateForm({ ...req.body });
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
*/

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
