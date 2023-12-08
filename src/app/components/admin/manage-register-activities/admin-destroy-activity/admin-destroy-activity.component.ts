
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
import { StorageService } from './../../../../services/storage.service';
@Component({
  selector: 'app-admin-destroy-activity',
  templateUrl: './admin-destroy-activity.component.html',
  styleUrls: ['./admin-destroy-activity.component.css']
})
export class AdminDestroyActivityComponent {
  role: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
      isEditable: boolean;
    },
    private dialogRef: MatDialogRef<AdminDestroyActivityComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dangKyHoatDongService: DangKyHoatDongService,
    private storageService: StorageService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    const user = this.storageService.getUser()
    this.role= user.quyen
    if(!this.data.isEditable) {
      this.myform.get('lyDoHuy')?.setValue(this.data.item.lyDoHuy);
      this.myform.get('lyDoHuy')?.disable();
    }
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
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
          this.dialogRef.close('Closed');
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
