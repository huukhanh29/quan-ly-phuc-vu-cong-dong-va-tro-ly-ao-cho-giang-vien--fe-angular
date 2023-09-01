import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { baseUrl } from '../config/config';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.storageService.getUser();
    if (user != null) {
      req = this.addTokenHeader(req, user.token);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && !req.url.includes(`${baseUrl}/dang-nhap`)) {
          return this.handleUnauthorizedError(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.storageService.getUser();
    return this.authService.refreshAccessToken(user.refreshToken).pipe(
      switchMap((response: any) => {
        const newReq = this.addTokenHeader(req, response.token);
        this.storageService.saveUser(response);
        return next.handle(newReq);
      }),
      catchError((error: any) => {
        this.storageService.signOut();
        return throwError(() => error);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
