import validateForm from '../../validation/validateForm.js';
import db from '../../database/database.js';
import Team from '../../classes/team.js';

const {
  getTeams, getTeamByTla,
  editTeam, createTeam, deleteTeam,
  saveImage, editCrestName, deleteCrest,
} = db;

const emptyTeam = new Team({
  name: '',
  tla: '',
  area: '',
  website: '',
  email: '',
});

const routesFunctions = {

  saveImage,

  renderList() {
    return ((_req, res) => {
      try {
        res.render('list', {
          layout: 'main',
          teams: getTeams(),
        });
      } catch (error) {
        res.status(500).render('server_error', {
          layout: 'main',
        });
      }
    });
  },

  renderTeamInView(view, team = 'default') {
    return ((req, res) => {
      try {
        const fetchedTeam = (team === 'default'
          ? getTeamByTla(req.params.id, getTeams())
          : emptyTeam);
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
  },

  renderOkTask() {
    return ((_req, res) => {
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
    });
  },

  handleNewForm() {
    return ((req, res, next) => {
      try {
        const { pass, response } = validateForm({ ...req.body });
        const fileName = req.body.tla;
        const extension = /\.[a-z]*/.exec(req.file.originalname)[0];
        if (req.file) {
          response.crestUrl = `/img/${fileName}${extension}`;
          editCrestName(fileName, extension);
        }
        if (pass) {
          const newTeam = new Team(response);
          createTeam(newTeam);
          next();
        } else {
          deleteCrest(fileName, extension);
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
  },

  handleEditForm() {
    return ((req, res, next) => {
      try {
        const { pass, response } = validateForm({ ...req.body }, 'edit');
        const originalTla = req.params.id;
        if (req.file) {
          const fileName = req.body.tla;
          const extension = /\.[a-z]*/.exec(req.file.originalname)[0];
          response.crestUrl = `/img/${fileName}${extension}`;
          editCrestName(fileName, extension);
        }
        if (pass) {
          const editedTeam = new Team(response);
          editTeam(editedTeam, originalTla);
          next();
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
  },

  handleDeleteTeam() {
    return ((req, res, next) => {
      try {
        deleteTeam(req.params.id);
        next();
      } catch (error) {
        console.error(error);
        res.status(500).render('server_error', {
          layout: 'main',
        });
      }
    });
  },
};

export default routesFunctions;
