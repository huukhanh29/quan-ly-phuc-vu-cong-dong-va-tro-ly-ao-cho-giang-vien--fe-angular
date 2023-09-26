import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(taiKhoan: any, matKhau: any): Observable<any> {
    const body = {
      taiKhoan: taiKhoan,
      matKhau: matKhau
    };
    return this.http.post(
      `/api/tai-khoan/dang-nhap`,
      body,
      httpOptions
    );
  }

  refreshAccessToken(refreshToken: string): Observable<any> {
    const body = {
      refreshToken: refreshToken
    };
    return this.http.post(
      `/api/tai-khoan/cap-lai-token`,
      body,
      httpOptions
    );
  }


}
