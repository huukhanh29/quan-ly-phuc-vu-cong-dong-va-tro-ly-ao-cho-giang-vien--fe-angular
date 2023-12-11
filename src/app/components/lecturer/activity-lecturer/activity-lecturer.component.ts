import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { DangKyHoatDongService } from './../../../services/dang-ky-hoat-dong.service';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { forkJoin } from 'rxjs';
import { ListActivitiesComponent } from '../../admin/list-activities/list-activities.component';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { MatDialog } from '@angular/material/dialog';
import { XacNhanDangKyComponent } from './xac-nhan-dang-ky/xac-nhan-dang-ky.component';

@Component({
  selector: 'app-activity-lecturer',
  templateUrl: './activity-lecturer.component.html',
  styleUrls: ['./activity-lecturer.component.css'],
})
export class ActivityLecturerComponent implements OnInit {
  @ViewChild(ListActivitiesComponent)
  listActivitiesComponent!: ListActivitiesComponent;
  constructor(
    private dangKyHoatDongService: DangKyHoatDongService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) {}

  registrationStatus: { [key: string]: string } = {};

  ngOnInit(): void {

  }

  dangKy(item: any) {
    var popup = this.dialog.open(XacNhanDangKyComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    popup.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.dangKyHoatDongService.dangKyHoatDong(item.maHoatDong).subscribe({
          next: (data) => {
            if (data.message && data.message === 'dangky-exist') {
              this.toastr.warning('Bạn đã đăng ký rồi!');
            }
            else  if (data.message && data.message === 'registration-not-allowed'){
              this.toastr.warning('Bạn là người tổ chức nên không thể đăng ký!');
            } else {
              this.listActivitiesComponent.loadDanhSachHoatDong();
              this.toastr.success('Đăng ký thành công!');
            }
          },
          error: (err) => {},
        });
      }
    });

  }
  loading: boolean = true;

  onActivitiesLoaded(activities: HoatDong[]) {
    activities.forEach((activity) => {
      this.dangKyHoatDongService
        .kiemTraDangKyHoatDong(activity.maHoatDong)
        .subscribe({
          next: (response) => {
            this.registrationStatus[activity.maHoatDong] = response.message;
          },
          error: (error) => {},
        });
    });
  }

}
