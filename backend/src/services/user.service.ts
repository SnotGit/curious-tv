import prisma from '../config/database';

export class UserService {
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async addFavori(userId: string, videoId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    if (user.favoris.includes(videoId)) {
      throw new Error('Vidéo déjà dans les favoris');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        favoris: [...user.favoris, videoId]
      }
    });
  }

  async removeFavori(userId: string, videoId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        favoris: user.favoris.filter(id => id !== videoId)
      }
    });
  }

  async getFavoris(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoris: true }
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return await prisma.video.findMany({
      where: {
        id: { in: user.favoris }
      },
      include: { stats: true }
    });
  }
}