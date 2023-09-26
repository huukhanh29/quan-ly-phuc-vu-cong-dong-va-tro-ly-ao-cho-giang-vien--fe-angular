import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TaiKhoanService {

  constructor(private http: HttpClient) { }

  layThongTinNguoiDung(): Observable<any> {
    return this.http.get<any>(`/api/tai-khoan/thong-tin`);
  }

  getAllUsersByRole(page: number, size: number, sortBy: string, sortDir: string, searchTerm: string, userRole: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
      .set('searchTerm', searchTerm)
      .set('userRole', userRole);

    return this.http.get<any>(`/api/tai-khoan/lay-danh-sach`, { params: params });
  }
  updateStatus(request: any): Observable<any> {
    return this.http.put<any>('/api/tai-khoan/cap-nhat-trang-thai', request);
  }
  getAllGiangVien(): Observable<any[]> {
    return this.http.get<any[]>('/api/tai-khoan/tat-ca-giang-vien');
  }
  updateUserProfile(request: any): Observable<any> {
    return this.http.put<any>(`/api/tai-khoan/cap-nhat-thong-tin`, request);
  }
  createUser(request: any): Observable<any> {
    return this.http.post<any>(`/api/tai-khoan/them-tai-khoan`, request);
  }
  testLogin(request: any): Observable<any> {
    return this.http.post<any>(`/api/tai-khoan/kiem-tra-dang-nhap`, request);
  }
  doiMatKhau(matKhauMoiRequest: any): Observable<any> {
    return this.http.put<any>(`/api/tai-khoan/doi-mat-khau`, matKhauMoiRequest);
  }
  xoaRefreshToken(rftoken:any): Observable<any> {
    return this.http.post<any>(`/api/tai-khoan/dang-xuat`, rftoken);
  }
  getAcademicYearsByUser(): Observable<any> {
    return this.http.get<any>(`/api/tai-khoan/danh-sach-nam-dang-ky-hoat-dong`);
  }

  getGiangVien(namHoc: string, loai: string): Observable<any> {
    const params = new HttpParams()
      .set('namHoc', namHoc)
      .set('loai', loai);

    return this.http.get<any>(`/api/tai-khoan/ds-giang-vien-khen-thuong-hoac-khien-trach`, { params: params });
  }
}
