import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChucDanhService {

  private baseUrl = '/api/chuc-danh';

  constructor(private httpClient: HttpClient) { }

  getAllChucDanhs(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/lay-danh-sach`);
  }

  updateGiangVien(maChucDanh: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/cap-nhat/${maChucDanh}`, null); 
  }

  getChartData(academic: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/du-lieu-bieu-do/${academic}`);
  }
}
