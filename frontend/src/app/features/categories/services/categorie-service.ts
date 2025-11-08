import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Categorie } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  categories = signal<Categorie[]>([]);
  selectedCategorie = signal<Categorie | null>(null);
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  // ======== LOAD ALL CATEGORIES =========

  loadCategories() {
    this.loading.set(true);
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement catégories', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD CATEGORIE BY ID =========

  loadCategorieById(id: string) {
    this.loading.set(true);
    this.apiService.getCategorieById(id).subscribe({
      next: (categorie) => {
        this.selectedCategorie.set(categorie);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement catégorie', error);
        this.loading.set(false);
      }
    });
  }

  // ======== CREATE CATEGORIE =========

  createCategorie(categorie: Partial<Categorie>) {
    return this.apiService.createCategorie(categorie);
  }

  // ======== UPDATE CATEGORIE =========

  updateCategorie(id: string, categorie: Partial<Categorie>) {
    return this.apiService.updateCategorie(id, categorie);
  }

  // ======== DELETE CATEGORIE =========

  deleteCategorie(id: string) {
    return this.apiService.deleteCategorie(id);
  }
}