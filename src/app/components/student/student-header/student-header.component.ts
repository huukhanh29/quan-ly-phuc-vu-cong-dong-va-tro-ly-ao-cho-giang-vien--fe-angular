import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LogoutComponent } from '../../auth/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent {
  constructor( private dialog: MatDialog,
    ) {}
    dangXuat(): void {
      this.dialog.open(LogoutComponent, {
        width: '350px',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
      });
    }
}
