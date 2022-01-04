/**
 * Tạo class danh sách nhân viên
 */
function DanhSachNV() {
    this.mangNV = [];
    this.themNV = function (nv) {
        this.mangNV.push(nv)
    }
    this.timVitri = function(tk){
        var viTri = -1;
        this.mangNV.map(function(nv,index){
            if(nv.taiKhoan === tk){
                viTri = index;
            }
        });
        return viTri;
    };
    this.xoaNV = function(tk){
        var viTri = this.timVitri(tk);
        if(viTri != -1){
            this.mangNV.splice(viTri,1)
        }else{
            alert("không tìm thấy")
        }
    };
    this.capNhatNV = function(nv){
        var viTri = this.timVitri(nv.taiKhoan);
        if(viTri != -1){
            this.mangNV[viTri] = nv;
        }
    }
    this.searchLoaiNV = function(loaiNV){
        var keyword = loaiNV.trim().toLowerCase();
        var mangTK = [];
        
        this.mangNV.map(function(nv){
            var xepLoaiNV = nv.xepLoai.toLowerCase();
            var indexNV = xepLoaiNV.indexOf(keyword);
            if(indexNV > -1){
                mangTK.push(nv);
            }
        });
        return mangTK;
    }
}