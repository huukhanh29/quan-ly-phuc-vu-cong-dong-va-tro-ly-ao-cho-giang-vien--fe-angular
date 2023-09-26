import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
import { PhanHoiService } from 'src/app/services/phan-hoi.service';
@Component({
  selector: 'app-reply-feedback',
  templateUrl: './reply-feedback.component.html',
  styleUrls: ['./reply-feedback.component.css']
})
export class ReplyFeedbackComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      phanHoi: any;
    },
    private dialogRef: MatDialogRef<ReplyFeedbackComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private phanHoiService: PhanHoiService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

  closePopup() {
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    cauHoi: ['', Validators.required],
    traLoi: ['', Validators.required],
  });

  saveFaq() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.phanHoiService.replyToPhanHoi(formData, this.data.phanHoi.maPhanHoi).subscribe({
        next: data=>{
          if(data.message && data.message === 'cauhoi-exist'){
            this.toastr.warning("Từ khóa đã tồn tại! Đã gán cho phản hồi!");
          }else{
            this.closePopup();
            this.toastr.success("Thêm câu hỏi thành công!");
          }

        },
        error: err=>{
          this.toastr.error("Thêm câu hỏi không thành công!");
          console.log(err)
        }
      } );
    }
  }
}

