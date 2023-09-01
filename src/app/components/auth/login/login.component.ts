
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['']);
    }
  }

  submit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['']);
        this.toastr.success('Đăng nhập thành công');
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = 'Lỗi server!';
          this.isLoginFailed = true;
        } else {
          this.errorMessage = 'Sai thông tin tài khoản hoặc mật khẩu!<br>Vui lòng kiểm tra lại!';
          this.isLoginFailed = true;
        }
        this.router.navigate(['/dang-nhap']);
      }
    });
  }
}
