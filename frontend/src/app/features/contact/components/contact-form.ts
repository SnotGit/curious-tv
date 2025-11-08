import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact-service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  private contactService = inject(ContactService);
  
  nom = '';
  email = '';
  sujet = '';
  message = '';
  success = signal<boolean>(false);
  error = signal<string>('');

  // ======== SUBMIT =========

  onSubmit() {
    if (!this.nom || !this.email || !this.sujet || !this.message) {
      this.error.set('Veuillez remplir tous les champs');
      return;
    }

    this.contactService.sendContact({
      nom: this.nom,
      email: this.email,
      sujet: this.sujet,
      message: this.message
    });

    this.success.set(true);
    this.resetForm();
  }

  // ======== RESET FORM =========

  private resetForm() {
    this.nom = '';
    this.email = '';
    this.sujet = '';
    this.message = '';
  }
}