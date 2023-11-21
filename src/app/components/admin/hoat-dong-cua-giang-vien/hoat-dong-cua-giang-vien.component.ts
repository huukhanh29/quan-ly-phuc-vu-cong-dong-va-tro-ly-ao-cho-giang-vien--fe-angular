import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { GiangVien } from 'src/app/models/GiangVien';
import { DeleteComponent } from '../../delete/delete.component';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StorageService } from './../../../services/storage.service';
import { DetailActivityComponent } from '../list-activities/detail-activity/detail-activity.component';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { ChiTietHoatDongGvComponent } from './chi-tiet-hoat-dong-gv/chi-tiet-hoat-dong-gv.component';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
@Component({
  selector: 'app-hoat-dong-cua-giang-vien',
  templateUrl: './hoat-dong-cua-giang-vien.component.html',
  styleUrls: ['./hoat-dong-cua-giang-vien.component.css'],
})
export class HoatDongCuaGiangVienComponent implements OnInit {
  danhSachHoatDong: MatTableDataSource<HoatDong> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'tenHoatDong',
    'thoiGianBatDau',
    'thoiGianKetThuc',
    'hanhdong',
  ];
  length: number = 0;
  searchTerm: string = '';
  ten!: string;
  danhSachNam: string[] = [];
  selectedNam: string = '';
  tongSoGio: number = 0;
  gioBatBuoc: number = 0;
  gioVuotMuc: number = 0;
  gioMienGiam: number = 0;
  gioThieu: number = 0;
  gioHk1: number = 0;
  gioHk2: number = 0;
  gioHk3: number = 0;
  maGiangVien!: number;
  dataExel: any;
  nameFile = '';
  giangVien!: GiangVien;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private hoatDongService: HoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private router: Router,
    private taiKhoanService: TaiKhoanService,
    private activatedRoute: ActivatedRoute
  ) {
    const currentYear = new Date().getFullYear();
    this.selectedNam = currentYear.toString();
  }
  ngOnInit(): void {
    this.layDanhSachNam();
    this.activatedRoute.params.subscribe((params: Params) => {
      if (
        !isNaN(params['maGiangVien']) &&
        params['maGiangVien'] !== undefined
      ) {
        this.maGiangVien = +params['maGiangVien'];
        this.loadThongTinGiangVien();
      } else {
        this.maGiangVien = -1;
        this.loadThongTinGiangVien();
      }
    });
    console.log(this.maGiangVien);
  }

  loadThongTinGiangVien() {
    //lấy từ giảng viên
    if (this.maGiangVien === -1) {
      this.taiKhoanService.layThongTinNguoiDung().subscribe((data) => {
        this.giangVien = data;
        this.nameFile = `Chi tiết tham gia hoạt động của ${this.giangVien.taiKhoan.tenDayDu} (${this.giangVien.taiKhoan.tenDangNhap}) năm ${this.selectedNam}`;
        console.log(this.nameFile);
      });
    } else {
      this.taiKhoanService
        .layThongTinGvByMa(this.maGiangVien)
        .subscribe((data) => {
          this.giangVien = data;
          this.nameFile = `Chi tiết tham gia hoạt động của ${this.giangVien.taiKhoan.tenDayDu} (${this.giangVien.taiKhoan.tenDangNhap}) năm ${this.selectedNam}`;
          console.log(this.nameFile);
        });
    }
  }
  layDanhSachNam() {
    if (this.maGiangVien === -1) {
      this.taiKhoanService.getAcademicYearsByUser(null).subscribe((data) => {
        this.ganDuLieuNam(data);
      });
    } else {
      this.taiKhoanService
        .getAcademicYearsByUser(this.maGiangVien)
        .subscribe((data) => {
          this.ganDuLieuNam(data);
        });
    }
  }
  ganDuLieuNam(data: any) {
    this.loadDanhSachHoatDong();
    this.danhSachNam = data;
    if (this.danhSachNam.indexOf(this.selectedNam) === -1) {
      this.danhSachNam.push(this.selectedNam);
      this.danhSachNam.sort((a, b) => a.localeCompare(b));
    }
  }
  ganDuLieu(data: any) {
    this.danhSachHoatDong = new MatTableDataSource<any>(data.danhSachHoatDong);
    // Cài đặt paginator và sort
    this.danhSachHoatDong.paginator = this.paginator;
    this.danhSachHoatDong.sort = this.sort;
    this.tongSoGio = data.tongSoGio;
    this.gioBatBuoc = data.gioBatBuoc;
    this.gioHk1 = data.gioHk1;
    this.gioHk2 = data.gioHk2;
    this.gioHk3 = data.gioHk3;
    this.gioMienGiam = data.gioMienGiam;
    this.gioVuotMuc = data.gioVuotMuc;
    this.gioThieu = data.gioThieu;
    this.dataExel = data.danhSachHoatDong;
  }
  loadDanhSachHoatDong() {
    if (this.maGiangVien === -1) {
      this.hoatDongService.layDsHDTH(this.selectedNam).subscribe((data) => {
        this.ganDuLieu(data);
      });
    } else {
      this.hoatDongService
        .layDsHDTH(this.selectedNam, this.maGiangVien)
        .subscribe((data) => {
          this.ganDuLieu(data);
        });
    }
  }

  onSearch() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.danhSachHoatDong.filter = filterValue;
  }

  refresh() {
    this.searchTerm = '';

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  filter() {
    this.loadDanhSachHoatDong();
  }
  detail(item: any): void {
    var popup = this.dialog.open(ChiTietHoatDongGvComponent, {
      data: {
        item: item,
      },
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }
  quayLai() {
    if (this.maGiangVien === -1) {
      this.router.navigate(['/giang-vien/bieu-do']);
    } else {
      this.router.navigate(['/quan-tri-vien/danh-sach-giang-vien']);
    }
  }

  exportToExcel(): void {
    const element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Gộp ô tiêu đề
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];

    // Vị trí mới cho các hàng
    const newRowStart = this.dataExel.length + 3; // Bắt đầu từ hàng thứ 2, ngay sau hàng tiêu đề

    // Gộp ô cho các hàng mới
    for (let i = 0; i < 10; i++) {
      worksheet['!merges'].push({
        s: { r: newRowStart + i, c: 0 },
        e: { r: newRowStart + i, c: 6 },
      });
    }

    // Đặt các hàng mới thành in đậm
    for (let i = 0; i < 10; i++) {
      const cell = XLSX.utils.encode_cell({ r: newRowStart + i, c: 7 });
      worksheet[cell].s = { font: { bold: true } };
    }
    //custom style
    worksheet['A1'] = {
      t: 's',
      v: this.nameFile,
      s: { alignment: { horizontal: 'center' }, font: { bold: true } },
    };

    for (let col = 0; col <= 7; col++) {
      const cell = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cell].s = { font: { bold: true } };
    }
    const columnWidths = [
      { wch: 5 }, // STT
      { wch: 35 }, // Tên Hoạt Động
      { wch: 35 }, // Địa Điểm
      { wch: 20 }, // Loại Hoạt Động
      { wch: 15 }, // Số Giờ Tích Lũy
      { wch: 15 }, // Vai Trò
      { wch: 25 }, // Bắt Đầu
      { wch: 25 }, // Kết Thúc
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
}
