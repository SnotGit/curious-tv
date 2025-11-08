import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api-service';
import { User } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  // ======== LOGIN =========

  login(email: string, password: string) {
    this.apiService.login(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser.set(response.user);
        this.isAuthenticated.set(true);
        
        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
      }
    });
  }

  // ======== REGISTER =========

  register(email: string, password: string, role?: 'ADMIN' | 'VIEWER') {
    this.apiService.register(email, password, role).subscribe({
      next: () => {
        this.login(email, password);
      },
      error: (error) => {
        console.error('Erreur d\'inscription', error);
      }
    });
  }

  // ======== LOGOUT =========

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
  }

  // ======== LOAD USER FROM STORAGE =========

  private loadUserFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.currentUser.set(JSON.parse(user));
      this.isAuthenticated.set(true);
    }
  }

  // ======== CHECK ADMIN =========

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'ADMIN';
  }
}