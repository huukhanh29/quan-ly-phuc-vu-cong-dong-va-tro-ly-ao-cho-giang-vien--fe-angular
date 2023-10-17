import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-chuc-danh',
  templateUrl: './chi-tiet-chuc-danh.component.html',
  styleUrls: ['./chi-tiet-chuc-danh.component.css'],
})
export class ChiTietChucDanhComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ChiTietChucDanhComponent>
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
