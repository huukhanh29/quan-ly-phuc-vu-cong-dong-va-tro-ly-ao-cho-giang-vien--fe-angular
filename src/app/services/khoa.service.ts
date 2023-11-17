import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KhoaService {
  private baseUrl = '/api/khoa'; // Thay đổi URL dựa trên URL của API của bạn

  constructor(private http: HttpClient) {}

  // Hàm gửi yêu cầu POST để thêm khoa mới
  themKhoa(khoa: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them`, khoa);
  }

  // Hàm gửi yêu cầu GET để lấy tất cả khoa
  layTatCaKhoa(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-tat-ca`);
  }

  // Hàm gửi yêu cầu GET để lấy khoa theo mã khoa
  layKhoa(maKhoa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maKhoa}`);
  }

  // Hàm gửi yêu cầu PUT để cập nhật thông tin khoa
  suaKhoa(maKhoa: number, khoa: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sua/${maKhoa}`, khoa);
  }

  // // Hàm gửi yêu cầu GET để lấy danh sách khoa theo mã trường
  // layKhoaTheoTruong(maTruong: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/lay-theo-truong/${maTruong}`);
  // }

  // Hàm gửi yêu cầu DELETE để xóa khoa
  xoaKhoa(maKhoa: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maKhoa}`);
  }
}
