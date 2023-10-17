import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetailLecturerComponent } from '../detail-lecturer/detail-lecturer.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ChucDanhService } from 'src/app/services/chuc-danh.service';
import { ChucDanh } from 'src/app/models/ChucDanh';

@Component({
  selector: 'app-add-lecturer',
  templateUrl: './add-lecturer.component.html',
  styleUrls: ['./add-lecturer.component.css'],
})
export class AddLecturerComponent implements OnInit {
  public chucDanhs: ChucDanh[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lecturer: any;
    },
    private dialogRef: MatDialogRef<AddLecturerComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService,
    private chucDanhService: ChucDanhService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.listChucDanh()
  }
  listChucDanh(){
    this.chucDanhService.getAllChucDanhs().subscribe({
      next: data=>{
        this.chucDanhs= data;
      },
      error: err=>{
        console.log(err)
      },

});
  }
  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }


  myform = this.formBuilder.group({
    tenDayDu: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^.*\s.*$/)]],
    tenDangNhap: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,9}$/)]],
    matKhau: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)]], // Kiểm tra ít nhất 6 ký tự và phải có cả chữ và số
    email: ['', [Validators.required, Validators.email]],
    diaChi: ['', Validators.required],
    quyen:['GiangVien'],
    gioiTinh: ['Nam', Validators.required],
    soDienThoai: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    ngaySinh: ['', Validators.required],
    maChucDanh:[]
  });

  savelecturer() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.taiKhoanService.createUser(formData).subscribe({
        next: data=>{
          this.dialogRef.close('Closed');
          this.toastr.success("Thêm tài khoản giảng viên thành công!");
        },
        error: err=>{
          if(err.error.message && err.error.message ==='username-exist'){
            this.toastr.warning("Tên tài khoản đã tồn tại!");
          }else if(err.error.message && err.error.message ==='email-exist'){
            this.toastr.error("Email đã tồn tại!");
          }else{
            this.toastr.error("Thêm tài khoản giảng viên không thành công!");
            console.log(err)
          }
        }
      } );
    }
  }

}
