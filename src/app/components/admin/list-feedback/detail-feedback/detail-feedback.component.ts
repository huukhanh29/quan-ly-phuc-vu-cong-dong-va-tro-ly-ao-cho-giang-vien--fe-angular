import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhanHoiService } from 'src/app/services/phan-hoi.service';

@Component({
  selector: 'app-detail-feedback',
  templateUrl: './detail-feedback.component.html',
  styleUrls: ['./detail-feedback.component.css']
})
export class DetailFeedbackComponent {
  cauHoi!: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      phanHoi: any;
    },
    private dialogRef: MatDialogRef<DetailFeedbackComponent>,
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
}
