import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRoutes from './routes/projectsRoutes.ts';
import taskRoutes from './routes/tasksRoutes.ts';
import searchRoutes from './routes/searchRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import teamRoutes from './routes/teamRoutes.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
// const databaseURL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
  }),
);

app.get('/', (_req, res) => {
  res.send('This is home route');
});
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/search', searchRoutes);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SERVER RUN ON PORT: ${PORT}`);
});
