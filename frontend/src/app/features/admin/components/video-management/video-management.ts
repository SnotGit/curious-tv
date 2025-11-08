import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../../videos/services/video-service';
import { CategorieService } from '../../../categories/services/categorie-service';
import { Video } from '../../../../shared/models';
@Component({
  selector: 'app-video-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-management.html',
  styleUrl: './video-management.scss'
})
export class VideoManagement implements OnInit {
  videoService = inject(VideoService);
  categorieService = inject(CategorieService);
  
  showForm = signal<boolean>(false);
  editMode = signal<boolean>(false);
  currentVideoId = signal<string>('');
  
  titre = '';
  description = '';
  urlYoutube = '';
  categorie = '';
  datePublication = new Date().toISOString().split('T')[0];
  duree = 0;
  thumbnail = '';
  statut: 'BROUILLON' | 'PUBLIE' | 'PROGRAMME' = 'BROUILLON';
  tags = '';
  
  error = signal<string>('');
  success = signal<string>('');

  // ======== INIT =========

  ngOnInit() {
    this.videoService.loadVideos();
    this.categorieService.loadCategories();
  }

  // ======== SHOW CREATE FORM =========

  showCreateForm() {
    this.resetForm();
    this.editMode.set(false);
    this.showForm.set(true);
  }

  // ======== EDIT VIDEO =========

  editVideo(video: Video) {
    this.titre = video.titre;
    this.description = video.description;
    this.urlYoutube = video.urlYoutube;
    this.categorie = video.categorie;
    this.datePublication = new Date(video.datePublication).toISOString().split('T')[0];
    this.duree = video.duree;
    this.thumbnail = video.thumbnail;
    this.statut = video.statut;
    this.tags = video.tags.join(', ');
    this.currentVideoId.set(video.id);
    this.editMode.set(true);
    this.showForm.set(true);
  }

  // ======== SUBMIT =========

  onSubmit() {
    if (!this.titre || !this.urlYoutube || !this.categorie || !this.thumbnail) {
      this.error.set('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const videoData = {
      titre: this.titre,
      description: this.description,
      urlYoutube: this.urlYoutube,
      categorie: this.categorie,
      datePublication: new Date(this.datePublication),
      duree: this.duree,
      thumbnail: this.thumbnail,
      statut: this.statut,
      tags: this.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (this.editMode()) {
      this.videoService.updateVideo(this.currentVideoId(), videoData).subscribe({
        next: () => {
          this.success.set('Vidéo modifiée avec succès');
          this.resetForm();
          this.videoService.loadVideos();
        },
        error: () => {
          this.error.set('Erreur lors de la modification');
        }
      });
    } else {
      this.videoService.createVideo(videoData).subscribe({
        next: () => {
          this.success.set('Vidéo créée avec succès');
          this.resetForm();
          this.videoService.loadVideos();
        },
        error: () => {
          this.error.set('Erreur lors de la création');
        }
      });
    }
  }

  // ======== DELETE VIDEO =========

  deleteVideo(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
      this.videoService.deleteVideo(id).subscribe({
        next: () => {
          this.success.set('Vidéo supprimée');
          this.videoService.loadVideos();
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
    this.urlYoutube = '';
    this.categorie = '';
    this.datePublication = new Date().toISOString().split('T')[0];
    this.duree = 0;
    this.thumbnail = '';
    this.statut = 'BROUILLON';
    this.tags = '';
    this.showForm.set(false);
    this.editMode.set(false);
    this.currentVideoId.set('');
    this.error.set('');
    this.success.set('');
  }
}