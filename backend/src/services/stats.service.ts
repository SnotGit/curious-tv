import prisma from '../config/database';

export class StatsService {
  async incrementVues(videoId: string) {
    const existingStats = await prisma.stats.findUnique({
      where: { videoId }
    });

    if (existingStats) {
      return await prisma.stats.update({
        where: { videoId },
        data: { vues: existingStats.vues + 1 }
      });
    }

    return await prisma.stats.create({
      data: {
        videoId,
        vues: 1,
        favoris: 0
      }
    });
  }

  async incrementFavoris(videoId: string) {
    const existingStats = await prisma.stats.findUnique({
      where: { videoId }
    });

    if (existingStats) {
      return await prisma.stats.update({
        where: { videoId },
        data: { favoris: existingStats.favoris + 1 }
      });
    }

    return await prisma.stats.create({
      data: {
        videoId,
        vues: 0,
        favoris: 1
      }
    });
  }

  async decrementFavoris(videoId: string) {
    const existingStats = await prisma.stats.findUnique({
      where: { videoId }
    });

    if (existingStats && existingStats.favoris > 0) {
      return await prisma.stats.update({
        where: { videoId },
        data: { favoris: existingStats.favoris - 1 }
      });
    }

    return existingStats;
  }

  async getStatsByVideoId(videoId: string) {
    return await prisma.stats.findUnique({
      where: { videoId }
    });
  }

  async getAllStats() {
    return await prisma.stats.findMany({
      include: {
        video: {
          select: {
            titre: true,
            categorie: true
          }
        }
      },
      orderBy: { vues: 'desc' }
    });
  }
}