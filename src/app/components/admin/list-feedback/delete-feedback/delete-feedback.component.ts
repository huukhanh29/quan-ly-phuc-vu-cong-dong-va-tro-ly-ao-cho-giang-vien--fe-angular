import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-feedback',
  templateUrl: './delete-feedback.component.html',
  styleUrls: ['./delete-feedback.component.css']
})
export class DeleteFeedbackComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFeedbackComponent>,
  ) {}
  closedialog() {
    this.dialogRef.close('Closed');
  }
  accept() {
    this.dialogRef.close('accept');
  }
}
