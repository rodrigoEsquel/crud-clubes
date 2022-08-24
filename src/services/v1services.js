import database from '../database/database.js';
import getExtension from '../utilities/getFileExtension.js';

const getAllTeams = () => {
  const allTeams = database.getTeams();
  return allTeams;
};

const getTeam = (tla) => {
  const team = database.getTeamByTla(tla, database.getTeams());
  return team;
};

const createTeam = (newTeam) => {
  const createdTeam = database.createTeam(newTeam);
  return createdTeam;
};

const editTeam = (newTeam, originalTla) => {
  const editedTeam = database.editTeam(newTeam, originalTla);
  return editedTeam;
};

const deleteTeam = (tla) => {
  database.deleteTeam(tla);
};

const handleCrest = (file, tla, pass) => {
  if (file) {
    const fileExtension = getExtension(file.originalname);
    database.editCrestName(tla, fileExtension);
    if (pass) {
      return `/img/${tla}${fileExtension}`;
    }
    database.deleteCrest(tla, fileExtension);
  }
  return undefined;
};

const services = {
  getAllTeams,
  getTeam,
  createTeam,
  editTeam,
  deleteTeam,
  handleCrest,
};

export default services;
