import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ChucDanh } from 'src/app/models/ChucDanh'; // Đảm bảo import đúng model cho ChucDanh
import { ChucDanhService } from 'src/app/services/chuc-danh.service'; // Đảm bảo import đúng service cho ChucDanh
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../delete/delete.component';
import { FormChucDanhComponent } from './form-chuc-danh/form-chuc-danh.component';
import { ChiTietChucDanhComponent } from './chi-tiet-chuc-danh/chi-tiet-chuc-danh.component';

@Component({
  selector: 'app-list-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.css'],
})
export class ChucDanhComponent implements OnInit {
  danhSachChucDanh: MatTableDataSource<ChucDanh> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenChucDanh', 'gioBatBuoc', 'hanhdong'];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private chucDanhService: ChucDanhService, // Đảm bảo inject đúng service cho ChucDanh
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachChucDanh();
  }

  loadDanhSachChucDanh() {
    this.chucDanhService.getAllChucDanhs().subscribe((data) => {
      this.danhSachChucDanh = new MatTableDataSource<ChucDanh>(data);
      this.danhSachChucDanh.paginator = this.paginator;
      this.danhSachChucDanh.sort = this.sort;
    });
  }

  onSearch() {
    // Lọc dữ liệu dựa trên giá trị searchTerm
    this.danhSachChucDanh.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachChucDanh();
  }

  addChucDanh(): void {
    var popup = this.dialog.open(FormChucDanhComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachChucDanh();
    });
  }

  editChucDanh(item: any): void {
    var popup = this.dialog.open(FormChucDanhComponent, {
      width: '50%',
      data: { item },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachChucDanh();
    });
  }

  detailChucDanh(item: any): void {
    var popup = this.dialog.open(ChiTietChucDanhComponent, {
      data: {
        item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  deleteChucDanh(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      console.log(item);
      if (item === 'ok') {
        this.chucDanhService.deleteChucDanh(id).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachChucDanh();
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
