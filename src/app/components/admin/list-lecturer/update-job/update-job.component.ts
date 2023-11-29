import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ChucDanh } from 'src/app/models/ChucDanh';
import { GiangVien } from 'src/app/models/GiangVien';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ChucDanhService } from './../../../../services/chuc-danh.service';

@Component({
  selector: 'app-update-job',
  templateUrl: './update-job.component.html',
  styleUrls: ['./update-job.component.css']
})
export class UpdateJobComponent implements OnInit {

  chucDanhs: ChucDanh[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lecturer: GiangVien },
    private dialogRef: MatDialogRef<UpdateJobComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService,
    private chucDanhService: ChucDanhService
  ) {}

  ngOnInit(): void {
    this.listChucDanh();
    if (this.data.lecturer.chucDanh !== undefined) {
      this.myform.patchValue({
        maChucDanh: this.data.lecturer.chucDanh.maChucDanh,
        // Gán các trường khác nếu có
      });
    }
  }
  get formControls() {
    return this.myform.controls;
  }
  myform = this.formBuilder.group({
    maChucDanh: [0,Validators.required],
  });
  listChucDanh() {
    this.chucDanhService.getAllChucDanhs().subscribe({
      next: (data) => {
        this.chucDanhs = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  save() {
    if (this.myform.valid) {
      const maChucDanh = this.myform.value.maChucDanh ?? 0;
      this.chucDanhService.updateGiangVien(maChucDanh, this.data.lecturer.maTaiKhoan).subscribe({
        next: (response) => {
          this.toastr.success('Cập nhật chức danh thành công!');
          this.dialogRef.close('Updated');
        },
        error: (err) => {
          this.toastr.error('Có lỗi xảy ra khi cập nhật!');
        }
      });
    }
  }

  closePopup(event: Event): void {
    event.preventDefault();
    this.dialogRef.close('Closed');
  }
}

