import prisma from '../config/database';

export class CategorieService {
  async createCategorie(data: {
    nom: string;
    icone: string;
    description: string;
    ordre?: number;
  }) {
    return await prisma.categorie.create({
      data: {
        ...data,
        ordre: data.ordre || 0
      }
    });
  }

  async getAllCategories() {
    return await prisma.categorie.findMany({
      orderBy: { ordre: 'asc' }
    });
  }

  async getCategorieById(id: string) {
    return await prisma.categorie.findUnique({
      where: { id }
    });
  }

  async updateCategorie(id: string, data: Partial<{
    nom: string;
    icone: string;
    description: string;
    ordre: number;
  }>) {
    return await prisma.categorie.update({
      where: { id },
      data
    });
  }

  async deleteCategorie(id: string) {
    return await prisma.categorie.delete({
      where: { id }
    });
  }
}