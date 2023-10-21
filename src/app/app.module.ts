import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './components/student/chat/chat.component';
import { MaterialModule } from './material.module';
import { LoginComponent } from './components/auth/login/login.component';
import { httpInterceptorProviders } from './services/http.interceptor';
import { ToastrModule, ToastPackage } from 'ngx-toastr';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { StudentComponent } from './components/student/student.component';
import { TestComponent } from './components/student/test/test.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { StudentHeaderComponent } from './components/student/student-header/student-header.component';
import { StudentFooterComponent } from './components/student/student-footer/student-footer.component';
import { PhanHoiChatComponent } from './components/student/phan-hoi-chat/phan-hoi-chat.component';
import { RootComponent } from './root.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ThongBaoComponent } from './components/thong-bao/thong-bao.component';
import { ThongBaoDialogComponent } from './components/thong-bao/thong-bao-dialog/thong-bao-dialog.component';
import { ListStudentComponent } from './components/admin/list-student/list-student.component';
import { Page0Component } from './components/error-page/page0/page0.component';
import { Page404Component } from './components/error-page/page404/page404.component';
import { Page403Component } from './components/error-page/page403/page403.component';
import { ListLecturerComponent } from './components/admin/list-lecturer/list-lecturer.component';
import { DetailLecturerComponent } from './components/admin/list-lecturer/detail-lecturer/detail-lecturer.component';
import { DetailStudentComponent } from './components/admin/list-student/detail-student/detail-student.component';
import { ListFaqComponent } from './components/admin/list-faq/list-faq.component';
import { DetailFaqComponent } from './components/admin/list-faq/detail-faq/detail-faq.component';
import { ListFeedbackComponent } from './components/admin/list-feedback/list-feedback.component';
import { DetailFeedbackComponent } from './components/admin/list-feedback/detail-feedback/detail-feedback.component';
import { AddLecturerComponent } from './components/admin/list-lecturer/add-lecturer/add-lecturer.component';
import { CookieService } from 'ngx-cookie-service';
import { AddStudentComponent } from './components/admin/list-student/add-student/add-student.component';
import { AddFaqComponent } from './components/admin/list-faq/add-faq/add-faq.component';
import { DeleteFaqComponent } from './components/admin/list-faq/delete-faq/delete-faq.component';
import { DeleteFeedbackComponent } from './components/admin/list-feedback/delete-feedback/delete-feedback.component';
import { ReplyFeedbackComponent } from './components/admin/list-feedback/reply-feedback/reply-feedback.component';
import { ListActivitiesComponent } from './components/admin/list-activities/list-activities.component';
import { DetailActivityComponent } from './components/admin/list-activities/detail-activity/detail-activity.component';
import { AddActivityComponent } from './components/admin/list-activities/add-activity/add-activity.component';
import { ListLecturerJoinComponent } from './components/admin/list-activities/list-lecturer-join/list-lecturer-join.component';
import { ManageRegisterActivitiesComponent } from './components/admin/manage-register-activities/manage-register-activities.component';
import { SidebarLecturerComponent } from './components/lecturer/sidebar-lecturer/sidebar-lecturer.component';
import { ActivityLecturerComponent } from './components/lecturer/activity-lecturer/activity-lecturer.component';
import { ManageActivityLecturerComponent } from './components/lecturer/manage-activity-lecturer/manage-activity-lecturer.component';
import { SidebarAdminComponent } from './components/admin/sidebar-admin/sidebar-admin.component';
import { AdminDestroyActivityComponent } from './components/admin/manage-register-activities/admin-destroy-activity/admin-destroy-activity.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LichHoatDongComponent } from './components/lich-hoat-dong/lich-hoat-dong.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartPieComponent } from './components/lecturer/chart-pie/chart-pie.component';
import { ChartLineComponent } from './components/admin/chart-line/chart-line.component';
import { DeleteComponent } from './components/delete/delete.component';
import { LoaiHoatDongComponent } from './components/admin/loai-hoat-dong/loai-hoat-dong.component';
import { ChiTietLhdComponent } from './components/admin/loai-hoat-dong/chi-tiet-lhd/chi-tiet-lhd.component';
import { FormLhdComponent } from './components/admin/loai-hoat-dong/form-lhd/form-lhd.component';
import { TruongComponent } from './components/admin/truong/truong.component';
import { KhoaComponent } from './components/admin/khoa/khoa.component';
import { ChucDanhComponent } from './components/admin/chuc-danh/chuc-danh.component';
import { FormTruongComponent } from './components/admin/truong/form-truong/form-truong.component';
import { ChiTietTruongComponent } from './components/admin/truong/chi-tiet-truong/chi-tiet-truong.component';
import { FormKhoaComponent } from './components/admin/khoa/form-khoa/form-khoa.component';
import { ChiTietKhoaComponent } from './components/admin/khoa/chi-tiet-khoa/chi-tiet-khoa.component';
import { ChiTietChucDanhComponent } from './components/admin/chuc-danh/chi-tiet-chuc-danh/chi-tiet-chuc-danh.component';
import { FormChucDanhComponent } from './components/admin/chuc-danh/form-chuc-danh/form-chuc-danh.component';
import { HoatDongNgoaiTruongComponent } from './components/admin/hoat-dong-ngoai-truong/hoat-dong-ngoai-truong.component';
import { ThemHdntComponent } from './components/admin/hoat-dong-ngoai-truong/them-hdnt/them-hdnt.component';
import { ChiTietHdntComponent } from './components/admin/hoat-dong-ngoai-truong/chi-tiet-hdnt/chi-tiet-hdnt.component';
import { DuyetHdntComponent } from './components/admin/hoat-dong-ngoai-truong/duyet-hdnt/duyet-hdnt.component';
import { DatePipe } from '@angular/common';
import { BreadcrumbsComponent } from './components/layouts/breadcrumbs/breadcrumbs.component';
import { DanhSachGiangVienComponent } from './components/admin/danh-sach-giang-vien/danh-sach-giang-vien.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { XuatDuLieuComponent } from './components/xuat-du-lieu/xuat-du-lieu.component';
@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ChatComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    SidebarAdminComponent,
    SidebarComponent,
    AdminHomeComponent,
    LecturerComponent,
    LecturerHomeComponent,
    StudentComponent,
    StudentHomeComponent,
    TestComponent,
    StudentHeaderComponent,
    StudentFooterComponent,
    PhanHoiChatComponent,
    ThongBaoComponent,
    ThongBaoDialogComponent,
    ListStudentComponent,
    Page0Component,
    Page404Component,
    Page403Component,
    ListLecturerComponent,
    DetailLecturerComponent,
    DetailStudentComponent,
    ListFaqComponent,
    DetailFaqComponent,
    ListFeedbackComponent,
    DetailFeedbackComponent,
    AddLecturerComponent,
    AddStudentComponent,
    AddFaqComponent,
    DeleteFaqComponent,
    DeleteFeedbackComponent,
    ReplyFeedbackComponent,
    ListActivitiesComponent,
    DetailActivityComponent,
    AddActivityComponent,
    ListLecturerJoinComponent,
    ManageRegisterActivitiesComponent,
    SidebarLecturerComponent,
    ActivityLecturerComponent,
    ManageActivityLecturerComponent,
    AdminDestroyActivityComponent,
    LichHoatDongComponent,
    ChartPieComponent,
    ChartLineComponent,
    DeleteComponent,
    LoaiHoatDongComponent,
    ChiTietLhdComponent,
    FormLhdComponent,
    TruongComponent,
    KhoaComponent,
    ChucDanhComponent,
    FormTruongComponent,
    ChiTietTruongComponent,
    FormKhoaComponent,
    ChiTietKhoaComponent,
    ChiTietChucDanhComponent,
    FormChucDanhComponent,
    HoatDongNgoaiTruongComponent,
    ThemHdntComponent,
    ChiTietHdntComponent,
    DuyetHdntComponent,
    BreadcrumbsComponent,
    DanhSachGiangVienComponent,
    UserInfoComponent,
    XuatDuLieuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgChartsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
    }),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [httpInterceptorProviders, CookieService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
