import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    router.navigate(['/auth/login']);
    return false;
  }

  const userData = JSON.parse(user);
  if (userData.role !== 'ADMIN') {
    router.navigate(['/']);
    return false;
  }

  return true;
};