import { Injectable, signal, inject } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { StatsWithVideo } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiService = inject(ApiService);
  
  stats = signal<StatsWithVideo[]>([]);
  loading = signal<boolean>(false);

  // ======== LOAD ALL STATS =========

  loadStats() {
    this.loading.set(true);
    this.apiService.getAllStats().subscribe({
      next: (stats) => {
        this.stats.set(stats as StatsWithVideo[]);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement stats', error);
        this.loading.set(false);
      }
    });
  }

  // ======== GET TOTAL VIEWS =========

  getTotalViews(): number {
    return this.stats().reduce((sum, stat) => sum + stat.vues, 0);
  }

  // ======== GET TOTAL FAVORIS =========

  getTotalFavoris(): number {
    return this.stats().reduce((sum, stat) => sum + stat.favoris, 0);
  }
}