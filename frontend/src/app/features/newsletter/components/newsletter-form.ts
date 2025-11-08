import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../services/newsletter-service';

@Component({
  selector: 'app-newsletter-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter-form.html',
  styleUrl: './newsletter-form.scss'
})
export class NewsletterForm {
  private newsletterService = inject(NewsletterService);
  
  email = '';
  success = signal<boolean>(false);
  error = signal<string>('');

  // ======== SUBSCRIBE =========

  onSubscribe() {
    if (!this.email) {
      this.error.set('Veuillez entrer votre email');
      return;
    }

    this.newsletterService.subscribe(this.email);
    this.success.set(true);
    this.email = '';
  }
}