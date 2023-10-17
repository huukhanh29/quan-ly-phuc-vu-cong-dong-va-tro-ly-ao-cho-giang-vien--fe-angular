import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-truong',
  templateUrl: './chi-tiet-truong.component.html',
  styleUrls: ['./chi-tiet-truong.component.css'],
})
export class ChiTietTruongComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ChiTietTruongComponent>
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
