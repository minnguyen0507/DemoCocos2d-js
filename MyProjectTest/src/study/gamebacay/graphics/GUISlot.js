
var GUISlot = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.lbGold = null;
        this.lbName = null;
        this.iconAvatar = null;
        
        this.init();

    },
    init: function () {
        var size = cc.winSize;
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_slot_table, this);


        ZLog.error("Finish Slots");
    },



});