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

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent implements OnInit{
  danhSachCauHoi: MatTableDataSource<CauHoi> = new MatTableDataSource();
  displayedColumns: string[] = ['stt', 'cauHoi', 'traLoi', 'soLuongDaHoi'];
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
    sortBy: string = 'cauHoi',
    sortDir: string = 'DESC'
  ) {

    this.cauHoiService
      .getAllCauHoi(
        page,
        size,
        sortBy,
        sortDir,
        this.searchTerm,
      )
      .subscribe((data) => {
        this.danhSachCauHoi = new MatTableDataSource<any>(data.content);
        this.paginator.length = data.totalElements;
        this.length = data.totalElements;
      });
  }
  onSearch() {
    this.loadDanhSachCauHoi();
  }
  refresh() {
    this.searchTerm = '';
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadDanhSachCauHoi();
  }
  detail(id: any | null): void {
    console.log(id)
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
}
