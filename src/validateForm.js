import {
  validarName, validarEmail, validarWebsite, validarAreaName, validarTla,
// eslint-disable-next-line import/extensions
} from './validate-data.js';

export default function validateForm({
  name, email, website, areaName, tla,
  // TODO unique ID para verificar edicion o nuevo equipo
}) {
  const pass = !!((
    validarName(name).pass
    && validarEmail(email).pass
    && validarWebsite(website).pass
    && validarAreaName(areaName).pass
    && validarTla(tla).pass
  ));
  const response = {
    name: validarName(name).res,
    email: validarEmail(email).res,
    website: validarWebsite(website).res,
    areaName: validarAreaName(areaName).res,
    tla: validarTla(tla).res,
  };
  return {
    pass,
    response,
  };
}
