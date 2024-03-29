import { Router, json } from 'express';
import cors from 'cors';
import controller from '../controllers/v1controller.js';
import database from '../database/database.js';

const router = Router();

const { saveImage } = database;
const {
  getAllTeams,
  getTeam,
  createTeam,
  editTeam,
  deleteTeam,
} = controller;

router.use(json());
router.use(cors());

router.get('/v1', getAllTeams);
router.post('/v1', saveImage, createTeam);
router.get('/v1/:teamTla', getTeam);
router.post('/v1/:teamTla', saveImage, editTeam);
router.delete('/v1/:teamTla', deleteTeam);

export default router;
