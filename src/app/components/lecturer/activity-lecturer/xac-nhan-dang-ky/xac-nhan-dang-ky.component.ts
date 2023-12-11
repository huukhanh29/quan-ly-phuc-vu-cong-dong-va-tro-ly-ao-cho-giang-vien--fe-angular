import { StorageService } from 'src/app/services/storage.service';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-xac-nhan-dang-ky',
  templateUrl: './xac-nhan-dang-ky.component.html',
  styleUrls: ['./xac-nhan-dang-ky.component.css']
})
export class XacNhanDangKyComponent {
  constructor(
    public dialogRef: MatDialogRef<XacNhanDangKyComponent>,
  ) {}
  closedialog() {
    this.dialogRef.close('no');
  }
  accept() {
    this.dialogRef.close('ok');
  }
}
