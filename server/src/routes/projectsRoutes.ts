import { Router } from 'express';
import * as projectController from '../controllers/projectController.ts';

const projectRoutes = Router();

projectRoutes.get('/', projectController.getProject);
projectRoutes.post('/', projectController.createProject);

export default projectRoutes;
