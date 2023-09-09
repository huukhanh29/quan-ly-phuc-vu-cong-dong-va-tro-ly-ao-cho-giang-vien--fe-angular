import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-student',
  template: `<app-student-header></app-student-header>
  <router-outlet></router-outlet>
  <app-student-footer></app-student-footer>`,
  styles: ['']
})
export class StudentComponent {
  private roles: string = '';
  isLoggedIn = false;
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    const user = this.storageService.getUser();
    this.roles = user.quyen;
    if (!this.isLoggedIn || this.roles !== 'SinhVien') {
      this.router.navigate(['/403']);
    }
  }
}
