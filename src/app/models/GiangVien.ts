import { ChucDanh } from "./ChucDanh";
import { TaiKhoan } from "./TaiKhoan";

export interface GiangVien {
  maTaiKhoan: number;
  chucDanh: ChucDanh;
  taiKhoan: TaiKhoan;
}
