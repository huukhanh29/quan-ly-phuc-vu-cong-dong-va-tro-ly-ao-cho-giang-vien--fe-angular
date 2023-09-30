import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PhanHoiService } from 'src/app/services/phan-hoi.service';
import { StorageService } from 'src/app/services/storage.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  phanHoiForm!: FormGroup;
  danhSachPhanHoi: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'noiDung',
    'cauHoi'
  ];
  length: number=0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder,
    private phanHoiService: PhanHoiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private w: WebSocketService,
    private http: HttpClient

    ) { }

  ngOnInit(): void {
    const user = this.storageService.getUser()
    //this.w.connect(user.tenTaiKhoan)
  }
  taiKhoanData: any = {
    tenDangNhap: 'giangvien1',
    matKhau: 'password123',
    email: 'giangvien1@example.com',
    quyen: 'SinhVien',
    tenDayDu: 'Người Dùng',
    gioiTinh: 'Nam',
    namNhapHoc: '2023',
    maChucDanh: '1', // Nếu bạn đang sử dụng chức danh cho Giảng viên
  };
  ok(): void{
    // const cauHoi: any = {
    //   cauHoi: "Nộsgsissdsjdsajdds",
    //   traLoi: "Nội dungstrảs lờij 2"
    // };
    // this.phanHoiService.replyToPhanHoi(cauHoi,5).subscribe({
    //   next: data=>{ console.log("ok")
    // },
    //   error: error=>{}
    // })
      this.http.post('/api/tai-khoan/them-tai-khoan', this.taiKhoanData).subscribe({
        next: data=>{
            console.log(data)
        },
        error: err=>{
            console.log(err)
        }
      });
  }

}
