import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  // Works
  getWorks(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/works`, { headers: this.getHeaders() });
  }

  getWork(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/works/${id}`, { headers: this.getHeaders() });
  }

  createWork(work: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/works`, work, { headers: this.getHeaders() });
  }

  updateWork(id: number, work: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/works/${id}`, work, { headers: this.getHeaders() });
  }

  deleteWork(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/works/${id}`, { headers: this.getHeaders() });
  }

  // Rights
  getRights(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/rights`, { headers: this.getHeaders() });
  }

  getRight(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/rights/${id}`, { headers: this.getHeaders() });
  }

  createRight(right: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/rights`, right, { headers: this.getHeaders() });
  }

  updateRight(id: number, right: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/rights/${id}`, right, { headers: this.getHeaders() });
  }

  deleteRight(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/rights/${id}`, { headers: this.getHeaders() });
  }
}
