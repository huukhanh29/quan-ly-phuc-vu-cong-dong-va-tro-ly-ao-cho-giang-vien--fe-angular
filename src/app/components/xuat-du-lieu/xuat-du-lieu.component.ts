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
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
import { KhoaService } from 'src/app/services/khoa.service';
import { TruongService } from 'src/app/services/truong.service';
import { DetailLecturerComponent } from '../admin/list-lecturer/detail-lecturer/detail-lecturer.component';
@Component({
  selector: 'app-xuat-du-lieu',
  templateUrl: './xuat-du-lieu.component.html',
  styleUrls: ['./xuat-du-lieu.component.css'],
})
export class XuatDuLieuComponent {
  danhSachGiangVien: MatTableDataSource<GiangVien> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'tenDangNhap',
    'hoTen',
    'tiLeGio',
    'hanhdong',
  ];
  length: number = 0;
  searchTerm: string = '';
  user: any;
  danhSachNam: string[] = [];
  selectedNam: string = '';
  selectedLoai: string = 'Chưa hoàn thành';
  danhSachTruong: any[] = [];
  danhSachKhoa: any[] = [];
  selectedTruong!: number;
  selectedKhoa!: number;
  selectedTruongTen: string = '';
  selectedKhoaTen: string = '';
  dataExel: any;
  nameFile = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private taiKhoanService: TaiKhoanService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private cookie: CookieService,
    private hoatDongService: HoatDongService,
    private khoaService: KhoaService, // Khởi tạo dịch vụ
    private truongService: TruongService
  ) {}
  public filterVisible: boolean = true;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.layDanhSachNam();
    this.loadDanhSachKhoa()
    //this.loadDanhSachTruong();
    if (this.selectedKhoa !== undefined) {
      this.loadDanhSachGiangVien();
    }
  }
  // Lấy danh sách năm
  layDanhSachNam() {
    this.hoatDongService.getYears().subscribe((nam) => {
      this.danhSachNam = nam;
      if (this.danhSachNam.length > 0) {
        this.selectedNam = this.danhSachNam[this.danhSachNam.length - 1];
      }
    });
  }
  // loadDanhSachTruong() {
  //   this.truongService.layTatCaTruong().subscribe((data) => {
  //     this.danhSachTruong = data;
  //   });
  // }

  // Hàm gửi yêu cầu để lấy danh sách khoa theo trường đã chọn
  // loadDanhSachKhoa() {
  //   if (this.selectedTruong !== undefined) {
  //     this.khoaService
  //       .layKhoaTheoTruong(this.selectedTruong)
  //       .subscribe((data) => {
  //         this.danhSachKhoa = data;
  //       });
  //   } else {
  //     this.danhSachKhoa = [];
  //   }
  // }
  loadDanhSachKhoa() {

      this.khoaService
        .layTatCaKhoa()
        .subscribe((data) => {
          this.danhSachKhoa = data;
        });

  }
  loadDanhSachGiangVien() {
    this.taiKhoanService
      .getGiangVienKhenThuongHoacKienTrach(
        this.selectedNam,
        this.selectedLoai,
        this.selectedKhoa
      )
      .subscribe((data) => {
        this.danhSachGiangVien = new MatTableDataSource<GiangVien>(data);
        this.danhSachGiangVien.sort = this.sort;
        this.danhSachGiangVien.paginator = this.paginator;
        this.dataExel = data;
        this.nameFile = `Danh sách giảng viên ${this.selectedLoai} tích lũy giờ cộng đồng ${this.selectedNam} của trường ${this.selectedTruongTen} - khoa ${this.selectedKhoaTen}`;

      });
  }

  onSearch() {
    this.danhSachGiangVien.filter = this.searchTerm.trim().toLowerCase();
    if (this.danhSachGiangVien.paginator) {
      this.danhSachGiangVien.paginator.firstPage();
    }
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachGiangVien();
  }
  filter() {
    const truongSelected = this.danhSachTruong.find(
      (truong) => truong.maTruong === this.selectedTruong
    );
    // if (truongSelected) {
    //   this.selectedTruongTen = truongSelected.tenTruong;
    //   this.loadDanhSachKhoa()
    // }
    const khoaSelected = this.danhSachKhoa.find(
      (khoa) => khoa.maKhoa === this.selectedKhoa
    );
    if (khoaSelected) {
      this.selectedKhoaTen = khoaSelected.tenKhoa;
      this.loadDanhSachGiangVien();
    }

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
  exportToExcel(): void {
    const element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //gộp ô
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    //custom style
    worksheet['A1'] = {
      t: 's',
      v: this.nameFile,
      s: { alignment: { horizontal: 'center' }, font: { bold: true } },
    };

    for (let col = 0; col <= 5; col++) {
      const cell = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cell].s = { font: { bold: true } };
    }
    const columnWidths = [
      { wch: 5 }, // A
      { wch: 15 }, // B
      { wch: 15 }, // C
      { wch: 20 }, // D
      { wch: 20 }, // E
      { wch: 15 }, // F
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
}
