import { Router } from 'express';
import * as taskController from '../controllers/taskController.ts';

const taskRoutes = Router();

taskRoutes.get('/', taskController.getTasks);
// taskRoutes.post('/', taskController.createProject);

export default taskRoutes;
