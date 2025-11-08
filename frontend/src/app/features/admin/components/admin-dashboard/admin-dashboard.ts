import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { VideoService } from '../../../videos/services/video-service';
import { CategorieService } from '../../../categories/services/categorie-service';
import { ContactService } from '../../../contact/services/contact-service';
import { NewsletterService } from '../../../newsletter/services/newsletter-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard implements OnInit {
  adminService = inject(AdminService);
  videoService = inject(VideoService);
  categorieService = inject(CategorieService);
  contactService = inject(ContactService);
  newsletterService = inject(NewsletterService);

  // ======== INIT =========

  ngOnInit() {
    this.adminService.loadStats();
    this.videoService.loadVideos();
    this.categorieService.loadCategories();
    this.contactService.loadContacts();
    this.newsletterService.loadSubscribers();
  }

  // ======== GET UNREAD CONTACTS COUNT =========

  getUnreadContactsCount(): number {
    return this.contactService.contacts().filter(c => !c.lu).length;
  }
}