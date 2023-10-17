import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Truong } from 'src/app/models/Truong';
import { TruongService } from 'src/app/services/truong.service';
import { MatDialog } from '@angular/material/dialog';

import { DeleteComponent } from '../../delete/delete.component';
import { FormTruongComponent } from './form-truong/form-truong.component';
import { ChiTietTruongComponent } from './chi-tiet-truong/chi-tiet-truong.component';

@Component({
  selector: 'app-list-truong',
  templateUrl: './truong.component.html',
  styleUrls: ['./truong.component.css'],
})
export class TruongComponent implements OnInit {
  danhSachTruong: MatTableDataSource<Truong> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenTruong', 'hanhdong'];
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private truongService: TruongService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachTruong();
  }

  loadDanhSachTruong() {
    this.truongService.layTatCaTruong().subscribe((data) => {
      this.danhSachTruong = new MatTableDataSource<Truong>(data);
      this.danhSachTruong.paginator = this.paginator;
      this.danhSachTruong.sort = this.sort;
    });
  }

  onSearch() {
    // Lọc dữ liệu dựa trên giá trị searchTerm
    this.danhSachTruong.filter = this.searchTerm.trim().toLowerCase();
  }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachTruong();
  }

  addTruong(): void {
    var popup = this.dialog.open(FormTruongComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachTruong();
    });
  }
  editTruong(item: any): void {
    var popup = this.dialog.open(FormTruongComponent, {
      width: '50%',
      data: { item },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe(() => {
      this.loadDanhSachTruong();
    });
  }

  detailTruong(item: any): void {
    var popup = this.dialog.open(ChiTietTruongComponent, {
      data: {
        item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  deleteTruong(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      console.log(item);
      if (item === 'ok') {
        this.truongService.xoaTruong(id).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachTruong();
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
