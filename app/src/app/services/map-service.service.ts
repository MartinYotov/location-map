import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMapLayer(layerName: string) {
    return this.http.get(`${this.baseUrl}/mapLayer/${layerName}`);
  }
}
