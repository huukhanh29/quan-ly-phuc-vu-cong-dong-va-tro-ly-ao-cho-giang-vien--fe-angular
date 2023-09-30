
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
@Component({
  selector: 'app-admin-destroy-activity',
  templateUrl: './admin-destroy-activity.component.html',
  styleUrls: ['./admin-destroy-activity.component.css']
})
export class AdminDestroyActivityComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
      isEditable: boolean;
    },
    private dialogRef: MatDialogRef<AdminDestroyActivityComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dangKyHoatDongService: DangKyHoatDongService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    if(!this.data.isEditable) {
      this.myform.get('lyDoHuy')?.setValue(this.data.item.lyDoHuy);
      this.myform.get('lyDoHuy')?.disable();
    }
  }

  closePopup() {
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    lyDoHuy: ['', Validators.required],
  });

  huy() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.dangKyHoatDongService.huyDangKyHoatDong(this.data.item.maDangKy,formData).subscribe({
        next: data=>{
          console.log(data)
            this.closePopup();
            this.toastr.success("Hủy đăng ký hoạt động thành công!");
        },
        error: err=>{
          this.toastr.error("Hủy hoạt động không thành công!");
          console.log(err)
        }
      } );
    }
  }
}
