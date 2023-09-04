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
    ThongBaoDialogComponent
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
