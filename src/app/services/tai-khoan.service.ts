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
  layThongTinGvByMa(maGv: any): Observable<any> {
    return this.http.get<any>(`/api/tai-khoan/thong-tin/${maGv}`);
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
  getAcademicYearsByUser(maGv?: number|null): Observable<any> {
    let params = new HttpParams();
    if (maGv != null) {
      params = params.append('maGv', maGv.toString());
    }

    return this.http.get<any>(`/api/tai-khoan/danh-sach-nam-dang-ky-hoat-dong`, { params });
  }

  getGiangVienKhenThuongHoacKienTrach(namHoc: string, loai: string, maKhoa: number): Observable<any> {
    const params = new HttpParams()
      .set('nam', namHoc)
      .set('loai', loai)
      .set('khoa', maKhoa);

    return this.http.get<any>(`/api/tai-khoan/ds-giang-vien-khen-thuong-hoac-khien-trach`, { params: params });
  }

   capNhatGioMienGiam(request: any): Observable<any> {
    return this.http.post<any>('/api/tai-khoan/cap-nhat-gio-mien-giam-cho-giang-vien', request);
  }
  timKiemGioTichLuy(maGiangVien: number, nam: string): Observable<any> {
    const params = new HttpParams()
      .set('nam', nam)
      .set('maGiangVien', maGiangVien.toString());

    return this.http.get<any>(`/api/tai-khoan//lay-gio-tich-luy-cua-giang-vien`, { params: params });
  }
}
