import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTeams: ControllerFunctionType = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const teams = await prisma.team.findMany({
      skip,
      take: limit,
    });

    const teamsWithNames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });
        return {
          ...team,
          productOwner: productOwner?.username,
          projectManager: projectManager?.username,
        };
      }),
    );

    const total = await prisma.team.count();

    return res.status(200).json({ teams: teamsWithNames, total });
  } catch (err: any) {
    res.status(500).json({ message: `Error retriving tasks: ${err.message}` });
  }
};
