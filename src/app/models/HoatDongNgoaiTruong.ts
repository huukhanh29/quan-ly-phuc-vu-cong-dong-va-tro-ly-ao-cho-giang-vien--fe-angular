import { GiangVien } from "./GiangVien";

export interface HoatDongNgoaiTruong {
  maHoatDongNgoaiTruong: number;
  giangVien: GiangVien;
  tenHoatDong: string;
  banToChuc: string;
  moTa: string;
  diaDiem: string;
  gioTichLuyThamGia: number;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  fileMinhChung: string;
  trangThai: TrangThai;
  ngayTao: Date;
  ngayCapNhat: Date;
}

export enum TrangThai {
  ChuaDuyet = 'Chua_Duyet',
  DaDuyet = 'Da_Duyet'
}
