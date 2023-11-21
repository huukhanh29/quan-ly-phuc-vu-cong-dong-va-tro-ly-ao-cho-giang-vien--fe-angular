import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GiangVien } from 'src/app/models/GiangVien';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { DetailLecturerComponent } from './detail-lecturer/detail-lecturer.component';
import { MatDialog } from '@angular/material/dialog';
import { AddLecturerComponent } from './add-lecturer/add-lecturer.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UpdateGioGiamComponent } from './update-gio-giam/update-gio-giam.component';

@Component({
  selector: 'app-list-lecturer',
  templateUrl: './list-lecturer.component.html',
  styleUrls: ['./list-lecturer.component.css'],
})
export class ListLecturerComponent implements OnInit {
  danhSachGiangVien: MatTableDataSource<GiangVien> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'maTaiKhoan',
    'taiKhoan.tenDayDu',
    'taiKhoan.email',
    'taiKhoan.trangThai',
    'hanhdong',
  ];
  length: number = 0;
  searchTerm: string = '';
  user: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.loadDanhSachGiangVien();
  }

  ngAfterViewInit() {
    this.danhSachGiangVien.paginator = this.paginator;
    this.danhSachGiangVien.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachGiangVien(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachGiangVien(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachGiangVien(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'taiKhoan.ngayTao',
    sortDir: string = 'DESC'
  ) {
    this.taiKhoanService
      .getAllUsersByRole(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        'GiangVien'
      )
      .subscribe((data) => {
        this.danhSachGiangVien = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachGiangVien();
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachGiangVien();
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
  upDateGioMienGiam(lecturer: any): void {
      var popup = this.dialog.open(UpdateGioGiamComponent, {
        data: {
          lecturer: lecturer,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });

  }
  updateUserStatus(status: string, tenDangNhap: string): void {
    const body = {
      tenDangNhap: tenDangNhap,
      trangThai: status,
    };

    this.taiKhoanService.updateStatus(body).subscribe({
      next: (data) => {
        if (data.message && data.message === 'NO_CHANGE') {
          this.toastr.warning('Không thay đổi!');
        } else {
          this.toastr.success('Cập nhật thành công!');
          this.loadDanhSachGiangVien();
        }
      },
      error: (error) => {
        this.toastr.error('Có lỗi xảy ra!');
        console.error('Error updating status:', error);
      },
    });
  }
  addLecturer(): void {
    var popup = this.dialog.open(AddLecturerComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachGiangVien();
    });
  }
  chiTietThamGiaHoatDong(ma:any){
    this.router.navigate([
      `/quan-tri-vien/danh-sach-hoat-dong-cua-giang-vien/${ma}`,
    ]);
  }
}
