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

  addChucDanh(chucDanhData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/them`, chucDanhData);
  }

  getAllChucDanh(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/lay-tat-ca`);
  }

  getChucDanh(maChucDanh: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/lay/${maChucDanh}`);
  }

  editChucDanh(maChucDanh: number, chucDanhData: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/sua/${maChucDanh}`, chucDanhData);
  }

  deleteChucDanh(maChucDanh: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/xoa/${maChucDanh}`);
  }
}
