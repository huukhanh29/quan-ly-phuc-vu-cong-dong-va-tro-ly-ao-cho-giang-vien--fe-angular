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
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { StudentComponent } from './components/student/student.component';
import { TestComponent } from './components/student/test/test.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { TestlComponent } from './components/lecturer/testl/testl.component';
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


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ChatComponent,
    LoginComponent,
    LogoutComponent,
    AdminComponent,
    SidebarComponent,
    AdminHomeComponent,
    LecturerComponent,
    TestlComponent,
    LecturerHomeComponent,
    StudentComponent,
    StudentHomeComponent,
    TestComponent,
    TestlComponent,
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
    DetailFeedbackComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
