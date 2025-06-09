import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Right } from '../models/right.model';

@Injectable({
  providedIn: 'root'
})
export class RightService {
  private apiUrl = `${environment.apiUrl}/rights`;

  constructor(private http: HttpClient) {}

  getAllRights(): Observable<Right[]> {
    return this.http.get<Right[]>(this.apiUrl);
  }

  getRightById(id: number): Observable<Right> {
    return this.http.get<Right>(`${this.apiUrl}/${id}`);
  }

  createRight(right: Right): Observable<Right> {
    return this.http.post<Right>(this.apiUrl, right);
  }

  updateRight(id: number, right: Right): Observable<Right> {
    return this.http.put<Right>(`${this.apiUrl}/${id}`, right);
  }

  deleteRight(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRightsByWork(workId: number): Observable<Right[]> {
    return this.http.get<Right[]>(`${this.apiUrl}/work/${workId}`);
  }

  getRightsByUser(userId: number): Observable<Right[]> {
    return this.http.get<Right[]>(`${this.apiUrl}/user/${userId}`);
  }
}
