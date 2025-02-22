import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers: ControllerFunctionType = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await prisma.user.findMany({
      skip,
      take: limit,
    });

    const total = await prisma.user.count();

    return res.status(200).json({ users, total });
  } catch (err: any) {
    res.status(500).json({ message: `Error retriving tasks: ${err.message}` });
  }
};
