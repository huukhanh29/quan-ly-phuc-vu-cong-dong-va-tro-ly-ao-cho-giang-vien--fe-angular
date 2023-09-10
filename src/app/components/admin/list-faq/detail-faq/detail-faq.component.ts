import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CauHoi } from 'src/app/models/CauHoi';
import { CauHoiService } from 'src/app/services/cau-hoi.service';

@Component({
  selector: 'app-detail-faq',
  templateUrl: './detail-faq.component.html',
  styleUrls: ['./detail-faq.component.css'],
})
export class DetailFaqComponent implements OnInit {
  cauHoi!: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: any;
    },
    private dialogRef: MatDialogRef<DetailFaqComponent>,
    private cauHoiService: CauHoiService
  ) {}

  ngOnInit(): void {
    this.loadThongTinCauHoi()
  }
  loadThongTinCauHoi() {
    this.cauHoiService.getCauHoiById(this.data.id).subscribe({
      next: (data) => {
        console.log(data)
        this.cauHoi = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
}
