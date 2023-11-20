import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoatDong } from '../models/HoatDong';
import { GiangVien } from '../models/GiangVien';

@Injectable({
  providedIn: 'root',
})
export class DangKyHoatDongService {
  private baseUrl = '/api/dang-ky-hoat-dong';

  constructor(private http: HttpClient) {}
  approveAllDangKyHoatDongByMaHoatDong(maHoatDong: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/duyet-tat-ca-dang-ky/${maHoatDong}`, {});
  }

  layDanhSachTatCaDangKyHoatDong(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string,
    searchTerm: string = '',
    status?: string,
    startTime?: Date | null,
    endTime?: Date | null,
    username?: string | null,
    year?: string | null,
    maHoatDong?: any | null
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    params = params.append('sortBy', sortBy);
    params = params.append('sortDir', sortDir);
    params = params.append('searchTerm', searchTerm);
    if (status) {
      params = params.set('status', status);
    }

    if (startTime) {
      let formattedStartTime = startTime.toISOString().split('T')[0];
      params = params.set('startTime', formattedStartTime);
    }

    if (endTime) {
      let formattedEndTime = endTime.toISOString().split('T')[0];
      params = params.set('endTime', formattedEndTime);
    }
    if (year) params = params.append('year', year);

    if (username) params = params.append('username', username.toString());
    if (maHoatDong) params = params.append('maHoatDong', maHoatDong);
    return this.http.get(`${this.baseUrl}/lay-danh-sach`, { params });
  }
  getAllHoatDongSapDienRa(): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(`${this.baseUrl}/hoat-dong-sap-dien-ra`);
  }
  dangKyHoatDong(maHoatDong: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${maHoatDong}`, {});
  }
  kiemTraDangKyHoatDong(maHoatDong: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/kiem-tra/${maHoatDong}`, {});
  }
  approveDangKyHoatDong(maDangKy: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/duyet-dang-ky/${maDangKy}`, {});
  }

  huyDangKyHoatDong(maDangKy: number, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/huy-hoat-dong/${maDangKy}`, body);
  }
  getHoatDongsByGiangVien(ten: string): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(`${this.baseUrl}/hoat-dong/${ten}`);
  }
  getGiangViensByHoatDong(maHD: number): Observable<GiangVien[]> {
    return this.http.get<GiangVien[]>(`${this.baseUrl}/giang-vien-tham-gia/${maHD}`);
  }
}
