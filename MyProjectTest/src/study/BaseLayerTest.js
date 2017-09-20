/**
 * Created by Admin on 17/8/2017.
 */
var BaseLayerTest = BaseGUI.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init : function(){
        var size = cc.winSize;
        //var test = new BaseGUI();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_mini_game_taixiu, this);
        ZLog.error("Finish base");
        // var spriteTest = new cc.Sprite(res.btn_next);
        // this.addChild(spriteTest,1);
        // spriteTest.setPosition(size.width/2, size.height/2);
        // spriteTest.setAnchorPoint(0.5, 0.5);
    },

    callFunction : function () {
       //Xu li gi o day cung duoc
       // tạo hàm, đầu hàm phải là động từ
    },
});