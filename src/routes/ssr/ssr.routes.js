/* eslint-disable import/extensions */
import { Router } from 'express';
import CB from './callback-functions.js';

const router = Router();

const {
  renderList, renderTeamInView, renderOkTask,
  handleEditForm, handleNewForm, handleDeleteTeam,
  saveImage, loadForm,
} = CB;

router.get('/ssr/main', renderList());
router.get('/ssr/main/:id', renderTeamInView('team_show'));
router.get('/ssr/main/:id/edit', renderTeamInView('team_edit'));
router.get('/ssr/main/:id/delete', renderTeamInView('team_delete'));
router.get('/ssr/new', renderTeamInView('team_edit', 'emptyTeam'));
router.post('/ssr/main/:id/edit', loadForm, handleEditForm(), renderOkTask());
router.post('/ssr/new', loadForm, handleNewForm(), saveImage('uploaded_file'), renderOkTask());
router.delete('/ssr/main/:id/delete', handleDeleteTeam(), renderOkTask());

export default router;
