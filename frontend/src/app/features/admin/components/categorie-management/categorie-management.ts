import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../categories/services/categorie-service';
import { Categorie } from '../../../../shared/models';

@Component({
  selector: 'app-categorie-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorie-management.html',
  styleUrl: './categorie-management.scss'
})
export class CategorieManagement implements OnInit {
  categorieService = inject(CategorieService);
  
  showForm = signal<boolean>(false);
  editMode = signal<boolean>(false);
  currentCategorieId = signal<string>('');
  
  nom = '';
  icone = '';
  description = '';
  ordre = 0;
  
  error = signal<string>('');
  success = signal<string>('');

  // ======== INIT =========

  ngOnInit() {
    this.categorieService.loadCategories();
  }

  // ======== SHOW CREATE FORM =========

  showCreateForm() {
    this.resetForm();
    this.editMode.set(false);
    this.showForm.set(true);
  }

  // ======== EDIT CATEGORIE =========

  editCategorie(categorie: Categorie) {
    this.nom = categorie.nom;
    this.icone = categorie.icone;
    this.description = categorie.description;
    this.ordre = categorie.ordre;
    this.currentCategorieId.set(categorie.id);
    this.editMode.set(true);
    this.showForm.set(true);
  }

  // ======== SUBMIT =========

  onSubmit() {
    if (!this.nom || !this.icone || !this.description) {
      this.error.set('Veuillez remplir tous les champs');
      return;
    }

    const categorieData = {
      nom: this.nom,
      icone: this.icone,
      description: this.description,
      ordre: this.ordre
    };

    if (this.editMode()) {
      this.categorieService.updateCategorie(this.currentCategorieId(), categorieData).subscribe({
        next: () => {
          this.success.set('Catégorie modifiée avec succès');
          this.resetForm();
          this.categorieService.loadCategories();
        },
        error: () => {
          this.error.set('Erreur lors de la modification');
        }
      });
    } else {
      this.categorieService.createCategorie(categorieData).subscribe({
        next: () => {
          this.success.set('Catégorie créée avec succès');
          this.resetForm();
          this.categorieService.loadCategories();
        },
        error: () => {
          this.error.set('Erreur lors de la création');
        }
      });
    }
  }

  // ======== DELETE CATEGORIE =========

  deleteCategorie(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe({
        next: () => {
          this.success.set('Catégorie supprimée');
          this.categorieService.loadCategories();
        },
        error: () => {
          this.error.set('Erreur lors de la suppression');
        }
      });
    }
  }

  // ======== CANCEL =========

  cancel() {
    this.resetForm();
  }

  // ======== RESET FORM =========

  private resetForm() {
    this.nom = '';
    this.icone = '';
    this.description = '';
    this.ordre = 0;
    this.showForm.set(false);
    this.editMode.set(false);
    this.currentCategorieId.set('');
    this.error.set('');
    this.success.set('');
  }
}