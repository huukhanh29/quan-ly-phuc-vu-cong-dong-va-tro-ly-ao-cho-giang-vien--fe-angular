import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router
  ) {}
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout(): void {
    this.dialog.open(LogoutComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }
}
