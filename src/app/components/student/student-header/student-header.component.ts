import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit{
  soThongBao: number =0;
  private subscription: Subscription = new Subscription();
  constructor( private dialog: MatDialog,
    private thongBaoService: ThongBaoService,
    private webSocketService: WebSocketService,
    private storageService:StorageService
    ) {}

    ngOnInit(): void {
      this.laySoThongBao();
      this.connectWebsocket();
    }
    laySoThongBao(){
      this.thongBaoService.laySoThongBaoChuaDocTheoNguoiDungId().subscribe({
        next: data =>{

          this.soThongBao = data;
        },
        error: error =>{
          console.log(error);
        }
      })
    }
    connectWebsocket(){
      const user = this.storageService.getUser();
      this.webSocketService.connect(user.tenTaiKhoan);

      this.webSocketService.messageEvent.subscribe((data) => {
        if(data==="update-status" || data==="reply-feedback"){
          this.laySoThongBao();
          console.log("cap nhat")
        }
      });
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    dangXuat(): void {
      this.dialog.open(LogoutComponent, {
        width: '350px',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
}
