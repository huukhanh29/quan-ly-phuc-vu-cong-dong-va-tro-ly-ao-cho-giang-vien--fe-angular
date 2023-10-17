import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HoatDongService } from 'src/app/services/hoat-dong.service';
import { TaiKhoanService } from 'src/app/services/tai-khoan.service';
import { Observable, map, startWith } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
})
export class AddActivityComponent implements OnInit {
  availableLoaiHoatDong: any[] = [];
  availableGiangVien: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  maGiangVienCtrl = new FormControl('');
  filteredGiangVien!: Observable<any[]>;
  selectedGiangVien: any[] = [];
  public isEditing: boolean = false;

  @ViewChild('maGiangVienInput')
  maGiangVienInput!: ElementRef<HTMLInputElement>;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      activity: any;
      isEditing: boolean; // Thêm trường isEditing
    },
    private dialogRef: MatDialogRef<AddActivityComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private hoatDongService: HoatDongService,
    private taiKhoanService: TaiKhoanService
  ) {}

  get formControls() {
    return this.myForm.controls;
  }

  ngOnInit(): void {
    this.loadLoaiHoatDong();
    this.loadGiangVien();
    console.log(this.data);

    if (this.data.isEditing) {
      // Check for editing flag
      this.isEditing = true;
      this.myForm.patchValue(this.data.activity);
      this.myForm.patchValue({
        ...this.data.activity,
        maLoaiHoatDong: this.data.activity.loaiHoatDong.maLoaiHoatDong,
      });
      this.availableGiangVien.push(
        ...this.data.activity.giangVienToChucs.map(
          (gv: { taiKhoan: any }) => gv.taiKhoan
        )
      );
      this.selectedGiangVien.push(
        ...this.data.activity.giangVienToChucs.map(
          (gv: { taiKhoan: any }) => gv.taiKhoan
        )
      );
      this.updateAvailableGiangVien();
    }

    this.filteredGiangVien = this.maGiangVienCtrl.valueChanges.pipe(
      startWith(null),
      map((tenDangNhap: string | null) =>
        tenDangNhap
          ? this._filter(tenDangNhap)
          : this.availableGiangVien.slice()
      )
    );
  }

  loadGiangVien() {
    this.taiKhoanService.getAllGiangVien().subscribe((data) => {
      this.availableGiangVien = data.map((gv) => gv.taiKhoan); // Lấy object taiKhoan
    });
  }
  // Được gọi sau khi selectedGiangVien thay đổi
  updateAvailableGiangVien() {
    const selectedGiangVienIds = this.selectedGiangVien.map(
      (gv) => gv.maTaiKhoan
    ); // Lấy các maTaiKhoan từ selectedGiangVien
    this.availableGiangVien = this.availableGiangVien.filter(
      (gv) => !selectedGiangVienIds.includes(gv.maTaiKhoan)
    ); // Loại bỏ các giảng viên đã được chọn khỏi availableGiangVien
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const gv = this.availableGiangVien.find((g) => g.tenDangNhap === value);
      if (gv) this.selectedGiangVien.push(gv);
    }
    event.chipInput!.clear();
    this.maGiangVienCtrl.setValue(null);
    this.updateAvailableGiangVien(); // Cập nhật availableGiangVien
  }

  remove(giangVien: any): void {
    const index = this.selectedGiangVien.indexOf(giangVien);
    if (index >= 0) this.selectedGiangVien.splice(index, 1);
    this.updateAvailableGiangVien(); // Cập nhật availableGiangVien
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const gv = this.availableGiangVien.find((g) => g.tenDangNhap === value);
    if (gv) this.selectedGiangVien.push(gv);
    this.maGiangVienInput.nativeElement.value = '';
    this.maGiangVienCtrl.setValue(null);
    this.updateAvailableGiangVien(); // Cập nhật availableGiangVien
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.availableGiangVien.filter((giangVien) =>
      giangVien.tenDangNhap.toLowerCase().includes(filterValue)
    );
  }

  closePopup(event: Event): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
    this.dialogRef.close('Closed');
  }

  loadLoaiHoatDong() {
    this.hoatDongService.getAllLoaiHoatDong().subscribe((data) => {
      this.availableLoaiHoatDong = data;
    });
  }
  myForm = this.formBuilder.group({
    tenHoatDong: ['', [Validators.required]],
    moTa: ['', [Validators.required]],
    diaDiem: ['', [Validators.required]],
    gioTichLuyThamGia: ['', [Validators.required]],
    gioTichLuyToChuc: ['', [Validators.required]],
    thoiGianBatDau: ['', [Validators.required]],
    thoiGianKetThuc: ['', [Validators.required]],
    tenQuyetDinh: ['', [Validators.required]],
    soQuyetDinh: ['', [Validators.required]],
    nguoiKyQuyetDinh: ['', [Validators.required]],
    fileQuyetDinh: ['', [Validators.required]],
    capToChuc: ['', [Validators.required]],
    maLoaiHoatDong: [''],
    giangVienToChucs: this.formBuilder.array([]),
  });

  saveActivity() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const batDau = new Date(formData.thoiGianBatDau ?? new Date());
      const ketThuc = new Date(formData.thoiGianKetThuc ?? new Date());

      //chuyển sang giờ địa phương
      formData.thoiGianBatDau = new Date(
        batDau.getTime() - batDau.getTimezoneOffset() * 60000
      ).toISOString();
      formData.thoiGianKetThuc = new Date(
        ketThuc.getTime() - ketThuc.getTimezoneOffset() * 60000
      ).toISOString();
      formData.giangVienToChucs = this.selectedGiangVien.map(
        (g) => g.tenDangNhap
      );
      if (this.isEditing) {
        // Gọi API update nếu đang chỉnh sửa
        this.hoatDongService
          .updateHoatDong(this.data.activity.maHoatDong, formData)
          .subscribe({
            next: (data) => {
              this.dialogRef.close('Closed');
              this.toastr.success('Cập nhật hoạt động thành công!');
            },
            error: (err) => {
              this.toastr.error('Cập nhật hoạt động không thành công!');
              console.error('Error updating activity:', err);
            },
          });
      } else {
        // Gọi API thêm mới nếu không phải chỉnh sửa
        this.hoatDongService.addHoatDong(formData).subscribe({
          next: (data) => {
            this.dialogRef.close('Closed');
            this.toastr.success('Thêm hoạt động thành công!');
          },
          error: (err) => {
            this.toastr.error('Thêm hoạt động không thành công!');
            console.error('Error adding activity:', err);
          },
        });
      }
    }
  }
}
