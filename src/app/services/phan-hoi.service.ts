import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhanHoiService {
  private apiUrl = '/api/phan-hoi'; // Điều chỉnh URL tương ứng với API

  constructor(private http: HttpClient) {}

  createPhanHoi(phanHoiRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/them-moi`, phanHoiRequest);
  }

  getAllPhanHoi(
    page: number=0,
    size: number=10,
    sortBy: string='',
    sortDir: string ='',
    searchTerm: string='',
    tenDangNhap: string=''
  ): Observable<any> {
    const params: any = {
      page,
      size,
      sortBy,
      sortDir,
      searchTerm,
      tenDangNhap
    };
    return this.http.get<any>(`${this.apiUrl}/lay-danh-sach`, { params });
  }

  deletePhanHoi(ma: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xoa/${ma}`);
  }

  deleteAllPhanHoi(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xoa-tat-ca`);
  }

  replyToPhanHoi(cauHoi: any, id: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tra-loi/${id}`, cauHoi);
  }
}
