import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

enum Messages {
  OK = 'ok',
  ERROR = 'error',
  EMPTY = 'empty',
  INFO_WARNING = 'info-warning',
  ACCOUNT_BLOCK = 'account-block',
}

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
    password: null,
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.testLogin();
  }

  private async testLogin(): Promise<void> {
    try {
      const user = this.storageService.getUser();
      const body = { token: user.token };
      const data = await this.taiKhoanService.testLogin(body).toPromise();

      this.handleTestLoginSuccess(data);
    } catch (error) {
      console.error("Test login failed", error);
    }
  }

  private handleTestLoginSuccess(data: any): void {
    switch (data.message) {
      case Messages.OK:
        this.isLoggedIn = true;
        this.router.navigate(['']);
        break;
      case Messages.ERROR:
        this.storageService.xoaCookie();
        console.log("Thông tin xác thực sai! Vui lòng đăng nhập lại!");
        break;
      case Messages.EMPTY:
        this.storageService.xoaCookie();
        break;
    }
  }

  async submit(): Promise<void> {
    try {
      const { username, password } = this.form;
      const data = await this.authService.login(username, password).toPromise();

      this.handleLoginSuccess(data);
    } catch (error) {
      this.handleLoginError(error);
    }
  }

  private handleLoginSuccess(data: any): void {
    switch (data.message) {
      case Messages.INFO_WARNING:
        this.errorMessage = 'Sai thông tin tài khoản hoặc mật khẩu!<br>Vui lòng kiểm tra lại!';
        this.isLoginFailed = true;
        this.router.navigate(['/dang-nhap']);
        break;
      case Messages.ACCOUNT_BLOCK:
        this.errorMessage = 'Tài khoản bị khóa!!!';
        this.isLoginFailed = true;
        this.router.navigate(['/dang-nhap']);
        break;
      default:
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['']);
        this.toastr.success('Đăng nhập thành công');
    }
  }

  private handleLoginError(error: any): void {
    console.error(error.error);
    if (error.status === 504) {
      this.router.navigate(['/bao-tri']);
    }
  }
}
