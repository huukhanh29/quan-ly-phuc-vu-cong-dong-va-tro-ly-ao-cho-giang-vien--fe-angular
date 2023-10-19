import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { DetailActivityComponent } from '../admin/list-activities/detail-activity/detail-activity.component';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { addMonths, subMonths, addYears, subYears, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { StorageService } from 'src/app/services/storage.service';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { DangKyHoatDongService } from 'src/app/services/dang-ky-hoat-dong.service';

@Component({
  selector: 'app-lich-hoat-dong',
  templateUrl: './lich-hoat-dong.component.html',
  styleUrls: ['./lich-hoat-dong.component.css'],
})
export class LichHoatDongComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  username: string = '';
  role!:string
  constructor(
    private dialog: MatDialog,
    private hoatDongService: HoatDongService,
    private dangKyHoatDongService: DangKyHoatDongService,
    private storageService: StorageService,
  ) {}
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.username = user.tenTaiKhoan;
    this.role = user.quyen
    this.loadAllHoatDong();
  }
  loadAllHoatDong() {
    if(this.role === 'GiangVien'){
      this.dangKyHoatDongService.getHoatDongsByGiangVien(this.username).subscribe({
        next: (data) => {
          this.events = data.map(hoatDong => ({
            start: new Date(hoatDong.thoiGianBatDau),
            end: new Date(hoatDong.thoiGianKetThuc),
            title: hoatDong.tenHoatDong,
            meta: hoatDong
          }));
        },
        error: (err) => {
          console.log(err);
        },
      });
    }else{
      this.hoatDongService.getAllHoatDongs1().subscribe({
        next: (data) => {
          this.events = data.map(hoatDong => ({
            start: new Date(hoatDong.thoiGianBatDau),
            end: new Date(hoatDong.thoiGianKetThuc),
            title: hoatDong.tenHoatDong,
            meta: hoatDong
          }));
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
   
  }

  handleEventClick(event: CalendarEvent): void {
    console.log(event.meta)
    this.dialog.open(DetailActivityComponent, {
      data: { item: event.meta },
      width: '400px',
    });
  }
  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  nextYear(): void {
    this.viewDate = addYears(this.viewDate, 1);
  }

  previousYear(): void {
    this.viewDate = subYears(this.viewDate, 1);
  }
  getCurrentMonthAndYear(): string {
    return 'Tháng ' + format(this.viewDate, 'MM/yyyy', { locale: vi });
  }

  today(): void {
    this.viewDate = new Date();
  }
}
