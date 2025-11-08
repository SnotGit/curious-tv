import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api-service';
import { CategorieService } from '../../../categories/services/categorie-service';
import { ProchaineSortie } from '../../../../shared/models';

@Component({
  selector: 'app-live-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-management.html',
  styleUrl: './live-management.scss'
})
export class LiveManagement implements OnInit {
  private apiService = inject(ApiService);
  categorieService = inject(CategorieService);
  
  lives = signal<ProchaineSortie[]>([]);
  loading = signal<boolean>(false);
  showForm = signal<boolean>(false);
  editMode = signal<boolean>(false);
  currentLiveId = signal<string>('');
  
  titre = '';
  description = '';
  categorie = '';
  dateDebut = new Date().toISOString().slice(0, 16);
  thumbnail = '';
  urlLive = '';
  statut: 'A_VENIR' | 'EN_COURS' | 'TERMINE' = 'A_VENIR';
  
  error = signal<string>('');
  success = signal<string>('');

  // ======== INIT =========

  ngOnInit() {
    this.loadLives();
    this.categorieService.loadCategories();
  }

  // ======== LOAD LIVES =========

  loadLives() {
    this.loading.set(true);
    this.apiService.getLives().subscribe({
      next: (lives) => {
        this.lives.set(lives);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement lives', error);
        this.loading.set(false);
      }
    });
  }

  // ======== SHOW CREATE FORM =========

  showCreateForm() {
    this.resetForm();
    this.editMode.set(false);
    this.showForm.set(true);
  }

  // ======== EDIT LIVE =========

  editLive(live: ProchaineSortie) {
    this.titre = live.titre;
    this.description = live.description;
    this.categorie = live.categorie;
    this.dateDebut = new Date(live.dateDebut).toISOString().slice(0, 16);
    this.thumbnail = live.thumbnail || '';
    this.urlLive = live.urlLive || '';
    this.statut = live.statut;
    this.currentLiveId.set(live.id);
    this.editMode.set(true);
    this.showForm.set(true);
  }

  // ======== SUBMIT =========

  onSubmit() {
    if (!this.titre || !this.categorie || !this.dateDebut) {
      this.error.set('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const liveData = {
      titre: this.titre,
      description: this.description,
      categorie: this.categorie,
      dateDebut: new Date(this.dateDebut),
      thumbnail: this.thumbnail || undefined,
      urlLive: this.urlLive || undefined,
      statut: this.statut
    };

    if (this.editMode()) {
      this.apiService.updateLive(this.currentLiveId(), liveData).subscribe({
        next: () => {
          this.success.set('Live modifié avec succès');
          this.resetForm();
          this.loadLives();
        },
        error: () => {
          this.error.set('Erreur lors de la modification');
        }
      });
    } else {
      this.apiService.createLive(liveData).subscribe({
        next: () => {
          this.success.set('Live créé avec succès');
          this.resetForm();
          this.loadLives();
        },
        error: () => {
          this.error.set('Erreur lors de la création');
        }
      });
    }
  }

  // ======== START LIVE =========

  startLive(id: string) {
    const urlLive = prompt('Entrez l\'URL du live YouTube :');
    if (urlLive) {
      this.apiService.startLive(id, urlLive).subscribe({
        next: () => {
          this.success.set('Live démarré');
          this.loadLives();
        },
        error: () => {
          this.error.set('Erreur lors du démarrage');
        }
      });
    }
  }

  // ======== END LIVE =========

  endLive(id: string) {
    if (confirm('Terminer ce live ?')) {
      this.apiService.endLive(id).subscribe({
        next: () => {
          this.success.set('Live terminé');
          this.loadLives();
        },
        error: () => {
          this.error.set('Erreur lors de la fin du live');
        }
      });
    }
  }

  // ======== DELETE LIVE =========

  deleteLive(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce live ?')) {
      this.apiService.deleteLive(id).subscribe({
        next: () => {
          this.success.set('Live supprimé');
          this.loadLives();
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
    this.titre = '';
    this.description = '';
    this.categorie = '';
    this.dateDebut = new Date().toISOString().slice(0, 16);
    this.thumbnail = '';
    this.urlLive = '';
    this.statut = 'A_VENIR';
    this.showForm.set(false);
    this.editMode.set(false);
    this.currentLiveId.set('');
    this.error.set('');
    this.success.set('');
  }
}