import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Video } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videos = signal<Video[]>([]);
  selectedVideo = signal<Video | null>(null);
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  // ======== LOAD ALL VIDEOS =========

  loadVideos(statut?: string) {
    this.loading.set(true);
    this.apiService.getVideos(statut).subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement vidéos', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD VIDEO BY ID =========

  loadVideoById(id: string) {
    this.loading.set(true);
    this.apiService.getVideoById(id).subscribe({
      next: (video) => {
        this.selectedVideo.set(video);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement vidéo', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD VIDEOS BY CATEGORIE =========

  loadVideosByCategorie(categorie: string) {
    this.loading.set(true);
    this.apiService.getVideosByCategorie(categorie).subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement vidéos par catégorie', error);
        this.loading.set(false);
      }
    });
  }

  // ======== SEARCH VIDEOS =========

  searchVideos(query: string) {
    this.loading.set(true);
    this.apiService.searchVideos(query).subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur recherche vidéos', error);
        this.loading.set(false);
      }
    });
  }

  // ======== CREATE VIDEO =========

  createVideo(video: Partial<Video>) {
    return this.apiService.createVideo(video);
  }

  // ======== UPDATE VIDEO =========

  updateVideo(id: string, video: Partial<Video>) {
    return this.apiService.updateVideo(id, video);
  }

  // ======== DELETE VIDEO =========

  deleteVideo(id: string) {
    return this.apiService.deleteVideo(id);
  }
}