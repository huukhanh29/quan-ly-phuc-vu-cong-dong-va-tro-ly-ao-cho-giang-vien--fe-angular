import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChucDanhService } from './../../../../services/chuc-danh.service';

@Component({
  selector: 'app-form-chuc-danh',
  templateUrl: './form-chuc-danh.component.html',
  styleUrls: ['./form-chuc-danh.component.css']
})
export class FormChucDanhComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<FormChucDanhComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private chucDanhService: ChucDanhService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    if (this.data && this.data.item) {
      // Trường hợp chỉnh sửa: gán giá trị từ item vào form
      this.myform.patchValue({
        tenChucDanh: this.data.item.tenChucDanh,
        gioBatBuoc: this.data.item.gioBatBuoc
      });
    }
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    tenChucDanh: ['', Validators.required],
    gioBatBuoc: ['', Validators.required]
  });

  save() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      if (this.data && this.data.item) {
        // Trường hợp chỉnh sửa: cập nhật dữ liệu
        this.chucDanhService.editChucDanh(this.data.item.maChucDanh, formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Chức Danh đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Cập nhật Chức Danh thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Cập nhật Chức Danh không thành công!');
            console.log(err);
          },
        });
      } else {
        // Trường hợp thêm mới: thêm dữ liệu
        this.chucDanhService.addChucDanh(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Chức Danh đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Thêm Chức Danh thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Thêm Chức Danh không thành công!');
            console.log(err);
          },
        });
      }
    }
  }
}
