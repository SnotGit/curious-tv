import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VideoService } from '../../../videos/services/video-service';

@Component({
  selector: 'app-categorie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categorie-detail.html',
  styleUrl: './categorie-detail.scss'
})
export class CategorieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  videoService = inject(VideoService);
  
  categorieNom: string = '';

  // ======== INIT =========

  ngOnInit() {
    this.categorieNom = this.route.snapshot.paramMap.get('nom') || '';
    if (this.categorieNom) {
      this.videoService.loadVideosByCategorie(this.categorieNom);
    }
  }
}