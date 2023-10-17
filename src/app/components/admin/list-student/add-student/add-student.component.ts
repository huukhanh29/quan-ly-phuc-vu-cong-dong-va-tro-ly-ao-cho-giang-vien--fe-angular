import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lecturer: any;
    },
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private taiKhoanService: TaiKhoanService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {}

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
    quyen:['SinhVien'],
    gioiTinh: ['Nam', Validators.required],
    soDienThoai: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    ngaySinh: ['', Validators.required],
    namNhapHoc:['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  });

  saveStudent() {
    if(this.myform.valid){
    const formData = this.myform.value;
      this.taiKhoanService.createUser(formData).subscribe({
        next: data=>{
          this.dialogRef.close('Closed');
          this.toastr.success("Thêm tài khoản sinh viên thành công!");
        },
        error: err=>{
          if(err.error.message && err.error.message ==='username-exist'){
            this.toastr.warning("Tên tài khoản đã tồn tại!");
          }else if(err.error.message && err.error.message ==='email-exist'){
            this.toastr.warning("Email đã tồn tại!");
          }else{
            this.toastr.error("Thêm tài khoản giảng viên không thành công!");
            console.log(err)
          }
        }
      } );
    }
  }


}

