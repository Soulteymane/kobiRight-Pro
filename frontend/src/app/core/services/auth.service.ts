import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap, switchMap, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

interface AuthResponse {
  token: string;
  user: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    codeIPI: string;
    role: string;
    ayantDroits: any[];
  };
}

interface LoginRequest {
  email: string;
  motDePasse: string;
}

interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  codeIPI: string;
  role: 'AUTEUR' | 'COMPOSER' | 'ARRANGEUR';
  motDePasse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenRefreshInterval = 15 * 60 * 1000; // 15 minutes

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.setupTokenRefresh();
  }

  private setupTokenRefresh(): void {
    timer(this.tokenRefreshInterval, this.tokenRefreshInterval)
      .pipe(
        switchMap(() => this.refreshToken())
      )
      .subscribe({
        error: (error) => {
          console.error('Token refresh failed:', error);
          this.logout();
        }
      });
  }

  private refreshToken(): Observable<AuthResponse> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, {}, { headers })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(error => {
          console.error('Token refresh error:', error);
          this.logout();
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData, { headers })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const loginData: LoginRequest = {
      email: email,
      motDePasse: password
    };

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData, { headers })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.put<User>(`${this.apiUrl}/profile`, userData, { headers })
      .pipe(
        tap(updatedUser => {
          const currentUser = this.currentUserSubject.value;
          if (currentUser) {
            this.currentUserSubject.next({ ...currentUser, ...updatedUser });
            localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
          }
        }),
        catchError(this.handleError)
      );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.post<void>(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword
    }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (!response || !response.token || !response.user) {
      throw new Error('Invalid authentication response');
    }

    localStorage.setItem('token', response.token);

    const user: User = {
      id: response.user.id,
      firstName: response.user.prenom,
      lastName: response.user.nom,
      email: response.user.email,
      phone: response.user.telephone,
      codeIPI: response.user.codeIPI,
      role: response.user.role.toUpperCase() as 'AUTEUR' | 'COMPOSER' | 'ARRANGEUR'
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.router.navigate(['/dashboard']);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = error.error.message;
    } else {
      // Erreur côté serveur
      if (error.status === 403) {
        errorMessage = 'Accès refusé. Veuillez vérifier vos identifiants.';
      } else if (error.status === 401) {
        errorMessage = 'Session expirée. Veuillez vous reconnecter.';
        this.logout();
      } else if (error.status === 0) {
        errorMessage = 'Impossible de se connecter au serveur. Veuillez vérifier votre connexion.';
      } else {
        errorMessage = error.error?.message || `Erreur ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}
