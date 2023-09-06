import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SinhVien } from 'src/app/models/SinhVien';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit{
  danhSachSinhVien: MatTableDataSource<SinhVien> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'maSv', 'email'];
  length: number = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(

    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,

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
    size: number = 10,
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
}
