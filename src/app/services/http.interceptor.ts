import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import {  Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.storageService.getUser();
    const currentTime = Math.floor(new Date().getTime() / 1000);

    const excludedUrls = ['/api/tai-khoan/dang-nhap',
    '/api/tai-khoan/cap-lai-token'];

    if (user != null && !excludedUrls.some(url => req.url.includes(url))) {
      // Thêm một khoảng thời gian dự phòng 30 giây cho thời gian hết hạn của token
      const expirationWithGracePeriod = user.ngayHetHan - 30;
     // console.log(user)
      if (currentTime < expirationWithGracePeriod) {
        req = this.addTokenHeader(req, user.token);
      } else {
        return this.authService.refreshAccessToken(user.refreshToken).pipe(
          switchMap((response: any) => {
            this.authService.xoaRefreshToken();
            const newReq = this.addTokenHeader(req, response.token);
            this.storageService.saveUser(response);
            return next.handle(newReq);
          }),
          catchError((error: any) => {
            this.storageService.xoaCookie();
            return throwError(() => error);
          })
        );
      }
    }
    return next.handle(req).pipe(
      catchError((error) => {
        console.error('Có lỗi xãy ra:', error);
        //this.storageService.xoaCookie();
        return throwError(() => new Error(error));
      })
    );
  }

  private addTokenHeader(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
