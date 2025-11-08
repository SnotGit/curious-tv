import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Newsletter } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  subscribers = signal<Newsletter[]>([]);
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  // ======== SUBSCRIBE =========

  subscribe(email: string) {
    this.loading.set(true);
    this.apiService.subscribeNewsletter(email).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur inscription newsletter', error);
        this.loading.set(false);
      }
    });
  }

  // ======== UNSUBSCRIBE =========

  unsubscribe(email: string) {
    this.loading.set(true);
    this.apiService.unsubscribeNewsletter(email).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur désinscription newsletter', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD ALL SUBSCRIBERS =========

  loadSubscribers() {
    this.loading.set(true);
    this.apiService.getAllSubscribers().subscribe({
      next: (subscribers) => {
        this.subscribers.set(subscribers);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement abonnés', error);
        this.loading.set(false);
      }
    });
  }
}