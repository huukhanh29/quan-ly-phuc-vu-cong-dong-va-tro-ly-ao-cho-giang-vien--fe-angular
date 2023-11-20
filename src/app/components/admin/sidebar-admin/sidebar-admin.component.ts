import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent {
  menuItems = [
    {
      label: 'Tài Khoản',
      icon: 'account_circle',
      subItems: [
        {
          label: 'Giảng Viên',
          icon: 'school',
          routerLink: '/quan-tri-vien/danh-sach-giang-vien'
        },
        {
          label: 'Sinh Viên',
          icon: 'people',
          routerLink: '/quan-tri-vien/danh-sach-sinh-vien'
        }
      ]
    },
    {
      label: 'Trợ lý ảo',
      icon: 'adb',
      subItems: [
        {
          label: 'Câu hỏi',
          icon: 'question_answer',
          routerLink: '/quan-tri-vien/danh-sach-cau-hoi'
        },
        {
          label: 'Phản hồi',
          icon: 'feedback',
          routerLink: '/quan-tri-vien/danh-sach-phan-hoi'
        },
        {
          label: 'Biểu đồ chat',
          icon: 'show_chart',
          routerLink: '/quan-tri-vien/bieu-do-chat'
        }
      ]
    },
    {
      label: 'Hoạt động',
      icon: 'event_note',
      subItems: [
        {
          label: 'Loại hoạt động',
          icon: 'folder_special',
          routerLink: '/quan-tri-vien/loai-hoat-dong'
        },
        {
          label: 'Hoạt động',
          icon: 'local_activity',
          routerLink: '/quan-tri-vien/danh-sach-hoat-dong'
        },

        {
          label: 'Phê duyệt',
          icon: 'dns',
          routerLink: '/quan-tri-vien/quan-ly-dang-ky-hoat-dong'
        },
        {
          label: 'Ngoài trường',
          icon: 'local_activity',
          routerLink: '/quan-tri-vien/hoat-dong-ngoai-truong'
        },
        {
          label: 'Lịch',
          icon: 'today',
          routerLink: '/quan-tri-vien/lich'
        },
        {
          label: 'Xuất dữ liệu',
          icon: 'cloud_upload',
          routerLink: '/quan-tri-vien/xuat-du-lieu'
        },


      ]
    },
    {
      label: 'Hệ thống',
      icon: 'settings',
      subItems: [
        // {
        //   label: 'Trường',
        //   icon: 'local_activity',
        //   routerLink: '/quan-tri-vien/truong'
        // },
        {
          label: 'Khoa',
          icon: 'view_column',
          routerLink: '/quan-tri-vien/khoa'
        },
        {
          label: 'Chức danh',
          icon: 'work',
          routerLink: '/quan-tri-vien/chuc-danh'
        },
      ]
    }
  ];

  selectedLink: string = '';
  activeMenuIndex: number | null = null;

  setActiveLink(link: string, index: number) {
    this.selectedLink = link;
    this.activeMenuIndex = index;
  }

  toggleSubMenu(index: number) {
    if (this.activeMenuIndex === index) {
      this.activeMenuIndex = null;
    } else {
      this.activeMenuIndex = index;
    }
  }
}
