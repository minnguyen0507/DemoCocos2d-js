var SlotMauBinh = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.imgAvatar = null;
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