export interface TaiKhoan {
  maTaiKhoan: number;
  tenDangNhap: string;
  email: string;
  quyen: string;
  tenDayDu: string;
  soDienThoai: string | null;
  ngaySinh: string | null;
  gioiTinh: string;
  diaChi: string | null;
  trangthai: string;
  ngayTao: string;
  ngayCapNhat: string;
  anhdaidien: string;
}

export interface ThongTinSinhVien {
  maTaiKhoan: number;
  namNhapHoc: string;
  taiKhoan: TaiKhoan;
}
