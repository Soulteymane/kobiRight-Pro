export interface Title {
  id?: number;
  title: string;
  subtitle?: string;
  duration: number;
  bpm?: number;
  workId?: number;
}

export interface RightsHolder {
  id?: number;
  firstName: string;
  lastName: string;
  codeIPI: string;
  role: 'AUTEUR' | 'COMPOSER' | 'ARRANGEUR';
  phone: string;
  email: string;
  ownershipPercentage: number;
  workId?: number;
}

export interface Work {
  id?: number;
  type: 'MUSIC' | 'LYRICS' | 'ARRANGEMENT';
  title: string;
  description?: string;
  creationDate: Date;
  duration: number;
  keywords: string[];
  rightType: string;
  expirationDate: Date;
  territory: string;
  userId?: number;
  titles?: Title[];
  rightsHolders?: RightsHolder[];
  createdAt?: Date;
  updatedAt?: Date;
}
