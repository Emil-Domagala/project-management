import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProject: ControllerFunctionType = async (_req, res) => {
  try {
    const projects = await prisma.project.findMany();
    return res.status(200).json(projects);
  } catch (err: any) {
    res.status(500).json({ message: `Error retriving project: ${err.message}` });
  }
};

export const createProject: ControllerFunctionType = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });

    return res.status(201).json(newProject);
  } catch (err: any) {
    res.status(500).json({ message: `Error creating a project: ${err.message}` });
  }
};
