import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { ThongBaoService } from 'src/app/services/thong-bao.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit{
  soThongBao: number =0;
  private subscription: Subscription = new Subscription();
  constructor( private dialog: MatDialog,
    private thongBaoService: ThongBaoService
    ) {}

    ngOnInit(): void {
      this.subscription.add(
        this.thongBaoService.laySoThongBaoChuaDocTheoNguoiDungId().subscribe({
          next: data =>{
            this.soThongBao = data;
          },
          error: error =>{
            console.log(error);
          }
        })
      );

      this.subscription.add(
        this.thongBaoService.soThongBaoChuaDocObservable.subscribe(newSoThongBao => {
          this.soThongBao = newSoThongBao;
        })
      );
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
