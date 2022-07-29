import validateForm from '../../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam, saveImage, loadForm,
} from '../../database.js';

export function renderList() {
  return ((_req, res) => {
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
}

export function handleForm() {
  return ((req, res) => {
    try {
      const { pass, response } = validateForm({ ...req.body });
      if (pass) {
        editTeam(response);
        res.render('resultado_form', {
          layout: 'main',
          mensaje: 'Éxito!',
        });
      } else {
        res.render('team_edit', {
          layout: 'main',
          team: response,
        });
      }
    } catch (error) {
      console.log(error.mensaje);
      res.status(500).render('server_error', {
        layout: 'main',
      });
    }
  });
}

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
