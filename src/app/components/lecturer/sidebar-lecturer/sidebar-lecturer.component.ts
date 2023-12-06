import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-sidebar-lecturer',
  templateUrl: './sidebar-lecturer.component.html',
  styleUrls: ['./sidebar-lecturer.component.css']
})
export class SidebarLecturerComponent implements OnInit{
  soThongBao: number =0;
  constructor(
    private thongBaoService: ThongBaoService,
    private webSocketService: WebSocketService,
    private storageService:StorageService
    ) {}

    ngOnInit(): void {
      this.laySoThongBao();
      this,this.connectWebsocket()
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
      if(user && user.tenTaiKhoan) {
        this.webSocketService.connect(user.tenTaiKhoan);

        this.webSocketService.messageEvent.subscribe((data) => {
          console.log(data)
          if(data==="approve-activity" || data==="destroy-activity" || "update-status"){
            this.laySoThongBao();
          }
        });
      } else {
        console.log("Người dùng không tồn tại hoặc tên tài khoản không hợp lệ");
      }
    }


    ngOnDestroy(): void {
      this.webSocketService.disconnect()
    }

}
