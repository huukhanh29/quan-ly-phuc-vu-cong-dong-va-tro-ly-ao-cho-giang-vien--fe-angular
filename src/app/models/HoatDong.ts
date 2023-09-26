import { GiangVien } from "./GiangVien";
import { LoaiHoatDong } from "./LoaiHoatDong";

export enum CapToChuc {
  KHOA = "KHOA",
  TRUONG = "TRUONG",
  BOMON = "BOMON",
  CANHAN = "CANHAN"
}

export enum TrangThaiHoatDong {
  SAP_DIEN_RA = "SAP_DIEN_RA",
  DANG_DIEN_RA = "DANG_DIEN_RA",
  DA_DIEN_RA = "DA_DIEN_RA"
}

export interface HoatDong {
  maHoatDong: number;
  tenHoatDong: string;
  moTa: string;
  diaDiem: string;
  gioTichLuyThamGia: number;
  gioTichLuyToChuc: number;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  tenQuyetDinh: string;
  soQuyetDinh: string;
  nguoiKyQuyetDinh: string;
  fileQuyetDinh: string;
  capToChuc: CapToChuc;
  loaiHoatDong: LoaiHoatDong;
  giangVienToChucs: GiangVien[];
  ngayTao: Date;
  ngayCapNhat: Date;
  trangThaiHoatDong: TrangThaiHoatDong;
}
