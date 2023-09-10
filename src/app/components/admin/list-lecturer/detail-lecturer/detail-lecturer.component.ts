import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-lecturer',
  templateUrl: './detail-lecturer.component.html',
  styleUrls: ['./detail-lecturer.component.css'],
})
export class DetailLecturerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lecturer: any;
    },
    private dialogRef: MatDialogRef<DetailLecturerComponent>
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
