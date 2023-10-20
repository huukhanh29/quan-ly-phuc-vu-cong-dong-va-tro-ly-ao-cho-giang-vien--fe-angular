import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GiangVien } from 'src/app/models/GiangVien';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { DetailLecturerComponent } from '../list-lecturer/detail-lecturer/detail-lecturer.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';

@Component({
  selector: 'app-danh-sach-giang-vien',
  templateUrl: './danh-sach-giang-vien.component.html',
  styleUrls: ['./danh-sach-giang-vien.component.css']
})
export class DanhSachGiangVienComponent implements OnInit {
  danhSachGiangVienTC: MatTableDataSource<GiangVien> = new MatTableDataSource();
  danhSachGiangVienTG: MatTableDataSource<GiangVien> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'maTaiKhoan', 'taiKhoan.tenDayDu', 'taiKhoan.email', 'hanhdong'];
  searchTerm: string = '';
  user: any;
  maHoatDong!: number
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyHoatDongService: DangKyHoatDongService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cookie: CookieService,
    private dataTransferService: DataTransferService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.setupDataSource();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.maHoatDong = +params['maHoatDong'];
      this.loadGVThamGia()
    });
  }
  loadGVThamGia(){
    this.dangKyHoatDongService.getGiangViensByHoatDong(this.maHoatDong).subscribe({
      next: data=>{
        console.log(data)
        this.danhSachGiangVienTG = new MatTableDataSource<GiangVien>(data);

        // Tùy chỉnh hàm lọc
        this.danhSachGiangVienTG.filterPredicate = this.customFilterPredicate;

        this.danhSachGiangVienTG.sort = this.sort;
        this.danhSachGiangVienTG.paginator = this.paginator;
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  setupDataSource(): void {
    this.dataTransferService.currentData.subscribe(data => {
      if (data) {
        this.danhSachGiangVienTC = new MatTableDataSource<GiangVien>(data);

        // Tùy chỉnh hàm lọc
        this.danhSachGiangVienTC.filterPredicate = this.customFilterPredicate;

        this.danhSachGiangVienTC.sort = this.sort;
        this.danhSachGiangVienTC.paginator = this.paginator;
      }
    });
  }

  customFilterPredicate(data: GiangVien, filter: string): boolean {
    const accumulator = (currentTerm: any, key: string) => {
      return key === 'taiKhoan' ? currentTerm.tenDayDu + currentTerm.tenDangNhap : currentTerm;
    };

    const dataStr = Object.keys(data).reduce((acc, key) => {
      return acc + accumulator((data as any)[key], key);
    }, '').toLowerCase();

    return dataStr.indexOf(filter) !== -1;
  }

  onSearchTC() {
    this.danhSachGiangVienTC.filter = this.searchTerm.trim().toLowerCase();
    if (this.danhSachGiangVienTC.paginator) {
      this.danhSachGiangVienTC.paginator.firstPage();
    }
  }

  refreshTC() {
    this.searchTerm = '';
    this.danhSachGiangVienTC.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }
  onSearchTG() {
    this.danhSachGiangVienTG.filter = this.searchTerm.trim().toLowerCase();
    if (this.danhSachGiangVienTG.paginator) {
      this.danhSachGiangVienTG.paginator.firstPage();
    }
  }

  refreshTG() {
    this.searchTerm = '';
    this.danhSachGiangVienTG.filter = '';
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 5;
  }
  detail(lecturer: any | null): void {
    if (lecturer) {
      var popup = this.dialog.open(DetailLecturerComponent, {
        data: {
          lecturer: lecturer,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
}
