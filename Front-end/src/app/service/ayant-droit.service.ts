import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AyantDroit } from '../model/AyantDroit';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyantDroitService {

  private apiUrl = 'http://localhost:8080/api/ayants-droit';  // Remplacez par l'URL de votre API


  constructor(private http: HttpClient) { }

  getAyantDroits(): Observable<AyantDroit[]> {
    return this.http.get<AyantDroit[]>(this.apiUrl);
  }
}
