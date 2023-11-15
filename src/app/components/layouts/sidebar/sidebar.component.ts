import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ToastrService } from 'ngx-toastr';
import { UserInfoComponent } from '../../user-info/user-info.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit{
  username!: string
  role!: string
  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private taiKhoanService: TaiKhoanService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.tenTaiKhoan;
    this.role = user.quyen
  }

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

  }
  info(): void {
    this.taiKhoanService.layThongTinNguoiDung().subscribe(data => {
      console.log(data)
      this.dialog.open(UserInfoComponent, {
        width: '500px',
        data: data
      });
    });
  }
  home(){
    this.router.navigate(['/']);
  }
}
