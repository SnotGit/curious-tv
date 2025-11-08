import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Contact } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts = signal<Contact[]>([]);
  loading = signal<boolean>(false);

  constructor(private apiService: ApiService) {}

  // ======== SEND CONTACT =========

  sendContact(contact: Partial<Contact>) {
    this.loading.set(true);
    return this.apiService.sendContact(contact).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur envoi contact', error);
        this.loading.set(false);
      }
    });
  }

  // ======== LOAD ALL CONTACTS =========

  loadContacts() {
    this.loading.set(true);
    this.apiService.getAllContacts().subscribe({
      next: (contacts) => {
        this.contacts.set(contacts);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur chargement contacts', error);
        this.loading.set(false);
      }
    });
  }

  // ======== MARK AS READ =========

  markAsRead(id: string) {
    this.apiService.markContactAsRead(id).subscribe({
      next: () => {
        this.loadContacts();
      },
      error: (error) => {
        console.error('Erreur marquage lu', error);
      }
    });
  }

  // ======== DELETE CONTACT =========

  deleteContact(id: string) {
    this.apiService.deleteContact(id).subscribe({
      next: () => {
        this.loadContacts();
      },
      error: (error) => {
        console.error('Erreur suppression contact', error);
      }
    });
  }
}