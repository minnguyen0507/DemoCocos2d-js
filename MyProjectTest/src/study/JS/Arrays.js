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


        var _function = this._concat();

        ZLog.error("finish Arrays------------ result :" + JSON.stringify(_function) );
    },

    //TODO  hàm concat: trả về một mảng mới kết hợp 2 mảng lại với nhau
    _concat: function () {
        var alpha = ["a", "b", "c"];
        var number = ["1", "2" , "3"];

        var alphaNumber = alpha.concat(number);
        return alphaNumber;

    },

    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");

                break;

        }
    }

});