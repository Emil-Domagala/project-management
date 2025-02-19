import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import projectRoutes from './routes/projectsRoutes.ts';
import taskRoutes from './routes/tasksRoutes.ts';

const app = express();
const PORT = process.env.PORT || 3000;
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

app.listen(PORT, () => {
  console.log(`SERVER RUN ON PORT: ${PORT}`);
});
