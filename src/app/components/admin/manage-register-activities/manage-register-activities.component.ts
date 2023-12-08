import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { B } from '@angular/cdk/keycodes';
import { AdminDestroyActivityComponent } from './admin-destroy-activity/admin-destroy-activity.component';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { DetailActivityComponent } from '../list-activities/detail-activity/detail-activity.component';
import { DetailLecturerComponent } from '../list-lecturer/detail-lecturer/detail-lecturer.component';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { subMonths } from 'date-fns';


@Component({
  selector: 'app-manage-register-activities',
  templateUrl: './manage-register-activities.component.html',
  styleUrls: ['./manage-register-activities.component.css'],
})
export class ManageRegisterActivitiesComponent implements OnInit, OnDestroy{
  danhSachDangKy: MatTableDataSource<DangKyHoatDong> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'hoatDong.tenHoatDong',
    'giangVien.taiKhoan.tenDayDu',
    'hanhdong',
  ];
  selectedHoatDong: any;
  length: number = 0;
  searchTerm: string = '';
  public startTime!: Date | null;
  public endTime!: Date | null;
  public status: string = 'Chua_Duyet';
  hoatDongSapDienRas!: any[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dangKyHoatDongService: DangKyHoatDongService,
    private hoatDongService: HoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private webSocketService: WebSocketService
  ) {}
  public filterVisible: boolean = true;

  toggleFilter() {
    this.filterVisible = !this.filterVisible;
  }
  ngOnInit(): void {
    this.loadDanhSachDangKy();
    this.connectWebsocket();
    this.loadHoatDongSapDienRa()
  }

  connectWebsocket(){
    console.log('ManageRegisterActivitiesComponent')
    this.webSocketService.connect("admin");

    this.webSocketService.messageEvent.subscribe((data) => {
      if(data==='register-activity'){
        this.loadDanhSachDangKy()
      }
    });
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
  loadHoatDongSapDienRa(){
    this.dangKyHoatDongService.getAllHoatDongSapDienRa().subscribe({
      next: data=>{
        this.hoatDongSapDienRas = data
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  loadDanhSachDangKy(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'hoatDong.thoiGianBatDau',
    sortDir: string = 'DESC',
    status: any = this.status,
    maHoatDong: string = this.selectedHoatDong
  ) {
    this.dangKyHoatDongService
      .layDanhSachTatCaDangKyHoatDong(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        status,
        this.startTime,
        this.endTime,
        null,
        null,
        maHoatDong
      )
      .subscribe((data) => {
        console.log(data);
        this.danhSachDangKy = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }

  onSearch() {
    this.status = '';
    this.loadDanhSachDangKy();
  }
  filter() {
    this.loadDanhSachDangKy(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
      this.status,
      this.selectedHoatDong // Thêm biến này vào phương thức
    );
  }
  refresh() {
    this.selectedHoatDong = null
    this.searchTerm = '';
    this.status = 'Chua_Duyet';
    this.startTime = null;
    this.endTime = null;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachDangKy();
  }
  duyet(id: number) {
    this.dangKyHoatDongService.approveDangKyHoatDong(id).subscribe({
      next: (data) => {
        if (data.message && data.message === 'hoatdong-exist') {
          this.toastr.warning('Bạn đã duyệt đăng ký hoạt động này rồi!');
        } else {
          this.loadDanhSachDangKy()
          this.toastr.success('Duyệt thành công!');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  huy(item:any){
    this.openDialog(item, true);
    console.log(item)
  }

  xemChiTiet(item:any){
    this.openDialog(item, false);
  }
  chiTietHoatDong(item: any | null): void {
    if (item) {
      this.hoatDongService.getFileName(item.maHoatDong).subscribe({
        next: data=>{

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
  openDialog(item: number, isEditable: boolean) {
    var popup = this.dialog.open(AdminDestroyActivityComponent, {
      data: {
        item: item,
        isEditable: isEditable
      },
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachDangKy();
    });
  }
  handleApproveAll(){
    this.dangKyHoatDongService.approveAllDangKyHoatDongByMaHoatDong(this.selectedHoatDong).subscribe({
      next: data=>{
        this.toastr.success("Đã duyệt tất cả đăng ký theo hoạt động đã chọn!")
        this.loadDanhSachDangKy()
      },
      error: err=>{
        console.log(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
