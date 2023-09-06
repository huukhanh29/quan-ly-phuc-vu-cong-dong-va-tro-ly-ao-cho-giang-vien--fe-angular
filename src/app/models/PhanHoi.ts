import { CauHoi } from "./CauHoi";
export interface PhanHoi {
  maPhanHoi: number;
  noiDung: string;
  cauHoi: CauHoi;
  ngayTao: Date;
  ngayCapNhat: Date
}
