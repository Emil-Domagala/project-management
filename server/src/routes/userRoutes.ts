import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const userRoutes = Router();

userRoutes.get('/', userController.getUsers);


export default userRoutes;
