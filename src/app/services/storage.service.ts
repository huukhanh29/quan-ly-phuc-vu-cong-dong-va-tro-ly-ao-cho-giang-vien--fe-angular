import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

const SECRET_KEY = 'frontend-duonghuukhanh';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService, private router: Router) {}
  public saveUser(user: any): void {
    this.cookieService.deleteAll("/");
    const { tenTaiKhoan, quyen, token, refreshToken, ngayHetHan } = user;

    // Mã hóa từng trường trước khi lưu vào cookie
    const encryptedAccessToken = CryptoJS.AES.encrypt(
      token,
      SECRET_KEY
    ).toString();
    const encryptedRefreshToken = CryptoJS.AES.encrypt(
      refreshToken,
      SECRET_KEY
    ).toString();
    const encryptedUsername = CryptoJS.AES.encrypt(
      tenTaiKhoan,
      SECRET_KEY
    ).toString();
    const encryptedRole = CryptoJS.AES.encrypt(quyen, SECRET_KEY).toString();
    const encryptedExpiration = CryptoJS.AES.encrypt(
      ngayHetHan.toString(),
      SECRET_KEY
    ).toString(); // Mã hóa thời gian hết hạn

    // Tùy chọn path
    const cookieOptions: CookieOptions = { expires: 7, path: '/' };

    // Lưu từng trường đã được mã hóa vào cookie với tùy chọn path
    this.cookieService.set('token', encryptedAccessToken, cookieOptions);
    this.cookieService.set('refreshToken', encryptedRefreshToken, cookieOptions);
    this.cookieService.set('quyen', encryptedRole, cookieOptions);
    this.cookieService.set('tenTaiKhoan', encryptedUsername, cookieOptions);
    this.cookieService.set('ngayHetHan', encryptedExpiration, cookieOptions); // Lưu thời gian hết hạn
  }

  public getUser(): any {
    try {
      const encryptedAccessToken = this.cookieService.get('token');
      const encryptedRefreshToken = this.cookieService.get('refreshToken');
      const encryptedUsername = this.cookieService.get('tenTaiKhoan');
      const encryptedRole = this.cookieService.get('quyen');
      const encryptedExpiration = this.cookieService.get('ngayHetHan'); // Lấy thời gian hết hạn

      // Giải mã từng trường khi đọc từ cookie
      const token = CryptoJS.AES.decrypt(
        encryptedAccessToken,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      const refreshToken = CryptoJS.AES.decrypt(
        encryptedRefreshToken,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      const tenTaiKhoan = CryptoJS.AES.decrypt(
        encryptedUsername,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      const quyen = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      );
      const ngayHetHan = Number(
        CryptoJS.AES.decrypt(encryptedExpiration, SECRET_KEY).toString(
          CryptoJS.enc.Utf8
        )
      ); // Giải mã thời gian hết hạn

      // Tạo đối tượng user từ các trường đã được giải mã
      const user = {
        token,
        refreshToken,
        tenTaiKhoan,
        quyen,
        ngayHetHan,
      };
      return user;
    } catch (error) {
      this.cookieService.deleteAll("/");
      console.error('Lỗi khi giải mã cookie:', error);
      return null;
    }
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  public xoaCookie(): void {
    this.cookieService.deleteAll("/");
  }


}
