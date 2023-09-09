import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: ['']
})
export class RootComponent {
  private role: string = '';
  isLoggedIn = false;
  username?: string;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.quyen;
      console.log(this.role)
      this.username = user.tenTaiKhoan;
      if (this.role === 'QuanTriVien') {
        this.router.navigate(['/quan-tri-vien']);
      }
      if (this.role === 'SinhVien') {
        this.router.navigate(['/sinh-vien']);
      }
      if (this.role === 'GiangVien') {
        this.router.navigate(['/giang-vien']);
      }
    } else {
      this.router.navigate(['dang-nhap']);
    }
  }
}
