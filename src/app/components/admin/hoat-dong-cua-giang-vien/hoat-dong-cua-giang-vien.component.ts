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
  gioHk1: number = 0;
  gioHk2: number = 0;
  gioHk3: number = 0;
  maGiangVien!: number;
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
      if (!isNaN(params['maGiangVien']) && params['maGiangVien'] !== undefined) {
        this.maGiangVien = +params['maGiangVien'];
      } else {
        this.maGiangVien = -1
      }
    });
    console.log(this.maGiangVien)
  }

  layDanhSachNam() {
    this.taiKhoanService.getAcademicYearsByUser().subscribe((data) => {
      this.loadDanhSachHoatDong();
      this.danhSachNam = data;
      if (this.danhSachNam.indexOf(this.selectedNam) === -1) {
        this.danhSachNam.push(this.selectedNam);
        this.danhSachNam.sort((a, b) => a.localeCompare(b));
      }
    });
  }
  ganDuLieu(data: any) {
    this.danhSachHoatDong = new MatTableDataSource<any>(data.danhSachHoatDong);
    this.tongSoGio = data.tongSoGio;
    this.gioBatBuoc = data.gioBatBuoc;
    this.gioHk1 = data.gioHk1;
    this.gioHk2 = data.gioHk2;
    this.gioHk3 = data.gioHk3;
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
    const filterValue = this.searchTerm.trim().toLowerCase(); // Trim whitespace and convert to lowercase
    this.danhSachHoatDong.filter = filterValue; // Apply filter to the data source
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
}
