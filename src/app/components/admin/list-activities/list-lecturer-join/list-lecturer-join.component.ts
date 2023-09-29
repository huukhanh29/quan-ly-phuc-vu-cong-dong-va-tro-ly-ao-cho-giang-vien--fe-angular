import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-lecturer-join',
  templateUrl: './list-lecturer-join.component.html',
  styleUrls: ['./list-lecturer-join.component.css']
})
export class ListLecturerJoinComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      item: any;
    },
    private dialogRef: MatDialogRef<ListLecturerJoinComponent>
  ) {}
  displayedColumns: string[] = ['tenDangNhap', 'tenDayDu', 'email'];
  dataSource = new MatTableDataSource(this.data.item);
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {
    this.dataSource.sortingDataAccessor = (item:any, property) => {
      switch (property) {
        case 'tenDangNhap': return item.taiKhoan.tenDangNhap;
        case 'tenDayDu': return item.taiKhoan.tenDayDu;
        case 'email': return item.taiKhoan.email;
        default: return item[property];
      }
    };
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  closePopup() {
    this.dialogRef.close();
  }
}
