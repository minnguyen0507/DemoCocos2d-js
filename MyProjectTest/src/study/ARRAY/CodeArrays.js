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
       this.sapXepMangTangDan();

    },

    findNumberAsc: function () {
        var min = this.listArrays[0];

        for(var i = 0 ; i < this.listArrays.length; i++){
            if(min > this.listArrays[i])
                min = this.listArrays[i];
        }

        ZLog.error("So nho nhat trong mang", min);

    },

    findNumberDesc: function () {
        var max = this.listArrays[0];

        for(var i = 0 ; i < this.listArrays.length; i++){
            if(max < this.listArrays[i])
                max = this.listArrays[i];
        }

        ZLog.error("So lon nhat trong mang", max);
    },

    tongCacPhanTuTrongMang: function () {
        var sum = 0;
        for(var i = 0 ; i < this.listArrays.length; i++){
            sum += this.listArrays[i];
        }
        ZLog.error("SUm ==== " + sum);
    },

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

    hoan_Vi: function (x, y) {
        var temp = x;
        x = y;
        y = temp;
    },

    
    onTouchUIEndEvent: function(sender){
        switch (sender) {

        }
    }

});