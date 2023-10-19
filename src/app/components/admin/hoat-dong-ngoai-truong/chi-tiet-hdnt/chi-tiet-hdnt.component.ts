import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { HoatDongNgoaiTruongService } from 'src/app/services/hoat-dong-ngoai-truong.service';

@Component({
  selector: 'app-chi-tiet-hdnt',
  templateUrl: './chi-tiet-hdnt.component.html',
  styleUrls: ['./chi-tiet-hdnt.component.css']
})
export class ChiTietHdntComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any,
      tenFile: any
    },
    private dialogRef: MatDialogRef<ChiTietHdntComponent>,
    private hoatDongNgoaiTruongService: HoatDongNgoaiTruongService,
    private toastr: ToastrService
  ) {}

  closePopup() {
    this.dialogRef.close();
  }
  taiFile(ma: any) {
    this.hoatDongNgoaiTruongService.downloadFile(ma).subscribe({
      next: (response) => {
        const blob = new Blob([response.body as Blob], {
          type: 'application/octet-stream',
        });
        // Extract filename from the Content-Disposition header
        const contentDisposition = response.headers.get('content-disposition');
        let filename = 'default-filename.ext'; // default filename if not provided
        if (contentDisposition) {
          const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
            contentDisposition
          );
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: (err) => {
        this.toastr.error('Tải thất bại');
      },
    });
  }
}
