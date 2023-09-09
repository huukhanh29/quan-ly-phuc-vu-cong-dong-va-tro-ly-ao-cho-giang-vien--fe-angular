// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import * as CryptoJS from 'crypto-js';
// import { Router } from '@angular/router';


// const SECRET_KEY = 'frontend-duonghuukhanh-prolaydo';

// @Injectable({
//   providedIn: 'root',
// })
// export class StorageService {
//   constructor(private cookieService: CookieService, private router: Router) {}
//   public saveUser(user: any): void {
//     this.cookieService.deleteAll();
//     const { tenTaiKhoan, quyen, token, refreshToken, ngayHetHan } = user;

//     // Mã hóa từng trường trước khi lưu vào cookie
//     const encryptedAccessToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
//     const encryptedRefreshToken = CryptoJS.AES.encrypt(refreshToken, SECRET_KEY).toString();
//     const encryptedUsername = CryptoJS.AES.encrypt(tenTaiKhoan, SECRET_KEY).toString();
//     const encryptedRole = CryptoJS.AES.encrypt(quyen, SECRET_KEY).toString();
//     const encryptedExpiration = CryptoJS.AES.encrypt(ngayHetHan.toString(), SECRET_KEY).toString(); // Mã hóa thời gian hết hạn

//     // Lưu từng trường đã được mã hóa vào cookie
//     this.cookieService.set('token', encryptedAccessToken, { expires: 7 });
//     this.cookieService.set('refreshToken', encryptedRefreshToken, { expires: 7 });
//     this.cookieService.set('quyen', encryptedRole, { expires: 7 });
//     this.cookieService.set('tenTaiKhoan', encryptedUsername, { expires: 7 });
//     this.cookieService.set('ngayHetHan', encryptedExpiration, { expires: 7 }); // Lưu thời gian hết hạn
//   }

//   public getUser(): any {
//     const encryptedAccessToken = this.cookieService.get('token');
//     const encryptedRefreshToken = this.cookieService.get('refreshToken');
//     const encryptedUsername = this.cookieService.get('tenTaiKhoan');
//     const encryptedRole = this.cookieService.get('quyen');
//     const encryptedExpiration = this.cookieService.get('ngayHetHan'); // Lấy thời gian hết hạn

//     // Giải mã từng trường khi đọc từ cookie
//     const token = CryptoJS.AES.decrypt(encryptedAccessToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
//     const refreshToken = CryptoJS.AES.decrypt(encryptedRefreshToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
//     const tenTaiKhoan = CryptoJS.AES.decrypt(encryptedUsername, SECRET_KEY).toString(CryptoJS.enc.Utf8);
//     const quyen = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY).toString(CryptoJS.enc.Utf8);
//     const ngayHetHan = Number(CryptoJS.AES.decrypt(encryptedExpiration, SECRET_KEY).toString(CryptoJS.enc.Utf8)); // Giải mã thời gian hết hạn

//     // Tạo đối tượng user từ các trường đã được giải mã
//     const user = {
//       token,
//       refreshToken,
//       tenTaiKhoan,
//       quyen,
//       ngayHetHan, // Thêm thông tin thời gian hết hạn vào đối tượng user
//     };
//     return user;
//   }

//   public isLoggedIn(): boolean {
//     return this.cookieService.check('token');
//   }

//   public signOut(): void {
//     this.cookieService.deleteAll();
//   }
// }
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
    const { tenTaiKhoan, quyen, token, refreshToken, ngayHetHan } = user;

    // Lưu từng trường trực tiếp vào cookie
    this.cookieService.set('token', token, { expires: 7 });
    this.cookieService.set('refreshToken', refreshToken, { expires: 7 });
    this.cookieService.set('quyen', quyen, { expires: 7 });
    this.cookieService.set('tenTaiKhoan', tenTaiKhoan, { expires: 7 });
    this.cookieService.set('ngayHetHan', ngayHetHan.toString(), { expires: 7 }); // Lưu thời gian hết hạn
  }

  public getUser(): any {
    const token = this.cookieService.get('token');
    const refreshToken = this.cookieService.get('refreshToken');
    const tenTaiKhoan = this.cookieService.get('tenTaiKhoan');
    const quyen = this.cookieService.get('quyen');
    const ngayHetHan = Number(this.cookieService.get('ngayHetHan')); // Lấy thời gian hết hạn

    // Tạo đối tượng user từ các trường đã được lấy ra từ cookie
    const user = {
      token,
      refreshToken,
      tenTaiKhoan,
      quyen,
      ngayHetHan, // Thêm thông tin thời gian hết hạn vào đối tượng user
    };
    return user;
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  public xoaCookie(): void {
    this.cookieService.deleteAll();
  }
}
