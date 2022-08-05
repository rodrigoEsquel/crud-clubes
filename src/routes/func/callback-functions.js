import db from '../../database/database.js';

const {
  getTeams, getTeamByTla,
  editTeam, createTeam, deleteTeam,
  saveImage, editCrestName, deleteCrest,
} = db;

const emptyTeam = {
  name: '',
  tla: '',
  area: { name: '' },
  website: '',
  email: '',
};

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
          ? getTeamByTla(req.params.id)
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
        response.crest = req.file;
        const fileName = req.body.tla;
        const extension = /\.[a-z]*/.exec(req.file.originalname)[0];
        if (response.crest) {
          editCrestName(fileName, extension);
        }
        if (pass) {
          createTeam(response);
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
        const { pass, response } = validateForm({ ...req.body, task: 'edit' });
        response.crest = req.file;
        response.originalTla = req.params.id;
        if (response.crest) {
          const fileName = req.body.tla;
          const extension = /\.[a-z]*/.exec(req.file.originalname)[0];
          editCrestName(fileName, extension);
        }
        if (pass) {
          editTeam(response);
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
