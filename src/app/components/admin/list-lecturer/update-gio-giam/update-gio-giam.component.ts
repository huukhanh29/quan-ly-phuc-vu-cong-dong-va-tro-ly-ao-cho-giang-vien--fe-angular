import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { GiangVien } from 'src/app/models/GiangVien';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-update-gio-giam',
  templateUrl: './update-gio-giam.component.html',
  styleUrls: ['./update-gio-giam.component.css']
})
export class UpdateGioGiamComponent implements OnInit {

  selectedYear!: string;
  years: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { lecturer: GiangVien },
    private dialogRef: MatDialogRef<UpdateGioGiamComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService,
    private hoatDongService: HoatDongService
  ) {}

  ngOnInit(): void {
    this.getYears();
  }
  get formControls() {
    return this.myform.controls;
  }
  getYears() {
    this.hoatDongService.getYears().subscribe((data: string[] | number[]) => {
      // Chuyển đổi tất cả các giá trị năm thành chuỗi
      this.years = data.map(year => year.toString());
      const currentYear = new Date().getFullYear().toString();

      // Thêm năm hiện tại vào danh sách nếu nó chưa có trong danh sách
      if (!this.years.includes(currentYear)) {
        this.years.push(currentYear);
      }

      // Sắp xếp lại danh sách năm (giả sử tất cả các phần tử đều là chuỗi)
      this.years.sort((a, b) => b.localeCompare(a));

      // Đặt năm hiện tại làm năm được chọn
      this.selectedYear = currentYear;

      // Khởi tạo form và tải thông tin giờ tích lũy
      this.initializeForm();
      this.loadThongTinGioTichLy();
    });
  }



  initializeForm() {
    this.myform = this.formBuilder.group({
      nam: [this.selectedYear, Validators.required],
      gioMienGiam: [0, Validators.required]
    });
  }
  myform = this.formBuilder.group({
    nam: [this.selectedYear, Validators.required],
    gioMienGiam: [0, Validators.required]
  });
  loadThongTinGioTichLy() {
    this.taiKhoanService.timKiemGioTichLuy(this.data.lecturer.maTaiKhoan, this.selectedYear)
      .subscribe({
        next: data => {
          console.log(data)
          if(data.message && data.message === 'not-found'){
            this.myform.patchValue({ gioMienGiam: 0 });
          }else{
            this.myform.patchValue({ gioMienGiam: data.gioMienGiam });
          }

        },
        error: err => {
          console.log(err)
        }
      });
  }

  save() {
    if (this.myform.valid) {
      const formData = {
        ...this.myform.value,
        maGiangVien: this.data.lecturer.maTaiKhoan
      };

      this.taiKhoanService.capNhatGioMienGiam(formData).subscribe({
        next: (response) => {
          this.toastr.success('Cập nhật giờ miễn giảm thành công!');
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
