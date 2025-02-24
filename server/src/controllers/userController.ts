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
export const getUser: ControllerFunctionType = async (req, res) => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
    });
    if(!user)return res.status(404).send("User not found")

    return res.status(200).json({ user });
  } catch (err: any) {
    res.status(500).json({ message: `Error retriving user: ${err.message}` });
  }
};

export const createUser: ControllerFunctionType = async (req, res) => {
  try {
    const { username, cognitoId, profilePictureUrl = 'i1.jpg', teamId = 1 } = req.body;

    const newUser = await prisma.user.create({
      data: { username, cognitoId, profilePictureUrl, teamId },
    });

    return res.status(200).json({ message: 'User created sucessfully', newUser });
  } catch (err: any) {
    res.status(500).json({ message: `Error creating user: ${err.message}` });
  }
};
