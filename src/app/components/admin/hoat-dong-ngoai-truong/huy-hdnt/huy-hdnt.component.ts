import { StorageService } from 'src/app/services/storage.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-huy-hdnt',
  templateUrl: './huy-hdnt.component.html',
  styleUrls: ['./huy-hdnt.component.css']
})
export class HuyHdntComponent {
  constructor(
    public dialogRef: MatDialogRef<HuyHdntComponent>,
  ) {}
  closedialog() {
    this.dialogRef.close('no');
  }
  accept() {
    this.dialogRef.close('ok');
  }
}
