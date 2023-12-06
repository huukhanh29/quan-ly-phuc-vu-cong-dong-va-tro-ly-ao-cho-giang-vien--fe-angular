import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-lecturer',
  template: '<app-sidebar-lecturer></app-sidebar-lecturer>',
  styles: ['']
})
export class LecturerComponent {
  private roles: string = '';
  isLoggedIn = false;
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    const user = this.storageService.getUser();
    this.roles = user.quyen;
    if(!this.isLoggedIn){
      this.router.navigate(['/dang-nhap']);
    }else if (this.roles !== 'GiangVien') {
       this.router.navigate(['/403']);
    }
  }
}
