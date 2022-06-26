// eslint-disable-next-line import/extensions
import database from './database.js';

export function validarName(name) {
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

export function validarEmail(email) {
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
export function validarWebsite(website) {
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

export function validarAreaName(areaName) {
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

export function validarTla(tla) {
  const tlaList = database.teams.map((elem) => elem.tla);
  const regex = /[A-Z]{3}/;
  if (tlaList.includes(tla)) {
    return {
      res: 'TLA must be unique',
      pass: false,
    };
  }
  if (!regex.test(tla)) {
    return {
      res: 'TLA should be 3 capital letters',
      pass: false,
    };
  }
  return {
    res: tla,
    pass: true,
  };
}
