import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-chi-tiet-lhd',
  templateUrl: './chi-tiet-lhd.component.html',
  styleUrls: ['./chi-tiet-lhd.component.css'],
})
export class ChiTietLhdComponent {
  cauHoi!: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ChiTietLhdComponent>
  ) {}
  closePopup() {
    this.dialogRef.close();
  }
}
