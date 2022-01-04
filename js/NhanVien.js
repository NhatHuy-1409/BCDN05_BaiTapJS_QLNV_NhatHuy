/**
 * Tạo class Nhân viên
 */

function NhanVien(tkhoan, hten, mail, mKhau, ngLam, luong, chucVu, gioLam) {
    this.taiKhoan = tkhoan;
    this.hoTen = hten;
    this.email = mail;
    this.matKhau = mKhau;
    this.ngayLam = ngLam;
    this.luongCB = luong;
    this.chucVu = chucVu;
    this.gioLam = gioLam;

    this.tongLuong = function () {
        switch (this.chucVu) {
            //xem return được ko ?
            case "Sếp": this.tongLuong = this.luongCB * 3;
                break;
            case "Trưởng phòng": this.tongLuong = this.luongCB * 2;
                break;
            case "Nhân viên": this.tongLuong = this.luongCB;
                break;
            default: this.tongLuong = 0;
        }
    };
    this.xepLoai = function () {
        if (0 < this.gioLam && this.gioLam < 160) {
            return this.xepLoai = "Trung bình";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            return this.xepLoai = "Khá";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            return this.xepLoai = "Giỏi";
        } else if (this.gioLam >= 192) {
            return this.xepLoai = "Xuất sắc";
        } else {
            return this.xepLoai = "Không xếp loại";
        }
    }
}