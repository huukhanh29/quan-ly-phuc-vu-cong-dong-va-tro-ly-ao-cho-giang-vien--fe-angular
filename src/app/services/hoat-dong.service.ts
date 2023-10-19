import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoatDong } from '../models/HoatDong';

@Injectable({
  providedIn: 'root'
})
export class HoatDongService {

  private baseUrl = '/api/hoat-dong';

  constructor(private http: HttpClient) { }

  getHoatDongById(maHoatDong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maHoatDong}`);
  }

  getAllHoatDongs1(): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(`${this.baseUrl}/all`);
  }
  getAllHoatDong(
    page: number = 0,
    size: number = 10,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC',
    searchTerm: string = '',
    type: string = '',
    status?: any,
    startTime?: Date | null,
    endTime?: Date | null
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
      .set('searchTerm', searchTerm)
      .set('type', type);

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

    return this.http.get<any>(`${this.baseUrl}/lay-danh-sach`, { params: params });
  }
  addHoatDong(hoatDongResponse:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/them-moi`, hoatDongResponse);
  }

  updateHoatDong(maHoatDong: number, hoatDongResponse:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cap-nhat/${maHoatDong}`, hoatDongResponse);
  }

  deleteHoatDong(maHoatDong: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/xoa/${maHoatDong}`);
  }

  getYears(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lay-danh-sach-nam`);
  }

  countUpcomingActivities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/so-hoat-dong-chua-dien-ra`);
  }

  getAllLoaiHoatDong(): Observable<any> {
    return this.http.get(`${this.baseUrl}/danh-sach-loai-hoat-dong`);
  }
  suaFileHoatDong(maHoatDong: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.baseUrl}/sua-file/${maHoatDong}`, formData);
  }
  downloadFile(maHoatDongNgoaiTruong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maHoatDongNgoaiTruong}/download`, { responseType: 'blob', observe: 'response' });
  }
  getFileName(maHoatDong: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${maHoatDong}/ten-file`,  {responseType: 'text'});
  }
}
