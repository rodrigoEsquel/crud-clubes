import validateForm from '../../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam, saveImage, loadForm,
} from '../../database.js';

export const renderList = (req, res) => {
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

export const handleForm = (req, res, next) => {
  try {
    const { pass } = validateForm({ ...req.body });
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

export function renderTeamInView(view, team = 'default') {
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

export const emptyTeam = {
  name: '',
  tla: '',
  area: { name: '' },
  website: '',
  email: '',
};
