// eslint-disable-next-line import/extensions
import db from '../database/database.js';

export function validateName(name) {
  const regexFC = / FC$/;
  if (!regexFC.test(name)) {
    return {
      res: 'Name should finish with " FC"',
      pass: false,
    };
  }
  const regexCapitalLetter = /^[A-Z]/;
  if (!regexCapitalLetter.test(name)) {
    return {
      res: 'Name should start with capital letter',
      pass: false,
    };
  }
  return {
    res: name,
    pass: true,
  };
}

export function validateEmail(email) {
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return {
      res: 'Unvalid Email',
      pass: false,
    };
  }
  return {
    res: email,
    pass: true,
  };
}
export function validateWebsite(website) {
  if (!/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(website)) {
    return {
      res: 'Unvalid website adress',
      pass: false,
    };
  }
  return {
    res: website,
    pass: true,
  };
}

export function validateAreaName(areaName) {
  if (areaName !== 'England') {
    return {
      res: 'Area name should be England',
      pass: false,
    };
  }
  return {
    res: areaName,
    pass: true,
  };
}

export function validateTla(tla, task) {
  const regex = /^[A-Z]{3}$/;
  if (!regex.test(tla)) {
    return {
      res: 'TLA should be 3 capital letters',
      pass: false,
    };
  }
  const teams = db.getTeams();
  const tlaList = teams.map((elem) => elem.tla);
  if (tlaList.includes(tla) && (task !== 'edit')) {
    return {
      res: 'TLA must be unique',
      pass: false,
    };
  }
  return {
    res: tla,
    pass: true,
  };
}
