import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      student: any;
    },
    private dialogRef: MatDialogRef<DetailStudentComponent>
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
