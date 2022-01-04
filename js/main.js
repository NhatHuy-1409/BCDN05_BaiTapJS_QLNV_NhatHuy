//Global
var dsnv = new DanhSachNV();
var validation = new Validation();
getLocalStorage();
function getEle(id) {
    return document.getElementById(id);
}

//Check validation
function checkValidation(hten, mail, mKhau, ngLam, luong, gioLam) {
    var isValid = true;

    //Check tên rỗng, không đúng định dạng
    isValid &= validation.checkEmpty(hten, "tbTen", "Hãy nhập tên của bạn") && validation.checkName(hten, "tbTen", "Tên chỉ chứa ký tự chữ ");
    //Check mail rỗng, không đúng định dạng
    isValid &= validation.checkEmpty(mail, "tbEmail", "Hãy nhập mail của bạn") && validation.checkMail(mail, "tbEmail", "Mail nhập sai định dạng");
    //Check mật khẩu rỗng, không đúng định dạng
    isValid &= validation.checkEmpty(mKhau, "tbMatKhau", "Hãy nhập mật khẩu của bạn") && validation.checkPass(mKhau, "tbMatKhau", "Mật khẩu từ 6-10 ký tự gồm chữ, số, ký tự in hoa và ký tự đặc biệt");
    //Check ngày làm rỗng, không đúng định dạng
    isValid &= validation.checkEmpty(ngLam, "tbNgay", "Hãy nhập ngày làm của bạn") && validation.checkDate(ngLam, "tbNgay", "Vui lòng nhập đúng theo định dạng dd/mm/yyyy");
    //Check lương rỗng, giá trị nhập từ 1000000 đến 20000000
    isValid &= validation.checkEmpty(luong, "tbLuongCB", "Hãy nhập lương cơ bản của bạn") && validation.checkLuong(luong, "tbLuongCB", "Lương nhập từ 1.000.000 đến 20.000.000");
    //Check chọn chức vụ
    isValid &= validation.checkChucVu("chucvu", "tbChucVu", "Bạn chưa chọn chức vụ");
    //Check giờ làm rỗng, giá trị nhập từ 80-200
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "Hãy nhập số giờ làm của bạn") && validation.checkGioLam(gioLam, "tbGiolam", "Giờ làm nhập từ 80-200");
    return isValid;
}
//Thêm nhân viên
function themNhanVien() {
    var tkhoan = getEle("tknv").value;
    var hten = getEle("name").value;
    var mail = getEle("email").value;
    var mKhau = getEle("password").value;
    var ngLam = getEle("datepicker").value;
    var luong = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;


    var isValid = checkValidation(hten, mail, mKhau, ngLam, luong, gioLam);
    //Check tài khoản rỗng, tài khoản trùng
    isValid &= validation.checkEmpty(tkhoan, "tbTKNV", "Hãy nhập tài khoản của bạn") && validation.checkTK(tkhoan, "tbTKNV", "Tài khoản này đã được sử dụng", dsnv.mangNV);
    if (isValid) {
        var nv = new NhanVien(tkhoan, hten, mail, mKhau, ngLam, luong, chucVu, gioLam);
        dsnv.themNV(nv);
        nv.tongLuong();
        nv.xepLoai();
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    };
}

function hienThiTable(mangNV) {
    var content = "";
    mangNV.map(function (nv, index) {
        var tr = `
        <tr>
            <th>${nv.taiKhoan}</th>
            <th>${nv.hoTen}</th>
		    <th>${nv.email}</th>
		    <th>${nv.ngayLam}</th>									
		    <th>${nv.chucVu}</th>
		    <th>${nv.tongLuong}</th>
		    <th>${nv.xepLoai}</th>
		    <th>
            <i title="Xóa NV" onclick="xoaNhanVien('${nv.taiKhoan}')" class="fa fa-trash mr-3"></i>
            <i title="Xem chi tiết" onclick="xemNhanVien('${nv.taiKhoan}')" class="fa fa-eye"></i>
            </th>
        </tr>
        `;
        content += tr;
    });
    getEle("tableDanhSach").innerHTML = content;
}

// Set Local storeage
function setLocalStorage(mangNV) {
    localStorage.setItem("DSNV", JSON.stringify(mangNV));
}
// Get Local storage
function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mangNV);
    }
}

//Xóa Nhân viên
function xoaNhanVien(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    hienThiTable(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

//Xem nhân viên
function xemNhanVien(taiKhoan) {
    var viTri = dsnv.timVitri(taiKhoan);
    if (viTri != -1) {
        nv = dsnv.mangNV[viTri];
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
}

//Cập nhật nhân viên
function capNhatNV() {
    var tkhoan = getEle("tknv").value;
    var hten = getEle("name").value;
    var mail = getEle("email").value;
    var mKhau = getEle("password").value;
    var ngLam = getEle("datepicker").value;
    var luong = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    var isValid = checkValidation(hten, mail, mKhau, ngLam, luong, gioLam);
    //Check tài khoản rỗng
    isValid &= validation.checkEmpty(tkhoan, "tbTKNV", "Hãy nhập tài khoản của bạn") ;
    if (isValid) {
        var nv = new NhanVien(tkhoan, hten, mail, mKhau, ngLam, luong, chucVu, gioLam);
        nv.tongLuong();
        nv.xepLoai();
        dsnv.capNhatNV(nv);
        hienThiTable(dsnv.mangNV);
        setLocalStorage(dsnv.mangNV);
    }
}

//Reser form
function resetForm() {
    getEle("formQLNV").reset();
    getEle("tknv").disabled = false;

}
//Tìm kiếm theo loại nhân viên
function searchLoaiNV() {
    var keyWord = document.getElementById("searchName").value;
    hienThiTable(dsnv.searchLoaiNV(keyWord));

}
document.getElementById("searchName").onkeyup = searchLoaiNV;