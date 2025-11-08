import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RechercheService } from '../services/recherche-service';

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recherche.html',
  styleUrl: './recherche.scss'
})
export class Recherche {
  rechercheService = inject(RechercheService);
  
  searchQuery = '';

  // ======== SEARCH =========

  onSearch() {
    if (this.searchQuery.trim()) {
      this.rechercheService.search(this.searchQuery);
    }
  }

  // ======== CLEAR =========

  clearSearch() {
    this.searchQuery = '';
    this.rechercheService.clear();
  }
}