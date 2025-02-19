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
