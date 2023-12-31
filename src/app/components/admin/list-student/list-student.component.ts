import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SinhVien } from 'src/app/models/SinhVien';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  danhSachSinhVien: MatTableDataSource<SinhVien> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'taiKhoan.tenDangNhap',  'taiKhoan.tenDayDu', 'taiKhoan.email', 'taiKhoan.trangThai', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachSinhVien();
  }

  ngAfterViewInit() {
    this.danhSachSinhVien.paginator = this.paginator;
    this.danhSachSinhVien.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachSinhVien(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachSinhVien(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachSinhVien(
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
        'SinhVien'
      )
      .subscribe((data) => {
        this.danhSachSinhVien = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachSinhVien();
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachSinhVien();
  }
  detail(student: any | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
    if (student) {
      var popup = this.dialog.open(DetailStudentComponent, {
        data: {
          student: student,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }

  addStudent(): void {
    var popup = this.dialog.open(AddStudentComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachSinhVien();
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
          this.loadDanhSachSinhVien();
        }
      },
      error: (error) => {
        this.toastr.error('Có lỗi xảy ra!');
        console.error('Error updating status:', error);
      },
    });
  }
}
