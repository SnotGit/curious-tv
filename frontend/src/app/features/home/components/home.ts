import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../services/home-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  homeService = inject(HomeService);

  // ======== INIT =========

  ngOnInit() {
    this.homeService.refresh();
  }

  // ======== GET YOUTUBE EMBED URL =========

  getYoutubeEmbedUrl(url: string): string {
    const videoId = this.extractYoutubeId(url);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // ======== EXTRACT YOUTUBE ID =========

  private extractYoutubeId(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  }
}