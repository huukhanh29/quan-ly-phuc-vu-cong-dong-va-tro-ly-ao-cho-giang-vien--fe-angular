import { GiangVien } from "./GiangVien";
import { HoatDong } from "./HoatDong";

export enum TrangThaiDangKy {
  CHUA_DUYET = "Chua_Duyet",
  DA_DUYET = "Da_Duyet",
  DA_HUY = "Da_Huy"
}

export interface DangKyHoatDong {
  maDangKy: number;
  giangVien: GiangVien;
  lyDoHuy: string;
  hoatDong: HoatDong;
  trangThaiDangKy: TrangThaiDangKy;
}
