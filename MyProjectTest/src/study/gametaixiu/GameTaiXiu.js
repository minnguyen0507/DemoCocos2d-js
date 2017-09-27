/**
 * Created by Admin on 3/9/2017.
 */

var timer = 40;
var GameTaiXiuLayer = AdminBaseGUI.extend({
    ctor: function() {
        this._super();
        this.btnClose = null;
        this.lbTimerStart = null;

        this.init();
    },
    init: function() {
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_mini_game_taixiu, this);
        //this.showCountDownStart(timer);

        this.scheduleUpdate();

        this.alignCenter();
    },

    showGameInfo: function (type) {
        switch (type){
            case TXConst.START:
                break;
            case TXConst.INFO:
                break;
            case TXConst.CANBANG:
                break;
            case TXConst.ENDGAME:
                break;
            case TXConst.PRESTART:
                break;
            default:
                break;
        }
    },

    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");
                break;
            default:
                break;
        }
    },
    update : function (dt) {
        //timer--;
        timer -= dt ; // or timer = timer -dt;
        ZLog.error("timer::", parseInt(timer));

        if (timer <= 40){
            this.lbTimerStart.setString(parseInt(timer));
        }
        else if (timer == 0){
            timer = 40;

        }
    },
    stopUpdate : function () {
    this.unscheduleUpdate();
    }
});

TXConst = {
    START: 0,
    INFO: 1,
    CANBANG: 2,
    ENDGAME: 3,
    PRESTART: 4,
}