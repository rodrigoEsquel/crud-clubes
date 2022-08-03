/* eslint-disable import/extensions */
import { Router } from 'express';
import cb from '../../callback-functions.js';

const router = Router();

const {
  renderList, renderTeamInView, renderOkTask,
  handleEditForm, handleNewForm, handleDeleteTeam,
  saveImage, loadForm,
} = cb;

router.get('/ssr/main', renderList());
router.get('/ssr/main/:id', renderTeamInView('team_show'));
router.get('/ssr/main/:id/edit', renderTeamInView('team_edit'));
router.get('/ssr/main/:id/delete', renderTeamInView('team_delete'));
router.get('/ssr/new', renderTeamInView('team_edit', 'emptyTeam'));
router.post('/ssr/main/:id/edit', saveImage, handleEditForm(), renderOkTask());
router.post('/ssr/new', loadForm, handleNewForm(), saveImage, renderOkTask());
router.delete('/ssr/main/:id/delete', handleDeleteTeam(), renderOkTask());

export default router;
