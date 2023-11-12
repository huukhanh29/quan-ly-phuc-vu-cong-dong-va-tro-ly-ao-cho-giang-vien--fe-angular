import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { GiangVien } from 'src/app/models/GiangVien';
import { DeleteComponent } from '../../delete/delete.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';
import { DetailActivityComponent } from '../list-activities/detail-activity/detail-activity.component';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-hoat-dong-cua-giang-vien',
  templateUrl: './hoat-dong-cua-giang-vien.component.html',
  styleUrls: ['./hoat-dong-cua-giang-vien.component.css']
})
export class HoatDongCuaGiangVienComponent  implements OnInit{
  danhSachHoatDong: MatTableDataSource<HoatDong> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenHoatDong', 'thoiGianBatDau', 'thoiGianKetThuc', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';
  ten!: string
  danhSachNam: string[] = [];
  selectedNam: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private hoatDongService: HoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,
    private taiKhoanService: TaiKhoanService,
  ) {
    const currentYear = new Date().getFullYear();
    this.selectedNam = currentYear.toString();
  }
  ngOnInit(): void {
    this.layDanhSachNam();
    // Lấy tên đăng nhập từ storage
    const tenDangNhap = this.storageService.getUser().tenTaiKhoan;
    if (tenDangNhap) {
      this.ten = tenDangNhap;
    }
  }

  layDanhSachNam() {
    this.taiKhoanService.getAcademicYearsByUser().subscribe((data) => {
      this.loadDanhSachHoatDong()
      this.danhSachNam = data;
      if (this.danhSachNam.indexOf(this.selectedNam) === -1) {
        this.danhSachNam.push(this.selectedNam);
        this.danhSachNam.sort((a, b) => a.localeCompare(b));
      }
    });
  }


  loadDanhSachHoatDong() {
    if (this.ten && this.selectedNam) {
      this.hoatDongService
        .layDsHDTH(this.selectedNam)
        .subscribe((data) => {
          this.danhSachHoatDong = new MatTableDataSource<any>(data.danhSachHoatDong);
          this.length = data.totalElements || 0;
        });
    }
  }

  onSearch() {
    this.loadDanhSachHoatDong();
  }

  refresh() {
    this.searchTerm = '';

    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachHoatDong();
  }

  detail(item: any ): void {
    this.hoatDongService.getFileName(item.maHoatDong).subscribe({
      next: data=>{
        console.log(data)
        var popup = this.dialog.open(DetailActivityComponent, {
          data: {
            item: item,
            tenFile: data
          },
          width: '40%',
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '300ms',
        });
      },
      error: err=>{
        console.log(err)
      }

     })

  }

}

