/**
 * Created by Admin on 3/9/2017.
 */
var btnIconTX;
var timer = 41;
var labelTimer;
var GameTaiXiuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.btnClose = null;
        this.nodeTaiXiu = null;
        this.lbTimerStart = null;

        var size = cc.winSize;

        sceneConfig = ccs.load(res.node_mini_game_taixiu, "res/");
        this.nodeTaiXiu = sceneConfig.node;
        this.addChild(this.nodeTaiXiu,1);
        this.nodeTaiXiu.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        var bg = new cc.Sprite(res.bg_test);
        this.addChild(bg, 0);
        bg.setTag(999);
        bg.setAnchorPoint(0.5,0.5);
        bg.setPosition(size.width/2, size.height/2);

        btnIconTX = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        btnIconTX.setAnchorPoint(0.5 , 0.5);
        btnIconTX.setPosition( 1050, 50);
        btnIconTX.addTouchEventListener(this.touchEvent,this);
        btnIconTX.setPressedActionEnabled(true);
        this.getResource();
        bg.addChild(btnIconTX, 3);

       // this.lbTimerStart.setString("22");

        //this.scheduleUpdate();
        ZLog.error("Scene Tai Xiu nhe");

        return true;
    },

    getResource: function () {
        var bgg = this.getChildByTag(999);
        bgg.setVisible(false);
        this.lbTimerStart = this.nodeTaiXiu.getChildByName("lbTimerStart");
        this.btnClose =  this.nodeTaiXiu.getChildByName("btnClose");
        this.btnClose.addTouchEventListener(this.touchEvent,this);
        this.btnClose.setPressedActionEnabled(true);
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
                switch (sender){
                    case btnIconTX:
                        ZLog.error("btnIcon");
                        break;
                    case  this.btnClose:
                        ZLog.error("Click Close");
                        break;
                }
                break;
        }
    },
    update : function (dt) {
        //timer--;
        timer -= dt ; // or timer = timer -dt;
        ZLog.error("timer::", parseInt(timer));
        this.lbTimerStart.setString("Timer: " + parseInt(timer));
        if (timer <= 0){
            timer = 41; // quay lai thoi gian dau tien
        }
        if (timer < 31){
            ZLog.error("Start Game");
        }

        if (timer >31 && timer < 41 ){
            ZLog.error("End Game ");
        }

    },
    stopUpdate : function () {
    this.unscheduleUpdate();
    }
});

var GameTaiXiuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameTaiXiuLayer();
        this.addChild(layer);
    }
});

