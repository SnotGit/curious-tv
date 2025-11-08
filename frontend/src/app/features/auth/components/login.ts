import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private authService = inject(AuthService);
  
  email = '';
  password = '';
  error = signal<string>('');

  // ======== SUBMIT =========

  onSubmit() {
    if (!this.email || !this.password) {
      this.error.set('Veuillez remplir tous les champs');
      return;
    }
    this.authService.login(this.email, this.password);
  }
}