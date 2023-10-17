import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KhoaService } from './../../../../services/khoa.service';
import { TruongService } from './../../../../services/truong.service';

@Component({
  selector: 'app-form-khoa',
  templateUrl: './form-khoa.component.html',
  styleUrls: ['./form-khoa.component.css']
})
export class FormKhoaComponent implements OnInit {
  danhSachTruong: any[] = []; // Danh sách Trường (đảm bảo có thông tin mã và tên Trường)

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<FormKhoaComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private khoaService: KhoaService,
    private truongService: TruongService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.loadDanhSachTruong();

    if (this.data && this.data.item) {
      // Trường hợp chỉnh sửa: gán giá trị từ item vào form
      this.myform.patchValue({
        tenKhoa: this.data.item.tenKhoa,
        maTruong: this.data.item.truong?.maTruong
      });
    }
  }

  loadDanhSachTruong() {
    this.truongService.layTatCaTruong().subscribe(data => this.danhSachTruong = data);
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  myform = this.formBuilder.group({
    tenKhoa: ['', Validators.required],
    maTruong: ['', Validators.required]
  });

  save() {
    if (this.myform.valid) {
      const formData = this.myform.value;
      if (this.data && this.data.item) {
        // Trường hợp chỉnh sửa: cập nhật dữ liệu
        this.khoaService.suaKhoa(this.data.item.maKhoa, formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Khoa đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Cập nhật Khoa thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Cập nhật Khoa không thành công!');
            console.log(err);
          },
        });
      } else {
        // Trường hợp thêm mới: thêm dữ liệu
        this.khoaService.themKhoa(formData).subscribe({
          next: (data) => {
            console.log(data);
            if (data.message && data.message === 'exist') {
              this.toastr.warning('Tên Khoa đã tồn tại!');
            } else {
              this.dialogRef.close('Closed');
              this.toastr.success('Thêm Khoa thành công!');
            }
          },
          error: (err) => {
            this.toastr.error('Thêm Khoa không thành công!');
            console.log(err);
          },
        });
      }
    }
  }
}
