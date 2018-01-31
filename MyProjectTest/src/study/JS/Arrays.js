/**
 * Created by minng on 31/1/2018.
 */
var Arrays = AdminBaseGUI.extend({
    _className: "GUITest",

    ctor: function() {
        this._super();
        this.listAlpha = ["Nha", "Vo", "Con", "Oto","XeMay"];
        this.listNumber = ["1", "2", "3", "4", "5", "6"];
        this.init();
    },
    init: function() {
        this._super();

        this._every();
        //var _function = this._every();

       // ZLog.error("finish Arrays------------ result :" + JSON.stringify(_function) );
    },

    //TODO  hàm concat: trả về một mảng mới kết hợp 2 mảng lại với nhau
    _concat: function () {
        var alpha = ["a", "b", "c"];
        var number = ["1", "2" , "3"];

        var alphaNumber = alpha.concat(number);
        return alphaNumber;

    },

    //TODO: trả về true: nếu các phần tử trong list arrays > giá trị điều kiện
    _every: function () {
        var list1 = [1, 6 ,78, 8, 9];    //TODO: ko được viết dạng list1 =["1","2", "3" ] => báo lỗi undefined
        var list2 = [5, 6, 74, 6, 8];

        ZLog.error("list11111 === " + list1.every(this._checkTest), "list222222= " + list2.every(this._checkTest));
    },

    //TODO: hàm check thuộc method "every" của mảng, check xem list đó có giá trị nào > 3 ko?
    _checkTest: function (age) {
        return age >= 3;
    },

    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");

                break;

        }
    }

});