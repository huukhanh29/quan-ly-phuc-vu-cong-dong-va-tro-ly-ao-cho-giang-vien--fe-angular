import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }

  logout(): void {
    this.storageService.signOut();
    window.location.reload();
  }
}
