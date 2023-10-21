import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DangKyHoatDong } from 'src/app/models/DangKyHoatDong';
import { DangKyHoatDongService } from './../../../services/dang-ky-hoat-dong.service';
import { ToastrService } from 'ngx-toastr';
import { HoatDong } from 'src/app/models/HoatDong';
import { forkJoin } from 'rxjs';
import { ListActivitiesComponent } from '../../admin/list-activities/list-activities.component';
import { WebSocketService } from 'src/app/services/web-socket.service';

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

  ) {}

  registrationStatus: { [key: string]: string } = {};

  ngOnInit(): void {
    
  }

  dangKy(item: any) {
    this.dangKyHoatDongService.dangKyHoatDong(item.maHoatDong).subscribe({
      next: (data) => {
        if (data.message && data.message === 'dangky-exist') {
          this.toastr.warning('Bạn đã đăng ký rồi!');
        } else {
          this.listActivitiesComponent.loadDanhSachHoatDong();
          this.toastr.success('Đăng ký thành công!');
        }
      },
      error: (err) => {},
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
