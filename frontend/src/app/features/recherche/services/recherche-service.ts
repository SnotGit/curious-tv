import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Video } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {
  results = signal<Video[]>([]);
  loading = signal<boolean>(false);
  query = signal<string>('');

  constructor(private apiService: ApiService) {}

  // ======== SEARCH =========

  search(query: string) {
    this.query.set(query);
    
    if (!query.trim()) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    this.apiService.searchVideos(query).subscribe({
      next: (videos) => {
        this.results.set(videos);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur recherche', error);
        this.loading.set(false);
      }
    });
  }

  // ======== CLEAR =========

  clear() {
    this.query.set('');
    this.results.set([]);
  }
}