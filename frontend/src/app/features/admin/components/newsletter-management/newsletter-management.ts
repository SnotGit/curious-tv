import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsletterService } from '../../../newsletter/services/newsletter-service';

@Component({
  selector: 'app-newsletter-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newsletter-management.html',
  styleUrl: './newsletter-management.scss'
})
export class NewsletterManagement implements OnInit {
  newsletterService = inject(NewsletterService);

  // ======== INIT =========

  ngOnInit() {
    this.newsletterService.loadSubscribers();
  }

  // ======== EXPORT EMAILS =========

  exportEmails() {
    const emails = this.newsletterService.subscribers().map(s => s.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-emails.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}