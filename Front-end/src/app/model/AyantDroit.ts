

export interface AyantDroit {
  id: number;
  nom: string;
  prenom: string;
  pseudonyme: string;
  codeIPI: string;
  role: Role;
  telephone: string;
  email: string;
  pourcentage: number;
  signature: boolean;
  oeuvre: Oeuvre;
  user: User;
}

export enum Role {
  ADMINISTRATEUR = 'ADMINISTRATEUR',
  AUTEUR = 'AUTEUR',
  COMPOSITEUR = 'COMPOSITEUR',
  EDITEUR = 'EDITEUR',
  ARRANGEUR = 'ARRANGEUR'
}


export interface Oeuvre {
  id: number;
  titre: string;
  sousTitre: string;
  origine: string;
  duree: string;
  bpm: string;
  interprete: string;
  genre: string;
  style: string;
  statut: string;
  fichier: string;
  typeOeuvre: string;
  coverImage: string;
  ayantDroits: AyantDroit[];
}

export interface User{
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  identifiant: string; // IPI/BUMDA
  motDePasse: string;
  role: Role;
  ayantDroits: AyantDroit[];
}
