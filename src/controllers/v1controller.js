import services from '../services/v1services.js';
import validateForm from '../validation/validateForm.js';
import Team from '../classes/team.js';

const getAllTeams = (req, res) => {
  const allTeams = services.getAllTeams();
  res.send({ status: 'OK', data: allTeams });
};

const getTeam = async (req, res) => {
  const team = services.getTeam(req.params.teamTla);
  res.send({ status: 'OK', data: team });
};

const createTeam = (req, res) => {
  const { pass, response } = validateForm({ ...req.body });
  response.crestUrl = services.handleCrest(req.file, req.body.tla, pass);
  if (!pass) {
    return;
  }
  const newTeam = new Team(response);
  const createdTeam = services.createTeam(newTeam);
  res.send({ status: 'OK', data: createdTeam });
};

const editTeam = (req, res) => {
  const { pass, response } = validateForm({ ...req.body }, 'edit');
  response.crestUrl = services.handleCrest(req.file, req.body.tla, pass);
  if (!pass) {
    res.send({ status: 'ERROR', data: response });
  }
  const newTeam = new Team(response);
  const originalTla = req.params.teamTla;
  const editedTeam = services.editTeam(newTeam, originalTla);
  res.send({ status: 'OK', data: editedTeam });
};

const deleteTeam = (req, res) => {
  services.deleteTeam(req.params.teamTla);
  res.send(`${req.params.teamTla} deleted`);
};

const validateCreateForm = (req, res, next) => {
  const { pass, response } = validateForm({ ...req.body });
  if (pass) {
    next();
  }
  res.send({ status: 'ERROR', data: response });
};

const validateEditForm = (req, res, next) => {
  const { pass, response } = validateForm({ ...req.body }, 'edit');
  if (pass) {
    next();
  }
  res.send({ status: 'ERROR', data: response });
};

const v1contoller = {
  getAllTeams,
  getTeam,
  createTeam,
  editTeam,
  deleteTeam,
  validateCreateForm,
  validateEditForm,
};

export default v1contoller;
