import { StorageService } from 'src/app/services/storage.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
  ) {}
  closedialog() {
    this.dialogRef.close('no');
  }
  accept() {
    this.dialogRef.close('ok');
  }
}
