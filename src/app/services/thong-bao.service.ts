import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThongBaoService {
  private apiUrl = '/api/thong-bao'; // Đường dẫn API của Spring Boot

  constructor(private http: HttpClient) { }
  //bắt sự sự khi thay đổi số thông báo chưa đọc
  private soThongBaoChuaDoc = new Subject<number>();
  soThongBaoChuaDocObservable = this.soThongBaoChuaDoc.asObservable();
  capNhatSoThongBaoChuaDoc(moiSoThongBaoChuaDoc: number): void {
    this.soThongBaoChuaDoc.next(moiSoThongBaoChuaDoc);
  }
  // Lấy danh sách thông báo theo người dùng ID
  layThongBaoTheoNguoiDungId(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { responseType: 'json' });
  }

  // Đặt trạng thái đã đọc cho thông báo
  datTrangThaiThongBao(maThongBao: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/trang-thai/${maThongBao}`, {}, { responseType: 'text' });
  }

  // Xóa một thông báo theo mã
  xoaThongBao(maThongBao: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xoa/${maThongBao}`, { responseType: 'text' });
  }

  // Xóa tất cả các thông báo của người dùng
  xoaTatCaThongBaoTheoNguoiDungId(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xoa-tat-ca`, { responseType: 'json' });
  }
  // Lấy số thông báo chưa đọc của người dùng
  laySoThongBaoChuaDocTheoNguoiDungId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/chua-doc`);
  }
}
