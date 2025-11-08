export interface Video {
  id: string;
  titre: string;
  description: string;
  urlYoutube: string;
  categorie: string;
  datePublication: Date;
  duree: number;
  thumbnail: string;
  statut: 'BROUILLON' | 'PUBLIE' | 'PROGRAMME';
  tags: string[];
  stats?: Stats;
}

export interface Categorie {
  id: string;
  nom: string;
  icone: string;
  description: string;
  ordre: number;
}

export interface ProchaineSortie {
  id: string;
  titre: string;
  categorie: string;
  dateDebut: Date;
  description: string;
  thumbnail?: string;
  urlLive?: string;
  statut: 'A_VENIR' | 'EN_COURS' | 'TERMINE';
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'VIEWER';
  favoris: string[];
  dateCreation: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  actif: boolean;
  dateInscription: Date;
}

export interface Stats {
  id: string;
  videoId: string;
  vues: number;
  favoris: number;
}

export interface StatsWithVideo extends Stats {
  video: {
    titre: string;
    categorie: string;
  };
}

export interface Contact {
  id: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  dateEnvoi: Date;
  lu: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}