export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'AUTEUR' | 'COMPOSER' | 'ARRANGEUR';
  company?: string;
  position?: string;
  phone?: string;
  address?: string;
  codeIPI?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
