import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-su-kien',
  templateUrl: './chi-tiet-su-kien.component.html',
  styleUrls: ['./chi-tiet-su-kien.component.css']
})
export class ChiTietSuKienComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { event: any }) {}
}
