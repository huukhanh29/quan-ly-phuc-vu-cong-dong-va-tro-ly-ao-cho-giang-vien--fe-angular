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
  selectedFile: File | null = null;
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
    gioTichLuyThamGia: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$')],
    ],
    gioTichLuyToChuc: [
      '',
      [Validators.required, Validators.pattern('^[0-9]+$')],
    ],
    thoiGianBatDau: ['', [Validators.required]],
    thoiGianKetThuc: ['', [Validators.required]],
    tenQuyetDinh: ['', [Validators.required]],
    soQuyetDinh: ['', [Validators.required]],
    nguoiKyQuyetDinh: ['', [Validators.required]],
    capToChuc: ['', [Validators.required]],
    maLoaiHoatDong: [''],
    giangVienToChucs: this.formBuilder.array([]),
  });
  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const maxFileSize = 2 * 1024 * 1024; // 5 MB in bytes
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    if (file.size > maxFileSize) {
      this.toastr.warning(
        'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 2MB.'
      );
      this.selectedFile = null;
      return;
    }

    if (allowedMimeTypes.includes(file.type)) {
      this.selectedFile = file;
    } else {
      this.toastr.warning(
        'Loại tệp không hợp lệ. Vui lòng chọn tệp PDF, DOCX, JPEG, JPG hoặc PNG.'
      );
      this.selectedFile = null;
    }
  }

  saveActivity() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      const batDau = new Date(formData.thoiGianBatDau ?? new Date());
      const ketThuc = new Date(formData.thoiGianKetThuc ?? new Date());

      const now = new Date();

      if (batDau < now) {
        this.toastr.warning(
          'Thời gian bắt đầu của hoạt động không hợp lệ. Phải sau thời gian hiện tại.'
        );
        return;
      }

      if (batDau >= ketThuc) {
        this.toastr.warning(
          'Thời gian kết thúc phải sau thời gian bắt đầu của hoạt động.'
        );
        return;
      }
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
              if (this.selectedFile) {
                this.hoatDongService
                  .suaFileHoatDong(
                    this.data.activity.maHoatDong,
                    this.selectedFile!
                  )
                  .subscribe({
                    next: (fileData) => {
                      this.dialogRef.close('Closed');
                      this.toastr.success(
                        'Cập nhật hoạt động và file thành công!'
                      );
                    },
                    error: (fileError) => {
                      this.toastr.error('Có lỗi xảy ra khi lưu file.');
                    },
                  });
              } else {
                this.dialogRef.close('Closed');
                this.toastr.success('Cập nhật hoạt động thành công!');
              }
            },
            error: (err) => {
              if (err.error.message.startsWith("gv-exists")) {
                let gvExistsMessage = err.error.message.substring("gv-exists".length).trim();
                if (gvExistsMessage) {
                    this.toastr.warning(`Giảng viên đã đăng ký tham gia hoạt động: ${gvExistsMessage}`);
                }
            }
            else{
                this.toastr.error('Thêm hoạt động không thành công!');
                console.error('Error adding activity:', err);
              }
            },
          });
      } else {
        if (this.selectedFile) {
          this.hoatDongService.addHoatDong(formData).subscribe({
            next: (data) => {


              this.hoatDongService
                .suaFileHoatDong(data.maHoatDong, this.selectedFile!)
                .subscribe({
                  next: (fileData) => {
                    this.dialogRef.close('Closed');
                    this.toastr.success('Thêm hoạt động và file thành công!');
                  },
                  error: (fileError) => {
                    this.toastr.error('Có lỗi xảy ra khi lưu file.');
                  },
                });
            },
            error: (err) => {
              if(err.error.message ==="hoatdong-exist"){
                this.toastr.warning('Tên hoạt động bị trùng!');
              }else{
                this.toastr.error('Thêm hoạt động không thành công!');
                console.error('Error adding activity:', err);
              }

            },
          });
        } else {
          this.toastr.warning('Chưa chọn file');
        }
      }
    }
  }
}
