import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HoatDongNgoaiTruong } from 'src/app/models/HoatDongNgoaiTruong';
import { HoatDongNgoaiTruongService } from 'src/app/services/hoat-dong-ngoai-truong.service';
import { StorageService } from 'src/app/services/storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-them-hdnt',
  templateUrl: './them-hdnt.component.html',
  styleUrls: ['./them-hdnt.component.css'],
})
export class ThemHdntComponent implements OnInit {
  selectedFile: File | null = null;
  ListLoaiLop: any[] = [];
  tenDangNhap: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      activity: any;
      isEditing: boolean;
    },
    private dialogRef: MatDialogRef<ThemHdntComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private storageService: StorageService,
    private hoatDongNgoaiTruongService: HoatDongNgoaiTruongService
  ) {}

  ngOnInit(): void {
    this.tenDangNhap = this.storageService.getUser().tenTaiKhoan;
    if (this.data.isEditing) {
      this.myform.patchValue(this.data.activity);
    }
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  get formControls() {
    return this.myform.controls;
  }
  myform = this.formBuilder.group({
    tenHoatDong: ['', [Validators.required]],
    moTa: ['', [Validators.required]],
    diaDiem: ['', [Validators.required]],
    thoiGianBatDau: ['', [Validators.required]],
    thoiGianKetThuc: ['', [Validators.required]],
    banToChuc: ['', [Validators.required]],
    tenDangNhap: [''],
  });

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    const allowedMimeTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxFileSize) {
      this.toastr.warning('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB.');
      this.selectedFile = null;
      return;
    }

    if (allowedMimeTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.toastr.warning('Loại tệp không hợp lệ. Vui lòng chọn tệp PDF, DOCX, JPEG, JPG hoặc PNG.');
      this.selectedFile = null;
    }
  }


  saveDocument() {
    if (this.myform.valid) {
      const formData = this.myform.value;

      const batDau = new Date(formData.thoiGianBatDau ?? new Date());
      const ketThuc = new Date(formData.thoiGianKetThuc ?? new Date());

      formData.thoiGianBatDau = new Date(
        batDau.getTime() - batDau.getTimezoneOffset() * 60000
      ).toISOString();
      formData.thoiGianKetThuc = new Date(
        ketThuc.getTime() - ketThuc.getTimezoneOffset() * 60000
      ).toISOString();
      formData.tenDangNhap = this.tenDangNhap;
      if (this.data.isEditing === true) {
        if (this.selectedFile) {
          this.hoatDongNgoaiTruongService
            .suaHoatDongNgoaiTruong(
              this.data.activity.maHoatDongNgoaiTruong,
              formData
            )
            .subscribe({
              next: (data) => {
                // Khi lưu hoạt động thành công, lưu file
                this.hoatDongNgoaiTruongService
                  .suaFileHoatDongNgoaiTruong(
                    this.data.activity.maHoatDongNgoaiTruong,
                    this.selectedFile!
                  )
                  .subscribe({
                    next: (fileData) => {
                      this.dialogRef.close('file');
                    },
                    error: (fileError) => {
                      this.toastr.error('Có lỗi xảy ra khi lưu file.');
                    },
                  });
              },
              error: (err) => {
                this.toastr.error(err.error.message);
              },
            });
        } else {

          this.hoatDongNgoaiTruongService
            .suaHoatDongNgoaiTruong(
              this.data.activity.maHoatDongNgoaiTruong,
              formData
            )
            .subscribe({
              next: (data) => {
                this.dialogRef.close('ok');
              },
              error: (err) => {
                this.toastr.error(err.error.message);
              },
            });
        }
      } else {
        if (this.selectedFile) {
        this.hoatDongNgoaiTruongService
          .themHoatDongNgoaiTruong(formData)
          .subscribe({
            next: (data) => {
              // Khi lưu hoạt động thành công, lưu file
              this.hoatDongNgoaiTruongService
                .suaFileHoatDongNgoaiTruong(
                  data.maHoatDongNgoaiTruong,
                  this.selectedFile!
                )
                .subscribe({
                  next: (fileData) => {
                    this.dialogRef.close('ok');
                  },
                  error: (fileError) => {
                    this.toastr.error('Có lỗi xảy ra khi lưu file.');
                  },
                });
            },
            error: (err) => {
              this.toastr.error(err.error.message);
            },
          });
      }else{
        this.toastr.error('Chưa chọn file!');
      }
    }}
    }
  }

