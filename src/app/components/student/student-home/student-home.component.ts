import { Component, OnInit } from '@angular/core';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { Router } from '@angular/router';
import { SinhVien } from 'src/app/models/SinhVien';
@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  dataSV!: SinhVien ;
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
          //this.router.navigate(["/bao-tri"])
          console.error('Lỗi khi lấy thông tin sinh viên:', error);
        }
      });
  }
  test(){
    this.router.navigate(["/sinh-vien/test"])
  }

}
