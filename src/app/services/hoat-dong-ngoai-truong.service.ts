import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoatDongNgoaiTruong } from '../models/HoatDongNgoaiTruong';
import { te } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class HoatDongNgoaiTruongService {

  private baseUrl = '/api/hoat-dong-ngoai-truong';

  constructor(private http: HttpClient) { }


  themHoatDongNgoaiTruong(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them`, data);
  }

  themFileHoatDongNgoaiTruong(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/them-file`, formData);
  }

  suaHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sua/${maHoatDongNgoaiTruong}`, data);
  }


  pheDuyetHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number, request: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/phe-duyet/${maHoatDongNgoaiTruong}`, request);
  }

  layTatCaHoatDongNgoaiTruong(page: number = 0,
    size: number = 10, sortBy: string = 'ngayDangKy',
    sortDir: string = 'DESC', searchTerm: string = '',
     trangThai?: string, tenDangNhap?: string, year?:any): Observable<any> {

    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sortBy', sortBy)
    .set('sortDir', sortDir)
    .set('searchTerm', searchTerm)

  if (trangThai) {
    params = params.set('trangThai', trangThai);
  }

  if (tenDangNhap) {
    params = params.set('tenDangNhap', tenDangNhap);
  }
  if (year) {
    params = params.set('year', year);
  }
    return this.http.get(`${this.baseUrl}/lay-tat-ca`, { params });
  }

  layHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maHoatDongNgoaiTruong}`);
  }
  // Phương thức để xóa hoạt động ngoài trường
  huyHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/huy/${maHoatDongNgoaiTruong}`);
  }
  xoaHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maHoatDongNgoaiTruong}`);
  }
  // Phương thức để tải xuống tệp của hoạt động ngoài trường
  downloadFile(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maHoatDongNgoaiTruong}/download`, { responseType: 'blob', observe: 'response' });
  }

  // Phương thức để lấy tên tài liệu
  getFileName(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maHoatDongNgoaiTruong}/ten-file`, {responseType: 'text'});
  }
  suaFileHoatDongNgoaiTruong(maHoatDongNgoaiTruong: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.baseUrl}/sua-file/${maHoatDongNgoaiTruong}`, formData);
  }
  getYears(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-danh-sach-nam`);
  }

}
