import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../contact/services/contact-service';

@Component({
  selector: 'app-contact-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-management.html',
  styleUrl: './contact-management.scss'
})
export class ContactManagement implements OnInit {
  contactService = inject(ContactService);

  // ======== INIT =========

  ngOnInit() {
    this.contactService.loadContacts();
  }

  // ======== MARK AS READ =========

  markAsRead(id: string) {
    this.contactService.markAsRead(id);
  }

  // ======== DELETE CONTACT =========

  deleteContact(id: string) {
    if (confirm('Supprimer ce message ?')) {
      this.contactService.deleteContact(id);
    }
  }
}