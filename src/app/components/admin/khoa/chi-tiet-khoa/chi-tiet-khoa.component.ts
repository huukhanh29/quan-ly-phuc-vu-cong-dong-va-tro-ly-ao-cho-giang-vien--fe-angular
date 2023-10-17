import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chi-tiet-khoa',
  templateUrl: './chi-tiet-khoa.component.html',
  styleUrls: ['./chi-tiet-khoa.component.css'],
})
export class ChiTietKhoaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ChiTietKhoaComponent>
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
