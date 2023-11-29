import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { GiangVien } from 'src/app/models/GiangVien';
import { DeleteComponent } from '../../delete/delete.component';
import { HoatDongNgoaiTruongService } from 'src/app/services/hoat-dong-ngoai-truong.service';
import { ThemHdntComponent } from './them-hdnt/them-hdnt.component';
import { ChiTietHdntComponent } from './chi-tiet-hdnt/chi-tiet-hdnt.component';
import { StorageService } from 'src/app/services/storage.service';
import { DuyetHdntComponent } from './duyet-hdnt/duyet-hdnt.component';
import { DetailLecturerComponent } from '../list-lecturer/detail-lecturer/detail-lecturer.component';
import { HuyHdntComponent } from './huy-hdnt/huy-hdnt.component';

@Component({
  selector: 'app-hoat-dong-ngoai-truong',
  templateUrl: './hoat-dong-ngoai-truong.component.html',
  styleUrls: ['./hoat-dong-ngoai-truong.component.css']
})
export class HoatDongNgoaiTruongComponent implements OnInit {
  danhSachHoatDong: MatTableDataSource<HoatDong> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenHoatDong', 'thoiGianBatDau',
  'thoiGianKetThuc', 'giangVien.taiKhoan.tenDayDu', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';
  public startTime!: Date | null;
  public endTime!: Date | null;
  public type: string = '';
  public status: string='Chua_Duyet';
  loaiHoatDongs: any[] = [];
  giangVienToChucs: GiangVien[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() showAddButton: boolean = true; // true by default
  @Input() customButton: TemplateRef<any> | null = null;
  @Output() activitiesLoaded = new EventEmitter<HoatDong[]>();
  role!: string
  years: string[] = [];
  selectedYear: string | null = null;
  constructor(
    private hoatDongNgoaiTruongService: HoatDongNgoaiTruongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private storageService: StorageService
  ) {}
  public filterVisible: boolean = true;
  tenDangNhap!:string
  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    const user = this.storageService.getUser()
    this.role = user.quyen;
    console.log(this.role)
    if(this.role==='GiangVien'){
      this.tenDangNhap = user.tenTaiKhoan
    }
    this.loadDanhSachHoatDong();
    this.getYears()
  }

  ngAfterViewInit() {
    this.danhSachHoatDong.paginator = this.paginator;
    this.danhSachHoatDong.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachHoatDong(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachHoatDong(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachHoatDong(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC',
    status: any = this.status
  ) {
    this.hoatDongNgoaiTruongService
      .layTatCaHoatDongNgoaiTruong(page, size, sortBy, sortDir,
        this.searchTerm, status, this.tenDangNhap, this.selectedYear)
      .subscribe((data) => {
        this.danhSachHoatDong = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
        this.activitiesLoaded.emit(data.content);
      });
  }

  onSearch() {
    this.loadDanhSachHoatDong();
  }
  filter() {
    this.loadDanhSachHoatDong(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status
    );
  }
  refresh() {
    this.searchTerm = '';
    this.type = '';
    this.status = 'Chua_Duyet';
    this.startTime = null;
    this.endTime = null;
    this.getYears();
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachHoatDong();
  }

  addHoatDong(): void {
    const dialogRef = this.dialog.open(ThemHdntComponent, {
      width: '60%',
      data: {
        activity: null,
        isEditing: false // Thêm hoạt động mới
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loadDanhSachHoatDong();
        this.toastr.success('Hoạt động và file đã được lưu thành công.');
      }
    });
  }
  editHoatDong(item: any): void {
    const dialogRef = this.dialog.open(ThemHdntComponent, {
      width: '60%',
      data: {
        activity: item,
        isEditing: true
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'file') {
        this.toastr.success(
          'Cập nhật hoạt động và file thành công!'
        );
        this.loadDanhSachHoatDong();
      }
      if (result === 'ok') {
        this.toastr.success(
          'Cập nhật hoạt động thành công!'
        );
        this.loadDanhSachHoatDong();
      }
    });
  }

  detail(item: any ): void {
    this.hoatDongNgoaiTruongService.getFileName(item.maHoatDongNgoaiTruong).subscribe({
      next: data=>{
        var popup = this.dialog.open(ChiTietHdntComponent, {
          data: {
            item: item,
            tenFile: data
          },
          width: '40%',
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '300ms',
        });


      },
      error: err=>{
        console.log(err)
      }

     })

  }

  deleteHoatDong(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((result) => {
      if (result === 'ok') {
       this.hoatDongNgoaiTruongService.xoaHoatDongNgoaiTruong(id).subscribe({
        next: data=>{
          if (data.message && data.message === 'cant-delete') {
            this.toastr.warning("Không thể xóa!")
          } else {
            this.loadDanhSachHoatDong()
            this.toastr.success("Xóa thành công!")
          }
        },
        error: err=>{
          if(err.status ===401){
            this.toastr.warning("Không thể xóa!")
          }
        }
       })
      }
    });
  }
  huyHoatDong(id: any): void {
    var popup = this.dialog.open(HuyHdntComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((result) => {
      if (result === 'ok') {
       this.hoatDongNgoaiTruongService.huyHoatDongNgoaiTruong(id).subscribe({
        next: data=>{
          if (data.message && data.message === 'cant-destroy') {
            this.toastr.warning("Không thể hủy!")
          } else {
            this.loadDanhSachHoatDong()
            this.toastr.success("Hủy thành công!")
          }
        },
        error: err=>{
          if(err.status ===401){
            this.toastr.warning("Không thể hủy!")
          }
        }
       })
      }
    });
  }
  duyetHoatDong(item: any): void {

    var popup = this.dialog.open(DuyetHdntComponent, {
      width: '40%',
      data: {
        item: item
      },
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loadDanhSachHoatDong()
      }
    });
  }
  chiTietGiangVien(lecturer: any | null): void {
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
  getYears() {
    this.hoatDongNgoaiTruongService.getYears().subscribe((data: string[]) => {
      console.log(data);
      this.years = data;
      if (this.years.length > 0) {
        this.selectedYear = this.years[this.years.length - 1];
        this.loadDanhSachHoatDong(
          this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction,
          this.status
        );
      } else {
        this.selectedYear = null;
      }
    });
  }

  onYearChange() {
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachHoatDong(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status
    );
  }
}
