import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThongBao } from 'src/app/models/ThongBao';
import { ThongBaoService } from 'src/app/services/thong-bao.service';

@Component({
  selector: 'app-thong-bao-dialog',
  templateUrl: './thong-bao-dialog.component.html',
  styleUrls: ['./thong-bao-dialog.component.css']
})
export class ThongBaoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { notification: ThongBao, deleteHandler: (maThongBao: number) => void },
  private dialogRef: MatDialogRef<ThongBaoDialogComponent>,) { }

  handleDelete() {
    this.data.deleteHandler(this.data.notification.maThongBao);
    this.dialogRef.close('xoa');
  }
  closePopup() {
    this.dialogRef.close('dong');
  }
}
