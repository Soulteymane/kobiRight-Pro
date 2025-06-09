export interface Right {
  id?: number;
  type: string;
  description: string;
  startDate: Date;
  endDate: Date;
  territory: string;
  price: number;
  currency: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  workId: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
