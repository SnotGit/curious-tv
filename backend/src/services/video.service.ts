import prisma from '../config/database';

export class VideoService {
  async createVideo(data: {
    titre: string;
    description: string;
    urlYoutube: string;
    categorie: string;
    datePublication: Date;
    duree: number;
    thumbnail: string;
    statut?: 'BROUILLON' | 'PUBLIE' | 'PROGRAMME';
    tags?: string[];
  }) {
    return await prisma.video.create({
      data: {
        ...data,
        statut: data.statut || 'BROUILLON',
        tags: data.tags || []
      }
    });
  }

  async getAllVideos(statut?: 'BROUILLON' | 'PUBLIE' | 'PROGRAMME') {
  const where = statut ? { statut: statut } : { statut: 'PUBLIE' as const };
  return await prisma.video.findMany({
    where,
    include: { stats: true },
    orderBy: { datePublication: 'desc' }
  });
}

  async getVideoById(id: string) {
    return await prisma.video.findUnique({
      where: { id },
      include: { stats: true }
    });
  }

  async getVideosByCategorie(categorie: string) {
    return await prisma.video.findMany({
      where: { categorie, statut: 'PUBLIE' },
      include: { stats: true },
      orderBy: { datePublication: 'desc' }
    });
  }

  async searchVideos(query: string) {
    return await prisma.video.findMany({
      where: {
        AND: [
          { statut: 'PUBLIE' },
          {
            OR: [
              { titre: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { tags: { has: query } }
            ]
          }
        ]
      },
      include: { stats: true },
      orderBy: { datePublication: 'desc' }
    });
  }

  async updateVideo(id: string, data: Partial<{
    titre: string;
    description: string;
    urlYoutube: string;
    categorie: string;
    datePublication: Date;
    duree: number;
    thumbnail: string;
    statut: 'BROUILLON' | 'PUBLIE' | 'PROGRAMME';
    tags: string[];
  }>) {
    return await prisma.video.update({
      where: { id },
      data
    });
  }

  async deleteVideo(id: string) {
    return await prisma.video.delete({
      where: { id }
    });
  }
}