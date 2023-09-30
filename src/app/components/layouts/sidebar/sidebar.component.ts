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

  }
}
