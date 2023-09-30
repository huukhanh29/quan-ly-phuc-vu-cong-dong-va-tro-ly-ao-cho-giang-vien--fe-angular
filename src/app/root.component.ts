import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaiKhoanService } from './services/tai-khoan.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [''],
})
export class RootComponent {
  constructor(
    private router: Router,
    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  private initializeApp(): void {
    const user = this.storageService.getUser();
    if (user && user.token) {
      this.validateLogin(user.token);
    } else {
      this.navigateToLogin();
    }
  }

  private validateLogin(token: string): void {
    const user = this.storageService.getUser();
    this.taiKhoanService.testLogin({ token }).subscribe({
      next: (data) => {
        if (data.message === 'ok') {
          this.navigateToDashboard(user.quyen);
        } else {
          this.handleInvalidToken();
        }
      },
      error: (err) => {
        console.error('Error validating login:', err);
        this.handleInvalidToken();
      },
    });
  }

  private navigateToDashboard(role: string): void {
    switch (role) {
      case 'QuanTriVien':
        this.router.navigate(['/quan-tri-vien']);
        break;
      case 'SinhVien':
        this.router.navigate(['/sinh-vien']);
        break;
      case 'GiangVien':
        this.router.navigate(['/giang-vien']);
        break;
      default:
        this.navigateToLogin();
        break;
    }
  }

  private handleInvalidToken(): void {
    this.storageService.xoaCookie();
    this.navigateToLogin();
  }

  private navigateToLogin(): void {
    this.router.navigate(['/dang-nhap']);
  }
}
