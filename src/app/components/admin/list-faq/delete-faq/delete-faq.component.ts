import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-faq',
  templateUrl: './delete-faq.component.html',
  styleUrls: ['./delete-faq.component.css']
})
export class DeleteFaqComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFaqComponent>,
  ) {}
  closedialog() {
    this.dialogRef.close('Closed');
  }
  accept() {
    this.dialogRef.close('accept');
  }
}
