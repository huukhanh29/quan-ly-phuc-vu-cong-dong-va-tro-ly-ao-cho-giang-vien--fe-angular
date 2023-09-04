import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { ThongBao } from 'src/app/models//ThongBao';
import { MatDialog } from '@angular/material/dialog';
import { ThongBaoDialogComponent } from './thong-bao-dialog/thong-bao-dialog.component';

@Component({
  selector: 'app-thong-bao',
  templateUrl: './thong-bao.component.html',
  styleUrls: ['./thong-bao.component.css'],
})
export class ThongBaoComponent implements OnInit {
  ThongBaos: MatTableDataSource<any> = new MatTableDataSource();
  TBChuaDoc: MatTableDataSource<any> = new MatTableDataSource();
  TBDaDoc: MatTableDataSource<any> = new MatTableDataSource();
  selectedNotification!: ThongBao | null;
  displayedColumns: string[] = ['tieuDe'];
  constructor(
    private thongBaoService: ThongBaoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.thongBaoService.layThongBaoTheoNguoiDungId().subscribe({
      next: (data) => {
        this.ThongBaos = data;
        this.TBChuaDoc = data.filter(
          (item: { trangThai: string }) => item.trangThai === 'ChuaDoc'
        );
        this.TBDaDoc = data.filter(
          (item: { trangThai: string }) => item.trangThai === 'DaDoc'
        );
        // Cập nhật số thông báo chưa đọc
        const chuaDoc = data.filter((item: { trangThai: string; }) => item.trangThai === 'ChuaDoc');
        this.thongBaoService.capNhatSoThongBaoChuaDoc(chuaDoc.length);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleDeleteAll(): void {
    this.thongBaoService.xoaTatCaThongBaoTheoNguoiDungId().subscribe({
      next: (data) => {
        this.loadNotifications();
        console.log(data);
        this.selectedNotification = null;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleDeleteOne(maThongBao: number): void {
    this.thongBaoService.xoaThongBao(maThongBao).subscribe({
      next: (data) => {
        this.loadNotifications();
        console.log(data);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  handleNotificationClick(notification: ThongBao | null): void {
    // Bước 4: Mở dialog thay vì đặt selectedNotification
    if (notification) {
      var popup = this.dialog.open(ThongBaoDialogComponent, {
        data: {
          notification: notification,
          deleteHandler: this.handleDeleteOne.bind(this),
        },
        width: '40%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
      popup.afterClosed().subscribe((item) => {
        // console.log(item)
        this.loadNotifications();
      });
      if (notification.trangThai === 'ChuaDoc') {
        this.thongBaoService
          .datTrangThaiThongBao(notification.maThongBao)
          .subscribe({
            next: (data) => {
              this.loadNotifications();
            },
            error: (err) => {
              console.error('Error:', err);
            },
          });
      }
    }
  }
}
