import {
  validateName, validateEmail, validateWebsite, validateAreaName, validateTla,
// eslint-disable-next-line import/extensions
} from './validateData.js';

export default function validateForm({
  name, email, website, areaName, tla,
}, task = 'new') {
  const pass = !!((
    validateName(name).pass
    && validateEmail(email).pass
    && validateWebsite(website).pass
    && validateAreaName(areaName).pass
    && validateTla(tla, task).pass
  ));
  const response = {
    name: validateName(name).res,
    email: validateEmail(email).res,
    website: validateWebsite(website).res,
    area: { name: validateAreaName(areaName).res },
    tla: validateTla(tla, task).res,
  };
  return {
    pass,
    response,
  };
}
