var GameLiengLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init: function () {

        ZLog.error("init game lieng");
    },

    _initProgressBar: function () {

        var testProgressTimer = new cc.ProgressTimer(new cc.Sprite(res.box_my_avatar));
        testProgressTimer.setType(cc.ProgressTimer.TYPE_RADIAL); //quay dạng vòng tròn
        testProgressTimer.setBarChangeRate(cc.p(0.01, 0.01));
        testProgressTimer.setReverseDirection(true); //set quay ngược
        testProgressTimer.setPercentage(100); //set giá trị = 100%
        testProgressTimer.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(testProgressTimer, 1);

        var to1 = cc.progressTo(3, 0); //trong vòng 5s chạy từ 100-> 0

        var remainingTime = 10;
        var maxTurnTime = 3;

        var  actionProgress =cc.sequence(
            cc.spawn(
                cc.progressTo(remainingTime, 0),
                cc.tintTo(remainingTime, 255, 0, 0),
                cc.sequence(
                    cc.delayTime(remainingTime - Math.min(maxTurnTime * 0.3, remainingTime)),
                    cc.callFunc(function(){
                        ZLog.error("do somethingxxxx...");
                        // Audio.playEffectByLanguage(res.wth_slow);
                        // Audio.playEffect(res.clocktable, true);
                        // Vibrator.vibrateDevice(1000);
                    }),
                    cc.blink(Math.min(maxTurnTime * 0.3, remainingTime), Math.ceil(maxTurnTime * 0.3 / 0.4))
                )
            ),
            cc.callFunc(function(sender){
                ZLog.error("do something...");
                testProgressTimer.setColor(cc.color(0,255,0));
                testProgressTimer.setPercentage(100); //set giá trị = 100%
            })
        );
        testProgressTimer.runAction(cc.repeatForever(actionProgress));
    },
});

var GameLiengScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLiengLayer();
        this.addChild(layer);
    }
});

