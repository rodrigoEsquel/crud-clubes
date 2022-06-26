import fs from 'fs';
import multer from 'multer';

const DATA_BASE = './data/equipos.db.json';
export const teams = JSON.parse(fs.readFileSync(DATA_BASE));

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, './data/escudos');
  },
  filename(req, file, next) {
    next(null, file.fieldname + req.body.tla);
  },
});

const upload = multer({ storage });
export function saveImage(image) { return upload.single(image); }

function getUniqueId() {
  const maxId = 99999;
  const idList = teams.map((elem) => elem.id);
  const id = Math.floor(Math.random() * (maxId));
  if (idList.includes(id)) {
    return getUniqueId();
  }
  return id;
}

export function createTeam({
  name, email, website, areaName, tla,
}) {
  const newTeam = {
    id: getUniqueId,
    area: {
      name: areaName,
    },
    name,
    tla,
    crestUrl: `/data/escudos${tla}`,
    website,
    email,
  };
  fs.writeFileSync(DATA_BASE, JSON.stringify(teams.push(newTeam)));
}

export function editTeam({
  name, email, website, areaName, tla, originalTla,
}) {
  const index = teams.findIndex((team) => (team.tla === originalTla.toUpperCase()));
  const newTeams = [...teams];
  newTeams[index] = {
    ...newTeams[index],
    area: {
      name: areaName,
    },
    name,
    tla,
    crestUrl: `/data/escudos${tla}`,
    website,
    email,
  };
  fs.writeFileSync(DATA_BASE, JSON.stringify(newTeams));
}

export function deleteTeam(tla) {
  const newTeams = teams.filter((team) => (team.tla !== tla));
  fs.writeFileSync(DATA_BASE, JSON.stringify(newTeams));
}

export function getTeamByTla(tla) {
  const searchedTla = tla.toUpperCase();
  const fetchedTeam = teams.filter((team) => (team.tla === searchedTla));
  if (fetchedTeam.length === 1) {
    return fetchedTeam.pop();
  }
  return false;
}
