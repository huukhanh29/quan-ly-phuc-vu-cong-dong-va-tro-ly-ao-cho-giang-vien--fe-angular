import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hoatdongcongdong-fe';
}
