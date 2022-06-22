import {
  validarName, validarEmail, validarWebsite, validarAreaName, validarTla,
// eslint-disable-next-line import/extensions
} from './validate-data.js';

export default function validateForm({
  name, email, website, areaName, tla, task, // TODO generar unique ID para verificar si ante una edicion estoy trabajando sobre el mismo o sobre uno nuevo
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
    webpage: validarWebsite(website).res,
    area_name: validarAreaName(areaName).res,
    tla: validarTla(tla).res,
  };
  return {
    pass,
    response,
  };
}
