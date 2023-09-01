import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


const SECRET_KEY = 'frontend-duonghuukhanh-prolaydo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService, private router: Router) {}
  public saveUser(user: any): void {
    this.cookieService.deleteAll();
    const { tenTaiKhoan, quyen, token, refreshToken} = user;

    // Mã hóa từng trường trước khi lưu vào cookie
    const encryptedAccessToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();
    const encryptedUsername = CryptoJS.AES.encrypt(tenTaiKhoan, SECRET_KEY).toString();
    const encryptedRole = CryptoJS.AES.encrypt(quyen, SECRET_KEY).toString();
    // Lưu từng trường đã được mã hóa vào cookie
    this.cookieService.set('token', encryptedAccessToken, { expires: 7 });
    this.cookieService.set('refreshToken', encryptedRefreshToken, { expires: 7 });
    this.cookieService.set('quyen', encryptedRole, { expires: 7 });
    this.cookieService.set('tenTaiKhoan', encryptedUsername, { expires: 7 });
  }

  public getUser(): any {
    const encryptedAccessToken = this.cookieService.get('token');
    const encryptedRefreshToken = this.cookieService.get('refreshToken');
    const encryptedUsername = this.cookieService.get('tenTaiKhoan');
    const encryptedRole = this.cookieService.get('quyen');
    // Giải mã từng trường khi đọc từ cookie
    const token = CryptoJS.AES.decrypt(encryptedAccessToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const refreshToken = CryptoJS.AES.decrypt(encryptedRefreshToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const tenTaiKhoan = CryptoJS.AES.decrypt(encryptedUsername, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const quyen = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    // Tạo đối tượng user từ các trường đã được giải mã
    const user = {
      token,
      refreshToken,
      tenTaiKhoan, quyen
    };
    return user;
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  public signOut(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/dang-nhap']);
  }
}
