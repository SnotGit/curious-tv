import prisma from '../config/database';

export class LiveService {
  
  // ======== CREATE LIVE =========
  
  async createLive(data: {
    titre: string;
    categorie: string;
    dateDebut: Date;
    description: string;
    thumbnail?: string;
    urlLive?: string;
  }) {
    return await prisma.prochaineSortie.create({
      data: {
        ...data,
        statut: 'A_VENIR'
      }
    });
  }

  // ======== GET ALL LIVES =========
  
  async getAllLives() {
    return await prisma.prochaineSortie.findMany({
      orderBy: { dateDebut: 'asc' }
    });
  }

  // ======== GET NEXT LIVE =========
  
  async getNextLive() {
    const now = new Date();
    return await prisma.prochaineSortie.findFirst({
      where: {
        statut: 'A_VENIR',
        dateDebut: { gte: now }
      },
      orderBy: { dateDebut: 'asc' }
    });
  }

  // ======== GET CURRENT LIVE =========
  
  async getCurrentLive() {
    return await prisma.prochaineSortie.findFirst({
      where: { statut: 'EN_COURS' }
    });
  }

  // ======== GET LIVE BY ID =========
  
  async getLiveById(id: string) {
    return await prisma.prochaineSortie.findUnique({
      where: { id }
    });
  }

  // ======== UPDATE LIVE =========
  
  async updateLive(id: string, data: Partial<{
    titre: string;
    categorie: string;
    dateDebut: Date;
    description: string;
    thumbnail: string;
    urlLive: string;
    statut: 'A_VENIR' | 'EN_COURS' | 'TERMINE';
  }>) {
    return await prisma.prochaineSortie.update({
      where: { id },
      data
    });
  }

  // ======== DELETE LIVE =========
  
  async deleteLive(id: string) {
    return await prisma.prochaineSortie.delete({
      where: { id }
    });
  }

  // ======== START LIVE =========
  
  async startLive(id: string, urlLive: string) {
    return await prisma.prochaineSortie.update({
      where: { id },
      data: {
        statut: 'EN_COURS',
        urlLive
      }
    });
  }

  // ======== END LIVE =========
  
  async endLive(id: string) {
    return await prisma.prochaineSortie.update({
      where: { id },
      data: { statut: 'TERMINE' }
    });
  }
}