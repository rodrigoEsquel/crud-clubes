import {
  validarName, validarEmail, validarWebsite, validarAreaName, validarTla,
// eslint-disable-next-line import/extensions
} from './validateData.js';

export default function validateForm({
  name, email, website, areaName, tla,
}, task = 'new') {
  const pass = !!((
    validarName(name).pass
    && validarEmail(email).pass
    && validarWebsite(website).pass
    && validarAreaName(areaName).pass
    && validarTla(tla, task).pass
  ));
  const response = {
    name: validarName(name).res,
    email: validarEmail(email).res,
    website: validarWebsite(website).res,
    area: { name: validarAreaName(areaName).res },
    tla: validarTla(tla, task).res,
  };
  return {
    pass,
    response,
  };
}
