import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { TaiKhoanService } from './services/tai-khoan.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [''],
})
export class RootComponent {
  private role: string = '';
  isLoggedIn = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private taiKhoanService: TaiKhoanService
  ) {}
  testLogin(): void {
    const user = this.storageService.getUser();
    if (user.token) {
      this.role = user.quyen;
      const body = {
        token: user.token,
      };
      this.taiKhoanService.testLogin(body).subscribe({
        next: (data) => {
          if (data.message && data.message === 'ok') {
            switch (this.role) {
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
                this.router.navigate(['dang-nhap']);
                break;
            }
          }
          if (data.message && data.message === 'error') {
            this.storageService.xoaCookie();
            this.router.navigate(['dang-nhap']);
          }
          if (data.message && data.message === 'empty') {
            this.storageService.xoaCookie();
          }
        },
        error: (err) => {
          this.router.navigate(['dang-nhap']);
          console.log(err);
        },
      });
    } else {
      this.router.navigate(['dang-nhap']);
    }
  }
  ngOnInit(): void {
    this.testLogin();
  }
}
