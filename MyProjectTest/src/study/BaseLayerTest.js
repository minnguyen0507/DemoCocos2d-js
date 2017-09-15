/**
 * Created by Admin on 17/8/2017.
 */
var BaseLayerTest = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init : function(){
        var size = cc.winSize;

        var spriteTest = new cc.Sprite(res.btn_next);
        this.addChild(spriteTest,1);
        spriteTest.setPosition(size.width/2, size.height/2);
        spriteTest.setAnchorPoint(0.5, 0.5);
    },

    callFunction : function () {
       //Xu li gi o day cung duoc
       // tạo hàm, đầu hàm phải là động từ
    },
    touchEvent : function (sender,  type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                break;
        }
    }
});