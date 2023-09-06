import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PhanHoiService } from 'src/app/services/phan-hoi.service';
import { StorageService } from 'src/app/services/storage.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  phanHoiForm!: FormGroup;
  danhSachPhanHoi: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'stt',
    'noiDung',
    'cauHoi'
  ];
  length: number=0;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder: FormBuilder,
    private phanHoiService: PhanHoiService,
    private storageService: StorageService,
    private toastr: ToastrService,
    private w: WebSocketService

    ) { }

  ngOnInit(): void {
    this.initPhanHoiForm();
    this.loadDanhSachPhanHoi();
    const user = this.storageService.getUser()
    this.w.connect(user.tenTaiKhoan, user.token )
  }
  ok(): void{
    const cauHoi: any = {
      cauHoi: "Nộsgsissddsjdajdds",
      traLoi: "Nội dungstrảs lờij 2"
    };
    this.phanHoiService.replyToPhanHoi(cauHoi,5).subscribe({
      next: data=>{ console.log("ok")

    },
      error: error=>{}

    })

  }
  initPhanHoiForm() {
    this.phanHoiForm = this.formBuilder.group({
      noiDung: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.phanHoiForm.valid) {
      this.phanHoiService.createPhanHoi(this.phanHoiForm.value).subscribe({
        next: data => {
          if(data.message == "exist"){
            this.toastr.warning("Phản hồi đã tồn tại!");
          }else{
            this.loadDanhSachPhanHoi();
            this.toastr.success("Gửi phản hồi thành công!");
          }
        },
        error: err => {
          this.toastr.error("Lỗi rồi!");
        }
      });
    }
  }

  ngAfterViewInit() {
    this.danhSachPhanHoi.paginator = this.paginator;
    this.danhSachPhanHoi.sort = this.sort;
    this.paginator.page.subscribe(() => {
      this.loadDanhSachPhanHoi(this.paginator.pageIndex,
        this.paginator.pageSize, this.sort.active, this.sort.direction);
    });

    this.sort.sortChange.subscribe(() => {
      this.loadDanhSachPhanHoi(this.paginator.pageIndex,
        this.paginator.pageSize, this.sort.active, this.sort.direction);
    });
  }

  loadDanhSachPhanHoi(page: number = 0, size: number = 10, sortBy: string = 'ngayTao', sortDir: string = 'DESC') {
    const user = this.storageService.getUser();
    this.phanHoiService.getAllPhanHoi(page, size, sortBy, sortDir, this.searchTerm).subscribe(data => {
      this.danhSachPhanHoi = new MatTableDataSource<any>(data.content);
      this.paginator.length = data.totalElements;
      this.length =data.totalElements;
    });
  }
  onSearch() {
    this.loadDanhSachPhanHoi();
  }
  refresh() {
    this.searchTerm = '';
    this.initPhanHoiForm();
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachPhanHoi();
  }

}
