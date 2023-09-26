
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

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
    private taiKhoanService:TaiKhoanService
  ) { }

  ngOnInit(): void {
    // if(this.taiKhoanService.)
    // this.isLoggedIn = this.storageService.isLoggedIn();
    // if (this.isLoggedIn) {
    //   this.isLoggedIn = true;
    //   this.router.navigate(['']);
    // }
   this.testLogin()
  }
  testLogin():void{
    const user = this.storageService.getUser();
    const body ={
      token:user.token
    }
    this.taiKhoanService.testLogin(body).subscribe({
      next:data=>{
        if(data.message && data.message==='ok'){
          this.isLoggedIn=true;
          this.router.navigate(['']);
        }

        if(data.message && data.message==='error'){
          this.storageService.xoaCookie()
          console.log("Thông tin xác thực sai! Vui lòng đăng nhập lại!")
        }

        if(data.message && data.message==='empty'){
          this.storageService.xoaCookie()
        }
      },
      error:err=>{}
    })
  }
  submit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        if (data.message && data.message === "info-warning") {
          this.errorMessage =
            'Sai thông tin tài khoản hoặc mật khẩu!<br>Vui lòng kiểm tra lại!';
          this.isLoginFailed = true;
          this.router.navigate(['/dang-nhap']);
        } else if (data.message && data.message === "account-block") {
          this.errorMessage = 'Tài khoản bị khóa!!!';
          this.isLoginFailed = true;
          this.router.navigate(['/dang-nhap']);
        } else {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['']);
          this.toastr.success('Đăng nhập thành công');
        }
      },
      error: (err) => {
        console.log(err.error)
        if(err.status===504){
          this.router.navigate(['/bao-tri'])
        }else{
          console.log(err)
        }
      },
    });
  }

}
