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
    AdminDestroyActivityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
    }),
  ],
  providers: [httpInterceptorProviders, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
