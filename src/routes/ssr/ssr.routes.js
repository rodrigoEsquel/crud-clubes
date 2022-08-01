/* eslint-disable import/extensions */
import { Router } from 'express';
import validateForm from '../../validateForm.js';
import {
  teams, getTeamByTla, createTeam, editTeam, deleteTeam, saveImage, loadForm,
} from '../../database.js';
import {
  renderList, renderTeamInView, renderOkTask, emptyTeam, handleEditForm, handleNewForm,
} from './callback-functions.js';

const router = Router();

router.get('/ssr/main', renderList());
router.get('/ssr/main/:id', renderTeamInView('team_show'));
router.get('/ssr/main/:id/edit', renderTeamInView('team_edit'));
router.get('/ssr/main/:id/delete', renderTeamInView('team_delete'));
router.get('/ssr/new', renderTeamInView('team_edit', emptyTeam));
router.post('/ssr/main/:id/edit', loadForm, handleEditForm(), renderOkTask());
router.post('/ssr/new', loadForm, handleNewForm(), saveImage('uploaded_file'), renderOkTask());

router.delete('/ssr/main/:id/delete', (req, res) => {
  try {
    deleteTeam(req.params.id);
    res.render('resultado_form', {
      layout: 'main',
      mensaje: 'Éxito!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('server_error', {
      layout: 'main',
    });
  }
});

export default router;
