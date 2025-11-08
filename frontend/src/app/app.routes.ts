import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/components/home').then(m => m.Home)
  },
  {
    path: 'videos',
    loadComponent: () => import('./features/videos/components/video-list/video-list').then(m => m.VideoList)
  },
  {
    path: 'videos/:id',
    loadComponent: () => import('./features/videos/components/video-detail/video-detail').then(m => m.VideoDetail)
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/categories/components/categorie-list/categorie-list').then(m => m.CategorieList)
  },
  {
    path: 'categories/:nom',
    loadComponent: () => import('./features/categories/components/categorie-detail/categorie-detail').then(m => m.CategorieDetail)
  },
  {
    path: 'favoris',
    loadComponent: () => import('./features/favoris/components/favoris').then(m => m.Favoris)
  },
  {
    path: 'recherche',
    loadComponent: () => import('./features/recherche/components/recherche').then(m => m.Recherche)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/components/contact-form').then(m => m.ContactForm)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/components/login').then(m => m.Login)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard)
  },
  {
    path: 'admin/videos',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/video-management/video-management').then(m => m.VideoManagement)
  },
  {
    path: 'admin/categories',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/categorie-management/categorie-management').then(m => m.CategorieManagement)
  },
  {
    path: 'admin/lives',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/live-management/live-management').then(m => m.LiveManagement)
  },
  {
    path: 'admin/contacts',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/contact-management/contact-management').then(m => m.ContactManagement)
  },
  {
    path: 'admin/newsletter',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/components/newsletter-management/newsletter-management').then(m => m.NewsletterManagement)
  },
  {
    path: '**',
    redirectTo: ''
  }
];