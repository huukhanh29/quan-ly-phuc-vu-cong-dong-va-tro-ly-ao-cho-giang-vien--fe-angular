import { HttpClient } from '@angular/common/http';
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
    private w: WebSocketService,
    private http: HttpClient

    ) { }

  ngOnInit(): void {
    const user = this.storageService.getUser()
    //this.w.connect(user.tenTaiKhoan)
  }
  

}
