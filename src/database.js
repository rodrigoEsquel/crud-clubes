import fs from 'fs';
import multer from 'multer';

const DATA_BASE = './data/equipos.db.json';
const teams = JSON.parse(fs.readFileSync(DATA_BASE));

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, './public/img');
  },
  filename(req, file, next) {
    next(null, '_newCrest');
  },
});

const upload = multer({ storage });

function getUniqueId() {
  const maxId = 99999;
  const idList = teams.map((elem) => elem.id);
  const id = Math.floor(Math.random() * (maxId));
  if (idList.includes(id)) {
    return getUniqueId();
  }
  return id;
}

const Database = {

  saveImage: upload.single('uploaded_file'),

  loadForm: upload.none(),

  editCrestName: (name, extention) => fs.renameSync('./data/escudos/_newCrest', `./data/escudos/${name}${extention}`),

  getTeams: () => teams,

  getTeamByTla(tla) {
    const searchedTla = tla.toUpperCase();
    const fetchedTeam = teams.filter((team) => (team.tla === searchedTla));
    if (fetchedTeam.length === 1) {
      return fetchedTeam.pop();
    }
    return false;
  },

  deleteTeam(tla) {
    const newTeams = teams.filter((team) => (team.tla !== tla));
    fs.writeFileSync(DATA_BASE, JSON.stringify(newTeams));
  },

  writeTeam({
    name, email, website, area, tla, originalTla, crest,
  }) {
    const teamIndex = teams.findIndex((team) => (team.tla === originalTla.toUpperCase()));
    const newTeams = [...teams];
    const editedKeys = {
      area,
      name,
      tla,
      website,
      email,
    };
    if (crest) {
      editedKeys.crestUrl = `../../img/${tla}${/\.[a-z]*/.exec(crest.originalname)[0]}`;
    }
    newTeams[teamIndex] = {
      ...newTeams[teamIndex],
      ...editedKeys,
    };
    fs.writeFileSync(DATA_BASE, JSON.stringify(newTeams));
  },

  createTeam({
    name, email, website, areaName, tla,
  }) {
    const newTeam = {
      id: getUniqueId,
      area: {
        name: areaName,
      },
      name,
      tla,
      crestUrl: `img${tla}`,
      website,
      email,
    };
    fs.writeFileSync(DATA_BASE, JSON.stringify(teams.push(newTeam)));
  },
};

export default Database;
