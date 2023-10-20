import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { StudentHomeComponent } from './components/student/student-home/student-home.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LecturerHomeComponent } from './components/lecturer/lecturer-home/lecturer-home.component';
import { PhanHoiChatComponent } from './components/student/phan-hoi-chat/phan-hoi-chat.component';
import { StudentComponent } from './components/student/student.component';
import { RootComponent } from './root.component';
import { ThongBaoComponent } from './components/thong-bao/thong-bao.component';
import { ListStudentComponent } from './components/admin/list-student/list-student.component';
import { Page404Component } from './components/error-page/page404/page404.component';
import { Page0Component } from './components/error-page/page0/page0.component';
import { Page403Component } from './components/error-page/page403/page403.component';
import { ListLecturerComponent } from './components/admin/list-lecturer/list-lecturer.component';
import { ListFaqComponent } from './components/admin/list-faq/list-faq.component';
import { ListFeedbackComponent } from './components/admin/list-feedback/list-feedback.component';
import { ListActivitiesComponent } from './components/admin/list-activities/list-activities.component';
import { ManageRegisterActivitiesComponent } from './components/admin/manage-register-activities/manage-register-activities.component';
import { ActivityLecturerComponent } from './components/lecturer/activity-lecturer/activity-lecturer.component';
import { ManageActivityLecturerComponent } from './components/lecturer/manage-activity-lecturer/manage-activity-lecturer.component';
import { LichHoatDongComponent } from './components/lich-hoat-dong/lich-hoat-dong.component';
import { ChartPieComponent } from './components/lecturer/chart-pie/chart-pie.component';
import { LoaiHoatDongComponent } from './components/admin/loai-hoat-dong/loai-hoat-dong.component';
import { TruongComponent } from './components/admin/truong/truong.component';
import { KhoaComponent } from './components/admin/khoa/khoa.component';
import { ChucDanhComponent } from './components/admin/chuc-danh/chuc-danh.component';
import { HoatDongNgoaiTruongComponent } from './components/admin/hoat-dong-ngoai-truong/hoat-dong-ngoai-truong.component';
import { DanhSachGiangVienComponent } from './components/admin/danh-sach-giang-vien/danh-sach-giang-vien.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
  },
  {
    path: 'quan-tri-vien',
    component: AdminComponent,
    data: { titulo: 'Quản trị viên' },
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'trang-chu',
        component: AdminHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'danh-sach-sinh-vien',
        component: ListStudentComponent,
        data: { titulo: 'Tài khoản sinh viên' },
      },
      {
        path: 'danh-sach-giang-vien',
        component: ListLecturerComponent,
        data: { titulo: 'Tài khoản giảng viên' },
      },
      {
        path: 'danh-sach-cau-hoi',
        component: ListFaqComponent,
        data: { titulo: 'Danh sách câu hỏi' },
      },
      {
        path: 'danh-sach-phan-hoi',
        component: ListFeedbackComponent,
        data: { titulo: 'Danh sách phản hồi' },
      },
      {
        path: 'danh-sach-hoat-dong',
        component: ListActivitiesComponent,
        data: { titulo: 'Danh sách hoạt động' },
      },
      {
        path: 'danh-sach-giang-vien-cua-hoat-dong/:maHoatDong',
        component: DanhSachGiangVienComponent,
        data: { titulo: 'Danh sách giảng viên' },
      },
      {
        path: 'quan-ly-dang-ky-hoat-dong',
        component: ManageRegisterActivitiesComponent,
        data: { titulo: 'Quản lý đăng ký hoạt động' },
      },
      {
        path: 'lich',
        component: LichHoatDongComponent,
        data: { titulo: 'Lịch hoạt động' },
      },
      {
        path: 'loai-hoat-dong',
        component: LoaiHoatDongComponent,
        data: { titulo: 'Loại hoạt động' },
      },
      {
        path: 'truong',
        component: TruongComponent,
        data: { titulo: 'Trường' },
      },
      { path: 'khoa', component: KhoaComponent, data: { titulo: 'Khoa' } },
      {
        path: 'chuc-danh',
        component: ChucDanhComponent,
        data: { titulo: 'Chức danh' },
      },
      {
        path: 'hoat-dong-ngoai-truong',
        component: HoatDongNgoaiTruongComponent,
        data: { titulo: 'Hoạt động ngoài trường' },
      },
    ],
  },

  {
    path: 'sinh-vien',
    component: StudentComponent,
    data: { titulo: 'Sinh viên' },
    children: [
      {
        path: '',
        component: StudentHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'trang-chu',
        component: StudentHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'phan-hoi-chat',
        component: PhanHoiChatComponent,
        data: { titulo: 'Phản hồi chat' },
      },
      {
        path: 'thong-bao',
        component: ThongBaoComponent,
        data: { titulo: 'Thông báo' },
      },
    ],
  },
  {
    path: 'giang-vien',
    component: LecturerComponent,
    data: { titulo: 'Giảng viên' },
    children: [
      {
        path: '',
        component: LecturerHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'trang-chu',
        component: LecturerHomeComponent,
        data: { titulo: 'Trang chủ' },
      },
      {
        path: 'danh-sach-hoat-dong',
        component: ActivityLecturerComponent,
        data: { titulo: 'Danh sách hoạt động' },
      },

      {
        path: 'quan-ly-hoat-dong',
        component: ManageActivityLecturerComponent,
        data: { titulo: 'Quản lý hoạt động' },
      },
      {
        path: 'thong-bao',
        component: ThongBaoComponent,
        data: { titulo: 'Thông báo' },
      },
      {
        path: 'bieu-do',
        component: ChartPieComponent,
        data: { titulo: 'Biểu đồ' },
      },
      {
        path: 'hoat-dong-ngoai-truong',
        component: HoatDongNgoaiTruongComponent,
        data: { titulo: 'Hoạt động ngoại trường' },
      },
      {
        path: 'lich',
        component: LichHoatDongComponent,
        data: { titulo: 'Lịch hoạt động' },
      },

    ],
  },
  {
    path: 'dang-nhap',
    component: LoginComponent,
    data: { titulo: 'Đăng nhập' },
  },
  { path: 'bao-tri', component: Page0Component, data: { titulo: 'Bảo trì' } },
  {
    path: '403',
    component: Page403Component,
    data: { titulo: '403 - Truy cập bị từ chối' },
  },
  {
    path: '**',
    component: Page404Component,
    data: { titulo: '404 - Không tìm thấy trang' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
