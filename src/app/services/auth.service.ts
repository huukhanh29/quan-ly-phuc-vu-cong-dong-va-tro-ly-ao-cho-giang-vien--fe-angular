import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { baseUrl } from '../config/config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(taiKhoan: string, matKhau: string): Observable<any> {
    const body = {
      taiKhoan: taiKhoan,
      matKhau: matKhau
    };

    return this.http.post(
      `/api/tai-khoan/dang-nhap`,
      body,
      httpOptions
    ).pipe(
      tap(response => {
        // Lưu thông tin người dùng vào cookie sau khi đăng nhập thành công
        this.storageService.saveUser(response);
      })
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
  logout(): Observable<any> {
    this.storageService.signOut();
    return this.http.post(
      `/api/tai-khoan/dang-xuat`,
      httpOptions
    );
  }
 //reset password

}
