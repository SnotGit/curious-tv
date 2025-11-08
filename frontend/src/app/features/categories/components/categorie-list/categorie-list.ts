import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategorieService } from '../../services/categorie-service';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorie-list.html',
  styleUrl: './categorie-list.scss'
})
export class CategorieList implements OnInit {
  categorieService = inject(CategorieService);

  // ======== INIT =========

  ngOnInit() {
    this.categorieService.loadCategories();
  }
}