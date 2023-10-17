import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Khoa } from 'src/app/models/Khoa'; // Đảm bảo import đúng model cho Khoa
import { KhoaService } from 'src/app/services/khoa.service'; // Đảm bảo import đúng service cho Khoa
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../delete/delete.component';
import { FormKhoaComponent } from './form-khoa/form-khoa.component';
import { ChiTietKhoaComponent } from './chi-tiet-khoa/chi-tiet-khoa.component';

@Component({
  selector: 'app-list-khoa',
  templateUrl: './khoa.component.html',
  styleUrls: ['./khoa.component.css'],
})
export class KhoaComponent implements OnInit {
  danhSachKhoa: MatTableDataSource<Khoa> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenKhoa', 'tenTruong', 'hanhdong'];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private khoaService: KhoaService, // Đảm bảo inject đúng service cho Khoa
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachKhoa();
  }

  loadDanhSachKhoa() {
    this.khoaService.layTatCaKhoa().subscribe((data) => {
      this.danhSachKhoa = new MatTableDataSource<Khoa>(data);
      this.danhSachKhoa.paginator = this.paginator;
      this.danhSachKhoa.sort = this.sort;
    });
  }

  onSearch() {
    // Lọc dữ liệu dựa trên giá trị searchTerm
    this.danhSachKhoa.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachKhoa();
  }

  addKhoa(): void {
    var popup = this.dialog.open(FormKhoaComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachKhoa();
    });
  }

  editKhoa(item: any): void {
    var popup = this.dialog.open(FormKhoaComponent, {
      width: '50%',
      data: { item },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachKhoa();
    });
  }

  detailKhoa(item: any): void {
    var popup = this.dialog.open(ChiTietKhoaComponent, {
      data: {
        item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  deleteKhoa(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      console.log(item);
      if (item === 'ok') {
        this.khoaService.xoaKhoa(id).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachKhoa();
            }
          },
          error: (err) => {
            this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
          },
        });
      }
    });
  }
}
