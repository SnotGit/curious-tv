import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VideoService } from '../../services/video-service';

@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './video-list.html',
  styleUrl: './video-list.scss'
})
export class VideoList implements OnInit {
  videoService = inject(VideoService);

  // ======== INIT =========

  ngOnInit() {
    this.videoService.loadVideos('PUBLIE');
  }
}