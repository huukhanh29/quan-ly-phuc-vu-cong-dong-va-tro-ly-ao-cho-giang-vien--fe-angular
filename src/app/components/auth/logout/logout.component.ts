import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
        private taiKhoanService: TaiKhoanService,
        private router: Router, private toastr: ToastrService,
        private storageService:StorageService
  ) {}
  closedialog() {
    this.dialogRef.close('Closed');
  }
  accept() {
    this.dialogRef.close('accept');
    const user = this.storageService.getUser();
        const body = {
          refreshToken: user.refreshToken,
        };
        this.taiKhoanService.xoaRefreshToken(body).subscribe({
          next: (data) => {
            this.storageService.xoaCookie();
            this.router.navigate(['dang-nhap']);
            this.toastr.success('Bạn đã đăng xuất!!!');
          },
          error: (err) => {
            console.error(err);
          },
        });
  }
}
