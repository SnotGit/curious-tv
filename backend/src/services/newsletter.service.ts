import prisma from '../config/database';

export class NewsletterService {
  async subscribe(email: string) {
    const existing = await prisma.newsletter.findUnique({ where: { email } });
    
    if (existing) {
      if (existing.actif) {
        throw new Error('Email déjà inscrit');
      }
      return await prisma.newsletter.update({
        where: { email },
        data: { actif: true }
      });
    }

    return await prisma.newsletter.create({
      data: { email }
    });
  }

  async unsubscribe(email: string) {
    const existing = await prisma.newsletter.findUnique({ where: { email } });
    
    if (!existing) {
      throw new Error('Email non inscrit');
    }

    return await prisma.newsletter.update({
      where: { email },
      data: { actif: false }
    });
  }

  async getAllSubscribers() {
    return await prisma.newsletter.findMany({
      where: { actif: true },
      orderBy: { dateInscription: 'desc' }
    });
  }
}