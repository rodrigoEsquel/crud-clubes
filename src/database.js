import fs from 'fs';

const DATA_BASE = './data/equipos.db.json';
const teams = JSON.parse(fs.readFileSync(DATA_BASE));

function createTeam() {}

function editTeam() {}

function getUniqueId() {
  const maxId = 99999;
  const idList = teams.map((elem) => elem.id);
  const id = Math.floor(Math.random() * (maxId));
  if (idList.includes(id)) {
    return getUniqueId();
  }
  return id;
}

const database = {
  teams,
  createTeam,
  editTeam,
  getUniqueId,
};

export default database;
