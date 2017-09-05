/**
 * Created by Admin on 3/9/2017.
 */
var timer = 41;
var labelTimer;
var GameTaiXiuLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

        var bg = new cc.Sprite(res.bg_test);
        this.addChild(bg, 0);
        bg.setAnchorPoint(0.5,0.5);
        bg.setPosition(size.width/2, size.height/2);

        labelTimer = new cc.LabelTTF("Timer: " + timer, "Arial", 40 );
        bg.addChild(labelTimer, 1);
        labelTimer.setAnchorPoint(0.5, 0.5);
        labelTimer.setPosition(size.width/2, size.height/2);
        this.scheduleUpdate();
        ZLog.error("Scene Tai Xiu nhe");
        return true;
    },
    update : function (dt) {
        //timer--;
        timer -= dt ; // or timer = timer -dt;
        ZLog.error("timer::", parseInt(timer));
        labelTimer.setString("Timer: " + parseInt(timer));
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

