import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TruongService {
  private baseUrl = '/api/truong';

  constructor(private http: HttpClient) {}

  // Hàm gửi yêu cầu POST để thêm trường mới
  themTruong(truong: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them`, truong);
  }

  // Hàm gửi yêu cầu GET để lấy tất cả trường
  layTatCaTruong(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-tat-ca`);
  }

  // Hàm gửi yêu cầu GET để lấy trường theo mã trường
  layTruong(maTruong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay/${maTruong}`);
  }

  // Hàm gửi yêu cầu PUT để cập nhật thông tin trường
  suaTruong(maTruong: number, truong: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/sua/${maTruong}`, truong);
  }

  // Hàm gửi yêu cầu DELETE để xóa trường
  xoaTruong(maTruong: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maTruong}`);
  }
}
