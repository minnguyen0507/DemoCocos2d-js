var GUITest = AdminBaseGUI.extend({
    _className: "GUITest",

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

        this.lbTimerStart.setString("99");
        this.alignCenter();
    },

    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");

                break;

        }
    }

});