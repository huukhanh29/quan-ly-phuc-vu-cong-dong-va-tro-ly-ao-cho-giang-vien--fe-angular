import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CauHoi } from 'src/app/models/CauHoi';
import { CauHoiService } from 'src/app/services/cau-hoi.service';
import { StorageService } from 'src/app/services/storage.service';
import { DetailFaqComponent } from './detail-faq/detail-faq.component';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { DeleteFaqComponent } from './delete-faq/delete-faq.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css'],
})
export class ListFaqComponent implements OnInit {
  danhSachCauHoi: MatTableDataSource<CauHoi> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'cauHoi',
    'traLoi',
    'soLuongDaHoi',
    'hanhdong',
  ];
  length: number = 0;
  searchTerm: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private cauHoiService: CauHoiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDanhSachCauHoi();
  }

  ngAfterViewInit() {
    this.danhSachCauHoi.paginator = this.paginator;
    this.danhSachCauHoi.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachCauHoi(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachCauHoi(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction
      );
    });
  }

  loadDanhSachCauHoi(
    page: number = 0,
    size: number = 5,
    sortBy: string = 'ngayTao',
    sortDir: string = 'DESC'
  ) {
    this.cauHoiService
      .getAllCauHoi(page, size, sortBy, sortDir, this.searchTerm)
      .subscribe((data) => {
        this.danhSachCauHoi = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachCauHoi();
  }
  // filter() {
  //   this.sort.direction = 'desc';
  //   this.sort.active = 'soLuongCauHoiTuongTu';
  //   this.loadDanhSachCauHoi(
  //     this.paginator.pageIndex,
  //     this.paginator.pageSize,
  //     this.sort.active,
  //     this.sort.direction
  //   );
  // }

  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachCauHoi();
  }
  detail(id: any | null): void {
    console.log(id);
    if (id) {
      var popup = this.dialog.open(DetailFaqComponent, {
        data: {
          id: id,
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
  }
  addFaq(): void {
    var popup = this.dialog.open(AddFaqComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachCauHoi();
    });
  }
  editFaq(item:any): void {
    var popup = this.dialog.open(AddFaqComponent, {
      width: '50%',
      data:{item},
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      this.loadDanhSachCauHoi();
    });
  }
  deleteFaq(id: any): void {
    var popup = this.dialog.open(DeleteFaqComponent, {
      width: '50%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((item) => {
      if (item === 'accept') {
        this.cauHoiService.deleteCauHoi(id).subscribe({
          next: (data) => {
            if (data.message && data.message === 'cant-delete') {
              this.toastr.warning('Không thể xóa! Đã lưu trữ dữ liệu!');
            } else {
              this.toastr.success('Xóa thành công!');
              this.loadDanhSachCauHoi(
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.sort.active,
                this.sort.direction
              );
            }
          },
          error: (err) => {},
        });
      }
    });
  }
  onUploadFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / (1024 * 1024);
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

      if (fileSize > 2) {
        this.toastr.error('Dung lượng file không được vượt quá 2MB!');
        return;
      }

      if (!['doc', 'docx'].includes(fileExtension)) {
        this.toastr.error('Định dạng file phải là .doc, .docx, hoặc .txt!');
        return;
      }

      this.cauHoiService.uploadWordFile(file).subscribe({
        next: (data) => {
          event.target.value = null;
          if (data.message && /^Error: \d+$/.test(data.message)) {
            const errorMessage = data.message.substring('Error: '.length);
            this.toastr.error(
              'Đoạn không đúng định dạng: ' + errorMessage
            );
          }else  if (data.message && /^Exist: \d+$/.test(data.message)) {
            const errorMessage = data.message.substring('Error: '.length);
            this.toastr.error(
              'Từ khóa đã tồn tại ở đoạn: ' + errorMessage
            );
          }  else {
            this.toastr.success('Thêm các bộ câu hỏi thành công!');
            this.loadDanhSachCauHoi(
              this.paginator.pageIndex,
              this.paginator.pageSize,
              this.sort.active,
              this.sort.direction
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
