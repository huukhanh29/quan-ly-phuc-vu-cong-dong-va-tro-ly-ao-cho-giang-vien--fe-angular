import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GiangVien } from 'src/app/models/GiangVien';
import { StorageService } from 'src/app/services/storage.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { MatDialog } from '@angular/material/dialog';
import { PhanHoiService } from 'src/app/services/phan-hoi.service';
import { DetailFeedbackComponent } from './detail-feedback/detail-feedback.component';
import { PhanHoi } from 'src/app/models/PhanHoi';
import { DeleteFeedbackComponent } from './delete-feedback/delete-feedback.component';
import { ReplyFeedbackComponent } from './reply-feedback/reply-feedback.component';
@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent {
  danhSachPhanHoi: MatTableDataSource<PhanHoi> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'noiDung', 'cauHoi.cauHoi','sinhVien.taiKhoan.tenDayDu', 'hanhdong'];
  length: number = 0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(

    private phanHoiService: PhanHoiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.loadDanhSachPhanHoi();
  }

  ngAfterViewInit() {
    this.danhSachPhanHoi.paginator = this.paginator;
    this.danhSachPhanHoi.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachPhanHoi(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachPhanHoi(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachPhanHoi(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC'
  ) {

    this.phanHoiService
      .getAllPhanHoi(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
        ''
      )
      .subscribe((data) => {
        console.log(data)
        this.danhSachPhanHoi = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachPhanHoi();
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachPhanHoi();
  }
  detail(phanHoi: any | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
    if (phanHoi) {
      var popup = this.dialog.open(DetailFeedbackComponent, {
        data: {
          phanHoi: phanHoi,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
  deleteFeedback(id: any): void {
    var popup = this.dialog.open(DeleteFeedbackComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      if (item === 'accept') {
        this.phanHoiService.deletePhanHoi(id).subscribe({
          next: (data) => {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachPhanHoi();
          },
          error: (err) => {
            this.toastr.warning('Xóa không thành công!');
            console.log(err)
          },
        });
      }
    });
  }
  replyFeedback(phanHoi: any): void {
    var popup = this.dialog.open(ReplyFeedbackComponent, {
      data: {
        phanHoi: phanHoi,
      },
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachPhanHoi();
    });
  }
}
