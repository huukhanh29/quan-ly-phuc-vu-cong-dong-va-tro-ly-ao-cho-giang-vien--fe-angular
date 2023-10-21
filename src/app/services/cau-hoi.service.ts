import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CauHoiService {
  constructor(private http: HttpClient) {}
  // Gọi API để đặt câu hỏi và lấy câu trả lời
  getAnswer(cauHoi: string): Observable<any> {
    const body = {
      cauHoi: cauHoi,
    };
    return this.http.post(`/api/cau-hoi/dat-cau-hoi`, body);
  }

  // Gọi API để thêm mới câu hỏi
  createCauHoi(cauHoi: any): Observable<any> {
    return this.http.post(`/api/cau-hoi/them-moi`, cauHoi);
  }

  // Gọi API để lấy danh sách câu hỏi phân trang
  getAllCauHoi(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string,
    searchTerm: string
  ): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      sortBy: sortBy,
      sortDir: sortDir,
      searchTerm: searchTerm,
    };
    return this.http.get(`/api/cau-hoi/lay-danh-sach`, { params });
  }

  // Gọi API để lấy chi tiết câu hỏi theo ID
  getCauHoiById(maCauHoi: number): Observable<any> {
    return this.http.get(`/api/cau-hoi/${maCauHoi}`);
  }

  // Gọi API để cập nhật câu hỏi theo ID
  updateCauHoi(maCauHoi: number, cauHoiDetails: any): Observable<any> {
    return this.http.put(
      `/api/cau-hoi/cap-nhat/${maCauHoi}`,
      cauHoiDetails
    );
  }

  // Gọi API để xóa câu hỏi theo ID
  deleteCauHoi(maCauHoi: number): Observable<any> {
    return this.http.delete(`/api/cau-hoi/xoa/${maCauHoi}`);
  }

  // Gọi API để lấy tổng số câu hỏi
  countCauHoi(): Observable<any> {
    return this.http.get(`/api/cau-hoi/tong-cau-hoi`);
  }
  uploadWordFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`/api/cau-hoi/them-file`, formData).pipe(
      catchError(error => of({ error: true, message: `Upload Error: ${error.message}` }))
    );
  }
  downloadFile(): Observable<any> {
    return this.http.get(`/api/cau-hoi/file-mau/download`, { responseType: 'blob', observe: 'response' });
  }
}
