import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LoaiHoatDong } from 'src/app/models/LoaiHoatDong'; // Import LoaiHoatDong model
import { LoaiHoatDongService } from 'src/app/services/loai-hoat-dong.service'; // Import LoaiHoatDongService
import { MatDialog } from '@angular/material/dialog';
import { ChiTietLhdComponent } from './chi-tiet-lhd/chi-tiet-lhd.component';
import { FormLhdComponent } from './form-lhd/form-lhd.component';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-list-loai-hoat-dong',
  templateUrl: './loai-hoat-dong.component.html',
  styleUrls: ['./loai-hoat-dong.component.css'],
})
export class LoaiHoatDongComponent implements OnInit {
  danhSachLoaiHoatDong: MatTableDataSource<LoaiHoatDong> =
    new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenLoaiHoatDong', 'moTa', 'hanhdong'];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private loaiHoatDongService: LoaiHoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachLoaiHoatDong();
  }

  loadDanhSachLoaiHoatDong() {
    this.loaiHoatDongService.layTatCaLoaiHoatDong().subscribe((data) => {
      this.danhSachLoaiHoatDong = new MatTableDataSource<LoaiHoatDong>(data);
      this.danhSachLoaiHoatDong.paginator = this.paginator;
      this.danhSachLoaiHoatDong.sort = this.sort;
    });
  }

  onSearch() {
    // Lọc dữ liệu dựa trên giá trị searchTerm
    this.danhSachLoaiHoatDong.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachLoaiHoatDong();
  }

  addLoaiHoatDong(): void {
    var popup = this.dialog.open(FormLhdComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachLoaiHoatDong();
    });
  }
  edit(item: any): void {
    var popup = this.dialog.open(FormLhdComponent, {
      width: '50%',
      data:{item},
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachLoaiHoatDong();
    });
  }
  detail(item: any): void {
    var popup = this.dialog.open(ChiTietLhdComponent, {
      data: {
        item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }
  deleteLhd(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      console.log(item)
      if (item === 'ok') {
        this.loaiHoatDongService.xoaLoaiHoatDong(id).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachLoaiHoatDong()
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
