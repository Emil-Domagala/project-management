import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks: ControllerFunctionType = async (req, res) => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
      include: { author: true, assignee: true, comments: true, attachments: true },
    });

    return res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ message: `Error retriving tasks: ${err.message}` });
  }
};

export const createTask: ControllerFunctionType = async (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });

    return res.status(201).json(newTask);
  } catch (err: any) {
    res.status(500).json({ message: `Error creating a task: ${err.message}` });
  }
};

export const updateTaskStatus: ControllerFunctionType = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status: status },
    });

    return res.status(200).json(updatedTask);
  } catch (err: any) {
    res.status(500).json({ message: `Error updating Task: ${err.message}` });
  }
};
