import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video, Categorie, User, Stats, Contact, Newsletter, AuthResponse, ProchaineSortie } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ======== AUTH =========

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string, role?: 'ADMIN' | 'VIEWER'): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/register`, { email, password, role });
  }

  // ======== VIDEOS =========

  getVideos(statut?: string): Observable<Video[]> {
    const url = statut ? `${this.baseUrl}/videos?statut=${statut}` : `${this.baseUrl}/videos`;
    return this.http.get<Video[]>(url);
  }

  getVideoById(id: string): Observable<Video> {
    return this.http.get<Video>(`${this.baseUrl}/videos/${id}`);
  }

  getVideosByCategorie(categorie: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/categorie/${categorie}`);
  }

  searchVideos(query: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/videos/search?q=${query}`);
  }

  createVideo(video: Partial<Video>): Observable<Video> {
    return this.http.post<Video>(`${this.baseUrl}/videos`, video);
  }

  updateVideo(id: string, video: Partial<Video>): Observable<Video> {
    return this.http.put<Video>(`${this.baseUrl}/videos/${id}`, video);
  }

  deleteVideo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/videos/${id}`);
  }

  // ======== CATEGORIES =========

  getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }

  getCategorieById(id: string): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/categories/${id}`);
  }

  createCategorie(categorie: Partial<Categorie>): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/categories`, categorie);
  }

  updateCategorie(id: string, categorie: Partial<Categorie>): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl}/categories/${id}`, categorie);
  }

  deleteCategorie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
  }

  // ======== USER =========

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/me`);
  }

  getFavoris(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}/user/favoris`);
  }

  addFavori(videoId: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/favoris/${videoId}`, {});
  }

  removeFavori(videoId: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/user/favoris/${videoId}`);
  }

  // ======== NEWSLETTER =========

  subscribeNewsletter(email: string): Observable<Newsletter> {
    return this.http.post<Newsletter>(`${this.baseUrl}/newsletter/subscribe`, { email });
  }

  unsubscribeNewsletter(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/newsletter/unsubscribe`, { email });
  }

  getAllSubscribers(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.baseUrl}/newsletter/subscribers`);
  }

  // ======== CONTACT =========

  sendContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}/contact`, contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contact`);
  }

  markContactAsRead(id: string): Observable<Contact> {
    return this.http.patch<Contact>(`${this.baseUrl}/contact/${id}/read`, {});
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/contact/${id}`);
  }

  // ======== STATS =========

  getAllStats(): Observable<Stats[]> {
    return this.http.get<Stats[]>(`${this.baseUrl}/stats`);
  }

  getStatsByVideoId(videoId: string): Observable<Stats> {
    return this.http.get<Stats>(`${this.baseUrl}/stats/${videoId}`);
  }

  // ======== LIVE =========

  getLives(): Observable<ProchaineSortie[]> {
    return this.http.get<ProchaineSortie[]>(`${this.baseUrl}/live`);
  }

  getNextLive(): Observable<ProchaineSortie> {
    return this.http.get<ProchaineSortie>(`${this.baseUrl}/live/next`);
  }

  getCurrentLive(): Observable<ProchaineSortie> {
    return this.http.get<ProchaineSortie>(`${this.baseUrl}/live/current`);
  }

  getLiveById(id: string): Observable<ProchaineSortie> {
    return this.http.get<ProchaineSortie>(`${this.baseUrl}/live/${id}`);
  }

  createLive(live: Partial<ProchaineSortie>): Observable<ProchaineSortie> {
    return this.http.post<ProchaineSortie>(`${this.baseUrl}/live`, live);
  }

  updateLive(id: string, live: Partial<ProchaineSortie>): Observable<ProchaineSortie> {
    return this.http.put<ProchaineSortie>(`${this.baseUrl}/live/${id}`, live);
  }

  deleteLive(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/live/${id}`);
  }

  startLive(id: string, urlLive: string): Observable<ProchaineSortie> {
    return this.http.patch<ProchaineSortie>(`${this.baseUrl}/live/${id}/start`, { urlLive });
  }

  endLive(id: string): Observable<ProchaineSortie> {
    return this.http.patch<ProchaineSortie>(`${this.baseUrl}/live/${id}/end`, {});
  }
}