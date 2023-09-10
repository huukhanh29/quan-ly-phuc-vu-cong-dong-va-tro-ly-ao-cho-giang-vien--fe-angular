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

@Component({
  selector: 'app-list-lecturer',
  templateUrl: './list-lecturer.component.html',
  styleUrls: ['./list-lecturer.component.css']
})
export class ListLecturerComponent implements OnInit{
  danhSachGiangVien: MatTableDataSource<GiangVien> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'maTaiKhoan', 'taiKhoan.email'];
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
    this.danhSachGiangVien.paginator = this.paginator;
    this.danhSachGiangVien.sort = this.sort;
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
        'GiangVien'
      )
      .subscribe((data) => {
        this.danhSachGiangVien = new MatTableDataSource<any>(data.content);
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
  detail(lecturer: any | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
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

