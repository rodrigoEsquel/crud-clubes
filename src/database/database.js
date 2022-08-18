import fs from 'fs';
import multer from 'multer';

const dataBase = './data/equipos.db.json';
const imgFolder = './public/img/';

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, imgFolder);
  },
  filename(req, file, next) {
    next(null, '_newCrest');
  },
});

const upload = multer({ storage });

function getTeams() {
  return JSON.parse(fs.readFileSync(dataBase));
}

function getUniqueId() {
  const maxId = 99999;
  const teams = getTeams();
  const idList = teams.map((elem) => elem.id);
  const id = Math.floor(Math.random() * (maxId));
  if (idList.includes(id)) {
    return getUniqueId();
  }
  return id;
}

const Database = {

  saveImage: upload.single('uploaded_file'),

  editCrestName: (name, extention) => fs.renameSync(`${imgFolder}_newCrest`, `${imgFolder}${name}${extention}`),

  deleteCrest: (name, extention) => fs.unlink(`${imgFolder}${name}${extention}`),

  getTeams,

  getTeamByTla(tla) {
    const searchedTla = tla.toUpperCase();
    const teams = getTeams();
    const fetchedTeam = teams.filter((team) => (team.tla === searchedTla));
    if (fetchedTeam.length === 1) {
      return fetchedTeam.pop();
    }
    return false;
  },

  deleteTeam(tla) {
    const teams = getTeams();
    const newTeams = teams.filter((team) => (team.tla !== tla));
    fs.writeFileSync(dataBase, JSON.stringify(newTeams));

    const dirCont = fs.readdirSync(imgFolder);
    const teamCrestRegex = new RegExp(`${tla}.[a-b]*`, 'i');
    const teamCrestFile = dirCont.filter((elm) => elm.match(teamCrestRegex)).pop();
    if (teamCrestFile) {
      fs.unlinkSync(imgFolder + teamCrestFile);
    }
  },

  editTeam({
    name, email, website, area, tla, crestUrl,
  }, originalTla) {
    const teams = getTeams();
    const teamIndex = teams.findIndex((team) => (team.tla === originalTla.toUpperCase()));
    const newTeams = [...teams];
    const editedKeys = {
      area,
      name,
      tla,
      website,
      email,
    };
    if (crestUrl) {
      editedKeys.crestUrl = crestUrl;
    }
    newTeams[teamIndex] = {
      ...newTeams[teamIndex],
      ...editedKeys,
    };
    fs.writeFileSync(dataBase, JSON.stringify(newTeams));
  },

  createTeam({
    name, email, website, area, tla, crest,
  }) {
    const teams = getTeams();
    const newTeam = {
      id: getUniqueId,
      area,
      name,
      tla,
      website,
      email,
      crestUrl: `../../img/${tla}${/\.[a-z]*/.exec(crest.originalname)[0]}`,
    };
    fs.writeFileSync(dataBase, JSON.stringify([...teams, newTeam]));
  },
};

export default Database;
