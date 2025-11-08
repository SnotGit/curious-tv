import { Injectable, signal, effect } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Video, ProchaineSortie } from '../../../shared/models';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  latestVideos = signal<Video[]>([]);
  nextLive = signal<ProchaineSortie | null>(null);
  currentLive = signal<ProchaineSortie | null>(null);
  countdown = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {
    this.startCountdown();
  }

  // ======== LOAD LATEST VIDEOS =========

  loadLatestVideos(limit: number = 6) {
    this.loading.set(true);
    this.apiService.getVideos('PUBLIE').subscribe({
      next: (videos) => {
        this.latestVideos.set(videos.slice(0, limit));
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement dernières vidéos', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD NEXT LIVE =========

  loadNextLive() {
    this.apiService.getNextLive().subscribe({
      next: (live) => {
        this.nextLive.set(live);
      },
      error: (error) => {
        console.error('Erreur chargement prochain live', error);
      }
    });
  }

  // ======== LOAD CURRENT LIVE =========

  loadCurrentLive() {
    this.apiService.getCurrentLive().subscribe({
      next: (live) => {
        this.currentLive.set(live);
      },
      error: (error) => {
        console.error('Erreur chargement live en cours', error);
      }
    });
  }

  // ======== START COUNTDOWN =========

  private startCountdown() {
    interval(1000).subscribe(() => {
      const live = this.nextLive();
      if (live) {
        const now = new Date().getTime();
        const liveDate = new Date(live.dateDebut).getTime();
        const distance = liveDate - now;

        if (distance < 0) {
          this.countdown.set('Live commencé !');
          this.loadCurrentLive();
          this.loadNextLive();
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.countdown.set(`${days}j ${hours}h ${minutes}m ${seconds}s`);
      }
    });
  }

  // ======== REFRESH =========

  refresh() {
    this.loadLatestVideos();
    this.loadNextLive();
    this.loadCurrentLive();
  }
}