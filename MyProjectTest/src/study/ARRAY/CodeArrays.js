var CodeArrays = AdminBaseGUI.extend({
    _className: "CodeArrays",

    ctor: function() {
        this.listArrays = [2,6,8,4,9];
        this.init();

    },
    init: function() {
      // this.findNumberAsc();
    //   this.findNumberDesc();
      // this.sapXepMangTangDan();
       ///this.tongCacPhanTuTrongMang();
       //this.sapXepMangTangDan();
       //this.themPhanTuVaoMang(333,4);
       this.xoaPhanTuTrongMang(3);

    },
    //Hàm tìm số nhỏ nhất trong mảng
    findNumberMinArray: function () {
        var min = this.listArrays[0];

        for(var i = 0 ; i < this.listArrays.length; i++){
            if(min > this.listArrays[i])
                min = this.listArrays[i];
        }

        ZLog.error("So nho nhat trong mang", min);

    },

    //Hàm tìm số lớn nhất trong Mảng
    findNumberMaxArray: function () {
        var max = this.listArrays[0];

        for(var i = 0 ; i < this.listArrays.length; i++){
            if(max < this.listArrays[i])
                max = this.listArrays[i];
        }

        ZLog.error("So lon nhat trong mang", max);
    },

    //Hàm tính tổng các số trong mảng
    tongCacPhanTuTrongMang: function () {
        var sum = 0;
        for(var i = 0 ; i < this.listArrays.length; i++){
            sum += this.listArrays[i];
        }
        ZLog.error("SUm ==== " + sum);
    },

    //Xoá 1 phần tử trong mảng
    xoaMotPhanTuBatKy: function (number) {
        var _testNumber = number;
        for(var i = 0 ; i < this.listArrays.length; i++){
            if(_testNumber == this.listArrays[i]){
                this.listArrays.splice(i,1);
            }
        }
        ZLog.error("So can xoa ==== " + _testNumber);
        for(var i = 0 ; i < this.listArrays.length; i++){
            ZLog.error("Mang sau khi Xoa " + JSON.stringify(this.listArrays));
        }
    },

    //Hàm sắp xếp mảng tăng dần theo giải thuật đổi chỗ
    sapXepMangTangDan: function () {
        for(var i = 0 ; i < this.listArrays.length; i ++){
            for (var j = i + 1; j < this.listArrays.length; j++){
                if(this.listArrays[i] > this.listArrays[j]){
                  this.hoan_Vi(this.listArrays[i],this.listArrays[j]);
                }
            }
        }
        for(var i = 0 ; i < this.listArrays.length; i ++){
            ZLog.error("Mang sau khi sap xep" + JSON.stringify(this.listArrays));
        }

    },

    //Hàm đổi chỗ 2 phần tử cho nhau
    hoan_Vi: function (x, y) {
        var temp = x;
        x = y;
        y = temp;
    },

    //Hàm Thêm phần tử ở vị trí bất kỳ
    themPhanTuVaoMang: function (number, vitri) {
        for(var i = this.listArrays.length -1; i >= vitri; i--){
            this.listArrays[i + 1] = this.listArrays[i];
        }
        this.listArrays[vitri] = number; // gắn vị trí trong mảng = số cần thêm
        //this.listArrays.length ++;

        for(var i = 0; i< this.listArrays.length; i++){
            ZLog.error("Mang sau khi them" + JSON.stringify(this.listArrays));
        }
    },
    
    //Hàm xoá phần tử ở vị trí bất kỳ
    xoaPhanTuTrongMang: function (vitri) {
        for(var i = vitri + 1; i < this.listArrays.length; i++){
            this.listArrays[i - 1] = this.listArrays[i];
        }

        this.listArrays.length --;

        for(var i = 0; i< this.listArrays.length; i++){
            ZLog.error("Mang sau khi XOA" + JSON.stringify(this.listArrays));
        }
    },


    onTouchUIEndEvent: function(sender){
        switch (sender) {

        }
    }

});