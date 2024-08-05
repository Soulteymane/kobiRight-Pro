import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AyantDroit} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}


  searchAyantDroits(nom: string): Observable<AyantDroit[]> {
    return this.http.get<AyantDroit[]>(`${this.apiUrl}/ayantDroits/search`, {
      params: { nom }
    });
  }

  addAyantsDroit(oeuvreId: string, ayantsDroit: any[]): Observable<any> {
    return this.http.post(`/api/oeuvres/${oeuvreId}/ayants-droit`, ayantsDroit);
  }


  // searchAyantDroitsByName(name: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/ayants-droit/search?name=${name}`);
  // }

  createOeuvre(oeuvre: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/oeuvres`, oeuvre);
  }

  getOeuvreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
