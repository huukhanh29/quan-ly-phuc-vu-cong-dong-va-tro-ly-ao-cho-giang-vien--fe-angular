import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaiHoatDongService {

  private baseUrl = '/api/loai-hoat-dong'; // Cài đặt đúng URL của API

  constructor(private http: HttpClient) { }

  themLoaiHoatDong(loaiHoatDong: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them`, loaiHoatDong);
  }

  layTatCaLoaiHoatDong(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-tat-ca`);
  }

  layLoaiHoatDong(maLoaiHoatDong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maLoaiHoatDong}`);
  }

  suaLoaiHoatDong(maLoaiHoatDong: number, loaiHoatDong: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sua/${maLoaiHoatDong}`, loaiHoatDong);
  }

  xoaLoaiHoatDong(maLoaiHoatDong: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maLoaiHoatDong}`);
  }
}
