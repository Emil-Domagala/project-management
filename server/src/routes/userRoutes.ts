import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const userRoutes = Router();

userRoutes.get('/', userController.getUsers);
userRoutes.post('/create-user', userController.createUser);
userRoutes.get('/:cognitoId', userController.getUser);

export default userRoutes;
