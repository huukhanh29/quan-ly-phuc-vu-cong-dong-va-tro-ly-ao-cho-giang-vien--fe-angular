import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LichSuService {

  private baseUrl = '/api/lich-su'; 

  constructor(private http: HttpClient) { }

  getLichSu(page: number, size: number, sortBy: string, sortDir: string, searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir)
      .set('searchTerm', searchTerm);

    return this.http.get(`${this.baseUrl}?${params.toString()}`);
  }

  getChartData(year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/bieu-do-luot-hoi?year=${year}`);
  }

  getDistinctYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/danh-sach-nam-cua-lich-su`);
  }
}
