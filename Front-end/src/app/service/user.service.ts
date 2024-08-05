import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  searchUsersByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params: { name } });
  }
}
