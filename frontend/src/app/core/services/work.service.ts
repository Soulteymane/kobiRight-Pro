import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Work, Title, RightsHolder } from '../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  private apiUrl = `${environment.apiUrl}/works`;

  constructor(private http: HttpClient) {}

  getAllWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiUrl);
  }

  getWorkById(id: number): Observable<Work> {
    return this.http.get<Work>(`${this.apiUrl}/${id}`);
  }

  createWork(work: Work): Observable<Work> {
    return this.http.post<Work>(this.apiUrl, work);
  }

  updateWork(id: number, work: Work): Observable<Work> {
    return this.http.put<Work>(`${this.apiUrl}/${id}`, work);
  }

  deleteWork(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchWorks(query: string): Observable<Work[]> {
    return this.http.get<Work[]>(`${this.apiUrl}/search?q=${query}`);
  }

  getWorkTitles(workId: number): Observable<Title[]> {
    return this.http.get<Title[]>(`${this.apiUrl}/${workId}/titles`);
  }

  getWorkRightsHolders(workId: number): Observable<RightsHolder[]> {
    return this.http.get<RightsHolder[]>(`${this.apiUrl}/${workId}/rights-holders`);
  }

  addTitle(workId: number, title: Title): Observable<Title> {
    return this.http.post<Title>(`${this.apiUrl}/${workId}/titles`, title);
  }

  updateTitle(workId: number, titleId: number, title: Title): Observable<Title> {
    return this.http.put<Title>(`${this.apiUrl}/${workId}/titles/${titleId}`, title);
  }

  deleteTitle(workId: number, titleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${workId}/titles/${titleId}`);
  }

  addRightsHolder(workId: number, rightsHolder: RightsHolder): Observable<RightsHolder> {
    return this.http.post<RightsHolder>(`${this.apiUrl}/${workId}/rights-holders`, rightsHolder);
  }

  updateRightsHolder(workId: number, rightsHolderId: number, rightsHolder: RightsHolder): Observable<RightsHolder> {
    return this.http.put<RightsHolder>(`${this.apiUrl}/${workId}/rights-holders/${rightsHolderId}`, rightsHolder);
  }

  deleteRightsHolder(workId: number, rightsHolderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${workId}/rights-holders/${rightsHolderId}`);
  }
}

