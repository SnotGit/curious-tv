import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavorisService } from '../services/favoris-service';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoris.html',
  styleUrl: './favoris.scss'
})
export class Favoris implements OnInit {
  favorisService = inject(FavorisService);

  // ======== INIT =========

  ngOnInit() {
    this.favorisService.loadFavoris();
  }

  // ======== REMOVE FAVORI =========

  removeFavori(videoId: string) {
    this.favorisService.removeFavori(videoId);
  }
}