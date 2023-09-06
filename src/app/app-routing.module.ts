import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { AppComponent } from './app.component';
import { PhanHoiChatComponent } from './components/student/phan-hoi-chat/phan-hoi-chat.component';
import { StudentComponent } from './components/student/student.component';
import { TestComponent } from './components/student/test/test.component';
import { RootComponent } from './root.component';
import { ThongBaoComponent } from './components/thong-bao/thong-bao.component';
import { ListStudentComponent } from './components/admin/list-student/list-student.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
  {
    path: 'quan-tri-vien',
    component: AdminComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      {
        path: 'trang-chu',
        component: AdminHomeComponent,
      },
      {
        path: 'danh-sach-sinh-vien',
        component: ListStudentComponent,
      },
    ],
  },
  {
    path: 'sinh-vien',
    component: StudentComponent,
    children: [
      { path: '', component: StudentHomeComponent },
      { path: 'trang-chu', component: StudentHomeComponent },
      { path: 'phan-hoi-chat', component: PhanHoiChatComponent },
      { path: 'thong-bao', component: ThongBaoComponent },
    ],
  },
  {
    path: 'giang-vien',
    component: LecturerComponent,
    children: [
      { path: '', component: LecturerHomeComponent },
      { path: 'trang-chu', component: LecturerHomeComponent },
    ],
  },
  {
    path: 'dang-nhap',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
