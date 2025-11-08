import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../services/video-service';
import { FavorisService } from '../../../favoris/services/favoris-service';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-detail.html',
  styleUrl: './video-detail.scss'
})
export class VideoDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  videoService = inject(VideoService);
  favorisService = inject(FavorisService);
  
  videoId: string = '';

  // ======== INIT =========

  ngOnInit() {
    this.videoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.videoId) {
      this.videoService.loadVideoById(this.videoId);
    }
  }

  // ======== GET YOUTUBE EMBED URL =========

  getYoutubeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  // ======== EXTRACT YOUTUBE ID =========

  private extractYoutubeId(url: string): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  }

  // ======== TOGGLE FAVORI =========

  toggleFavori() {
    const video = this.videoService.selectedVideo();
    if (video) {
      if (this.favorisService.isFavori(video.id)) {
        this.favorisService.removeFavori(video.id);
      } else {
        this.favorisService.addFavori(video.id);
      }
    }
  }
}