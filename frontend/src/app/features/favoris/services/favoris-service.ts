import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Video } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {
  favoris = signal<Video[]>([]);
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  // ======== LOAD FAVORIS =========

  loadFavoris() {
    this.loading.set(true);
    this.apiService.getFavoris().subscribe({
      next: (favoris) => {
        this.favoris.set(favoris);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement favoris', error);
        this.loading.set(false);
      }
    });
  }

  // ======== ADD FAVORI =========

  addFavori(videoId: string) {
    this.apiService.addFavori(videoId).subscribe({
      next: () => {
        this.loadFavoris();
      },
      error: (error) => {
        console.error('Erreur ajout favori', error);
      }
    });
  }

  // ======== REMOVE FAVORI =========

  removeFavori(videoId: string) {
    this.apiService.removeFavori(videoId).subscribe({
      next: () => {
        this.loadFavoris();
      },
      error: (error) => {
        console.error('Erreur suppression favori', error);
      }
    });
  }

  // ======== IS FAVORI =========

  isFavori(videoId: string): boolean {
    return this.favoris().some(video => video.id === videoId);
  }
}