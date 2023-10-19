import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { GiangVien } from 'src/app/models/GiangVien';
import { ListLecturerJoinComponent } from './list-lecturer-join/list-lecturer-join.component';
import { DeleteComponent } from '../../delete/delete.component';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit{
  danhSachHoatDong: MatTableDataSource<HoatDong> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'tenHoatDong', 'thoiGianBatDau', 'thoiGianKetThuc', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';
  public startTime!: Date | null;
  public endTime!: Date | null;
  public type: string = '';
  public status: string='SAP_DIEN_RA';
  loaiHoatDongs: any[] = [];
  giangVienToChucs: GiangVien[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() showAddButton: boolean = true; // true by default
  @Input() customButton: TemplateRef<any> | null = null;
  @Output() activitiesLoaded = new EventEmitter<HoatDong[]>();

  constructor(
    private hoatDongService: HoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  public filterVisible: boolean = true;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    this.loadDanhSachHoatDong();
    this.getAllLoaiHoatDong();
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
  getAllLoaiHoatDong() {
    this.hoatDongService.getAllLoaiHoatDong().subscribe(data => {
      this.loaiHoatDongs = data;
    });
  }
  loadDanhSachHoatDong(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC',
    type: string = this.type,
    status: any = this.status
  ) {
    this.hoatDongService
      .getAllHoatDong(page, size, sortBy, sortDir, this.searchTerm,type, status, this.startTime, this.endTime)
      .subscribe((data) => {
        console.log(data)
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
      this.type,
      this.status
    );
  }
  refresh() {
    this.searchTerm = '';
    this.type = '';
    this.status = 'SAP_DIEN_RA';
    this.startTime = null;
    this.endTime = null;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachHoatDong();
  }

  addHoatDong(): void {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '60%',
      data: {
        activity: null,
        isEditing: false // Thêm hoạt động mới
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Closed') {
        this.loadDanhSachHoatDong();
      }
    });
  }

  editHoatDong(item: any): void {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      width: '60%',
      data: {
        activity: item,
        isEditing: true // Chỉnh sửa hoạt động hiện có
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Closed') {
        this.loadDanhSachHoatDong();
      }
    });
  }

  detail(item: any ): void {
    this.hoatDongService.getFileName(item.maHoatDong).subscribe({
      next: data=>{
        console.log(data)
        var popup = this.dialog.open(DetailActivityComponent, {
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
  listLecturer(item: any | null): void {
    if (item) {
      var popup = this.dialog.open(ListLecturerJoinComponent, {
        data: {
          item: item,
        },
        width: '50%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
  deleteHoatDong(id: any): void {
    var popup = this.dialog.open(DeleteComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((result) => {
      if (result === 'ok') {
       this.hoatDongService.deleteHoatDong(id).subscribe({
        next: data=>{
          if (data.message && data.message === 'cant-delete') {
            this.toastr.warning("Không thể xóa!")
          } else {
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
}
