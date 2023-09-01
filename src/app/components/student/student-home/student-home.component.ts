import { Component, OnInit } from '@angular/core';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ThongTinSinhVien, TaiKhoan } from 'src/app/models/TaiKhoan';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  dataSV: ThongTinSinhVien | undefined;
  constructor(private taiKhoanService: TaiKhoanService,
    private router: Router) { }

  ngOnInit(): void {
    // Fetch student information from the service
    this.taiKhoanService.layThongTinNguoiDung()
      .subscribe({
        next: (response) => {
          this.dataSV = response; // Gán dữ liệu sinh viên
        },
        error: (error) => {
          console.error('Lỗi khi lấy thông tin sinh viên:', error);
        }
      });
  }
  test(){
    this.router.navigate(["/sinh-vien/test"])
  }

}
