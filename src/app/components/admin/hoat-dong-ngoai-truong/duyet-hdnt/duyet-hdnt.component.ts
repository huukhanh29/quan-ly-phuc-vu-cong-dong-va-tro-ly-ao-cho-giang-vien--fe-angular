
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
import { HoatDongNgoaiTruongService } from 'src/app/services/hoat-dong-ngoai-truong.service';
@Component({
  selector: 'app-duyet-hdnt',
  templateUrl: './duyet-hdnt.component.html',
  styleUrls: ['./duyet-hdnt.component.css']
})
export class DuyetHdntComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any
    },
    private dialogRef: MatDialogRef<DuyetHdntComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private hoatDongNgoaiTruongService: HoatDongNgoaiTruongService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {

  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }


  myform = this.formBuilder.group({
    gioTichLuyThamGia: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    // Thêm các trường khác vào đây nếu cần
  });


  duyet() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.hoatDongNgoaiTruongService.pheDuyetHoatDongNgoaiTruong(this.data.item.maHoatDongNgoaiTruong,formData).subscribe({
        next: data=>{
          console.log(formData)
          console.log(data)
          this.dialogRef.close('ok');
            this.toastr.success("Duyệt đăng ký hoạt động thành công!");
        },
        error: err=>{
          this.toastr.error("Duyệt hoạt động không thành công!");
          console.log(err)
        }
      } );
    }
  }
}
