import { Router } from 'express';
import * as teamController from '../controllers/teamController.ts';

const teamRoutes = Router();

teamRoutes.get('/', teamController.getTeams);


export default teamRoutes;
