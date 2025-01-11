import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelLocation } from './travel-location.model'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class TravelLocationService {
  private apiUrl = 'https://mobile-api-one.vercel.app/api/travels';

  constructor(private http: HttpClient) {}

  // Obter locais de uma viagem
  getLocations(travelId: string): Observable<TravelLocation[]> {
    return this.http.get<TravelLocation[]>(`${this.apiUrl}/${travelId}/locations`);
  }

  // Obter um local específico
  getLocation(travelId: string, locationId: string): Observable<TravelLocation> {
    return this.http.get<TravelLocation>(`${this.apiUrl}/${travelId}/locations/${locationId}`);
  }

  // Adicionar um novo local
  addLocation(locationData: TravelLocation): Observable<TravelLocation> {
    return this.http.post<TravelLocation>(`${this.apiUrl}/locations`, locationData);
  }

  // Atualizar um local existente
  updateLocation(locationId: string, locationData: Partial<TravelLocation>): Observable<TravelLocation> {
    return this.http.put<TravelLocation>(`${this.apiUrl}/locations/${locationId}`, locationData);
  }

  // Deletar um local
  deleteLocation(locationId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/locations/${locationId}`);
  }

  // Adicionar um comentário a um local
  addComment(locationId: string, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/comments`, { locationId, comment });
  }

  // Deletar um comentário
  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/locations/comments/${commentId}`);
  }

  // Método para obter os locais associados a uma viagem
  getLocationsByTravelId(travelId: string): Observable<TravelLocation[]> {
    return this.http.get<TravelLocation[]>(`${this.apiUrl}/${travelId}/locations`);
  }
}