import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from './../../../services/storage.service';
import { DetailActivityComponent } from '../../admin/list-activities/detail-activity/detail-activity.component';
import { HoatDongService } from './../../../services/hoat-dong.service';
import { AdminDestroyActivityComponent } from '../../admin/manage-register-activities/admin-destroy-activity/admin-destroy-activity.component';
@Component({
  selector: 'app-manage-activity-lecturer',
  templateUrl: './manage-activity-lecturer.component.html',
  styleUrls: ['./manage-activity-lecturer.component.css'],
})
export class ManageActivityLecturerComponent implements OnInit {
  danhSachDangKy: MatTableDataSource<DangKyHoatDong> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hoatDong.tenHoatDong',
    'ngayTao',
    'hoatDong.thoiGianBatDau',
    'hanhdong',
  ];
  length: number = 0;
  searchTerm: string = '';
  public startTime!: Date | null;
  public endTime!: Date | null;
  public status: string = 'Chua_Duyet';
  username: string = '';
  years: string[] = [];
  selectedYear: string | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private dangKyHoatDongService: DangKyHoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private storageService: StorageService,
    private hoatDongService: HoatDongService
  ) {}
  public filterVisible: boolean = true;
  lyDoHuy(item: any) {
    var popup = this.dialog.open(AdminDestroyActivityComponent, {
      data: {
        item: item,
        isEditable: false,
      },
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachDangKy();
    });
  }
  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.tenTaiKhoan;
    this.loadDanhSachDangKy();
    this.getYears();
  }

  ngAfterViewInit() {
    this.danhSachDangKy.paginator = this.paginator;
    this.danhSachDangKy.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachDangKy(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachDangKy(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }
  loadDanhSachDangKy(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'hoatDong.ngayTao',
    sortDir: string = 'DESC',
    status: any = this.status,
    startTime?: Date | null,
    endTime?: Date | null,
    username?: string
  ) {
    this.dangKyHoatDongService
      .layDanhSachTatCaDangKyHoatDong(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        status,
        startTime,
        endTime,
        username,
        this.selectedYear
      )
      .subscribe((data) => {
        this.danhSachDangKy = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }

  getYears() {
    this.hoatDongService.getYears().subscribe((data: string[]) => {
      this.years = data;
      if (this.years.length > 0) {
        this.selectedYear = this.years[this.years.length - 1];
        this.loadDanhSachDangKy();
      } else {
        this.selectedYear = null;
      }
    });
  }

  onYearChange() {
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDangKy(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status,
      this.startTime,
      this.endTime,
      this.username
    );
  }
  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.toastr.warning('Vui lòng nhập từ khoá để tìm kiếm.');
      return;
    }
    this.status = '';
    this.startTime = null;
    this.endTime = null;
    this.loadDanhSachDangKy(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status,
      this.startTime,
      this.endTime,
      this.username
    );
  }

  filter() {
    this.loadDanhSachDangKy(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status,
      this.startTime,
      this.endTime,
      this.username
    );
  }
  refresh() {
    this.searchTerm = '';
    this.status = 'Chua_Duyet';
    this.startTime = null;
    this.getYears()
    this.endTime = null;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDangKy();
  }

  detail(item: any | null): void {
    console.log(item);
    if (item) {
      var popup = this.dialog.open(DetailActivityComponent, {
        data: {
          item: item,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
}
