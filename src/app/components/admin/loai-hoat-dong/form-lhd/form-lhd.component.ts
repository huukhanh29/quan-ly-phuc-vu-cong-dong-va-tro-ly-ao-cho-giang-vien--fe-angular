import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaiHoatDongService } from './../../../../services/loai-hoat-dong.service';
@Component({
  selector: 'app-form-lhd',
  templateUrl: './form-lhd.component.html',
  styleUrls: ['./form-lhd.component.css']
})
export class FormLhdComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<FormLhdComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loaiHoatDongService: LoaiHoatDongService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    if (this.data && this.data.item) {
      // Trường hợp chỉnh sửa: gán giá trị từ item vào form
      this.myform.patchValue({
        tenLoaiHoatDong: this.data.item.tenLoaiHoatDong,
        moTa: this.data.item.moTa,
      });
    }
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    tenLoaiHoatDong: ['', Validators.required],
    moTa: ['', Validators.required],

  });

  save() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      if (this.data && this.data.item) {
        // Trường hợp chỉnh sửa: cập nhật dữ liệu
        this.loaiHoatDongService.suaLoaiHoatDong(this.data.item.maLoaiHoatDong, formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên loại hoạt động đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Cập nhật loại hoạt động thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Cập nhật loại hoạt động không thành công!');
            console.log(err);
          },
        });
      } else {
        // Trường hợp thêm mới: thêm dữ liệu
        this.loaiHoatDongService.themLoaiHoatDong(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên loại hoạt động đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Thêm loại hoạt động thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Thêm loại hoạt động không thành công!');
            console.log(err);
          },
        });
      }
    }
  }
}
