import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-register-activities',
  templateUrl: './manage-register-activities.component.html',
  styleUrls: ['./manage-register-activities.component.css']
})
export class ManageRegisterActivitiesComponent implements OnInit {
  danhSachDangKy: MatTableDataSource<DangKyHoatDong> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'hoatDong.tenHoatDong', 'giangVien.taiKhoan.tenDayDu', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';
  public startTime!: Date | null;
  public endTime!: Date | null;
  public status: string ='Chua_Duyet';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyHoatDongService: DangKyHoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  public filterVisible: boolean = true;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    this.loadDanhSachDangKy();
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
  ) {

    this.dangKyHoatDongService
      .layDanhSachTatCaDangKyHoatDong(page, size, sortBy, sortDir, this.searchTerm, status, this.startTime, this.endTime)
      .subscribe((data) => {
        console.log(data)
        this.danhSachDangKy = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }

  onSearch() {
    this.loadDanhSachDangKy();
  }
  filter() {
    this.loadDanhSachDangKy(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status
    );
  }
  refresh() {
    this.searchTerm = '';
    this.status = '';
    this.startTime = null;
    this.endTime = null;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDangKy();
  }
duyet(id:number){
  this.dangKyHoatDongService.approveDangKyHoatDong(id).subscribe({
    next:data=>{
      if(data.message && data.message === 'hoatdong-exist'){
        this.toastr.warning("Bạn đã đăng ký hoạt động này rồi!")
      }else{
        this.toastr.success("Đăng ký thành công!")
      }
    },
    error: err=>{
      console.log(err)
    }
  })
}
}
