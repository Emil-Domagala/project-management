import { Router } from 'express';
import * as searchController from '../controllers/searchController.ts';

const searchRoutes = Router();

searchRoutes.get('/', searchController.search);

export default searchRoutes;
