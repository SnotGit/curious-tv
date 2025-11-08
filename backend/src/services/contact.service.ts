import prisma from '../config/database';

export class ContactService {
  async createContact(data: {
    nom: string;
    email: string;
    sujet: string;
    message: string;
  }) {
    return await prisma.contact.create({
      data
    });
  }

  async getAllContacts() {
    return await prisma.contact.findMany({
      orderBy: { dateEnvoi: 'desc' }
    });
  }

  async getContactById(id: string) {
    return await prisma.contact.findUnique({
      where: { id }
    });
  }

  async markAsRead(id: string) {
    return await prisma.contact.update({
      where: { id },
      data: { lu: true }
    });
  }

  async deleteContact(id: string) {
    return await prisma.contact.delete({
      where: { id }
    });
  }
}