import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoatDong } from '../models/HoatDong';

@Injectable({
  providedIn: 'root'
})
export class DangKyHoatDongService {
  private baseUrl = '/api/dang-ky-hoat-dong';

  constructor(private http: HttpClient) {}
  getAllHoatDong(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC',
    searchTerm: string = '',
    type: string = '',
    status?: any,
    startTime?: any,
    endTime?: any,
    year?: any,
    username?:any
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
      .set('searchTerm', searchTerm)
      .set('type', type);

    if (status!== undefined) {
      params = params.set('status', status);
    }

    if (startTime) {
      const formattedStartDate = startTime.toISOString().split('T')[0];
      params = params.set('startTime', formattedStartDate);
  }

  if (endTime) {
      const formattedEndDate = endTime.toISOString().split('T')[0];
      params = params.set('endTime', formattedEndDate);
  }


    if (year) {
      params = params.set('year', year);
    }
    if (username) {
      params = params.set('username', username);
    }

    return this.http.get<any>(`${this.baseUrl}/lay-danh-sach`, { params: params });
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
    username?: string,
    year?: string|null

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

    return this.http.get(`${this.baseUrl}/lay-danh-sach`, { params });
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

}
