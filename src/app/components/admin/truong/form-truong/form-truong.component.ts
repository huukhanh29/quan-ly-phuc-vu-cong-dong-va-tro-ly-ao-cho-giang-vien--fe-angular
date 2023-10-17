import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TruongService } from './../../../../services/truong.service';

@Component({
  selector: 'app-form-truong',
  templateUrl: './form-truong.component.html',
  styleUrls: ['./form-truong.component.css']
})
export class FormTruongComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<FormTruongComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private truongService: TruongService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    if (this.data && this.data.item) {
      // Trường hợp chỉnh sửa: gán giá trị từ item vào form
      this.myform.patchValue({
        tenTruong: this.data.item.tenTruong,
      });
    }
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    tenTruong: ['', Validators.required],
  });

  save() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      if (this.data && this.data.item) {
        // Trường hợp chỉnh sửa: cập nhật dữ liệu
        this.truongService.suaTruong(this.data.item.maTruong, formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Trường đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Cập nhật Trường thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Cập nhật Trường không thành công!');
            console.log(err);
          },
        });
      } else {
        // Trường hợp thêm mới: thêm dữ liệu
        this.truongService.themTruong(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Trường đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Thêm Trường thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Thêm Trường không thành công!');
            console.log(err);
          },
        });
      }
    }
  }
}
