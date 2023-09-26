import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,
    private taiKhoanService: TaiKhoanService,
    private toastr: ToastrService
  ) {}
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout(): void {
    let dialogRef = this.dialog.open(LogoutComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'accept') {
        // const user = this.storageService.getUser();
        // const body = {
        //   refreshToken: user.refreshToken,
        // };
        // this.taiKhoanService.xoaRefreshToken(body).subscribe({
        //   next: (data) => {
        //     this.storageService.xoaCookie();
        //     this.router.navigate(['dang-nhap']);
        //     this.toastr.success('Bạn đã đăng xuất!!!');
        //   },
        //   error: (err) => {
        //     console.error(err);
        //   },
        // });
      }
    });
  }
}
