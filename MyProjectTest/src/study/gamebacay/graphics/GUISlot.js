
var GUISlot = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.lbGold = null;
        this.lbName = null;
        this.iconAvatar = null;
        this.imgAvatar = null;
        this.btnKeCua = null;
        this.btnDanhBien = null;
        this.nodeKeCuaDanhBien = null;
        this.init();

    },
    init: function () {
        var size = cc.winSize;
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_slot_table, this);

        ZLog.error("Finish Slots");
    },

    testLabelDiemAndGold : function (slotUIIdx) {
        var layout = new ccui.Layout();
        layout.setLayoutType(ccui.Layout.DIR_VERTICAL);
        layout.setContentSize(80,60);
        layout.setAnchorPoint(0.5,0.5);
        this.addChild(layout, 1);

        switch(slotUIIdx) {
            case POS.ISME:
                layout.setPosition(0,110);
                break;
            case POS.PLAYER1:
            case POS.PLAYER2:
            case POS.PLAYER3:
                layout.setPosition(-100,10);
                break;
            case POS.PLAYER4:
            case POS.PLAYER5:
                layout.setPosition(100,10);
                break;
            case POS.PLAYER6:
            case POS.PLAYER7:
            case POS.PLAYER8:
                layout.setPosition(100,10);
                break;
        }
        var labelDiem = new cc.LabelTTF("1 Diem", "Arial", 20);
        labelDiem.setPosition(45,45);
        layout.addChild(labelDiem,1);

        var labelGoldWin =  new cc.LabelTTF("+200K", "Arial", 20);
        labelGoldWin.setPosition(45, 20);
        layout.addChild(labelGoldWin, 2);


    },

    testLabelWinLose : function (slotUIIdx, result) {
        var spWinLose = new cc.Sprite();
        spWinLose.setPosition(0, -68);
        spWinLose.setLocalZOrder(3);
        this.addChild(spWinLose, 3);
        if(result == 1){ //1 = thang
            spWinLose.setTexture(res.icon_thang);
        }
        else
            spWinLose.setTexture(res.icon_thua);

    },
    
    testIconAndLabel: function (slotUIIdx) {
        var layout = new ccui.Layout();
        layout.setLayoutType(ccui.Layout.DIR_VERTICAL);
        layout.setContentSize(100,30);
        layout.setAnchorPoint(0.5,0.5);
        this.addChild(layout, 1);

        switch(slotUIIdx) {
            case POS.ISME:
                layout.setPosition(0,80);
                break;
            case POS.PLAYER1:
            case POS.PLAYER2:
            case POS.PLAYER3:
                layout.setPosition(70,50);
                break;
            case POS.PLAYER4:
            case POS.PLAYER5:
                layout.setPosition(0,-80);
                break;
            case POS.PLAYER6:
            case POS.PLAYER7:
            case POS.PLAYER8:
                layout.setPosition(-70,50);
                break;
        }
            var iconCoin = new cc.Sprite(res.icon_coin);
            iconCoin.setPosition(layout.getContentSize().width/2 - 30, layout.getContentSize().height/2);
            layout.addChild(iconCoin,1);

            var labelGold = new cc.LabelTTF("$2", "Arial", 20);
            labelGold.setPosition(iconCoin.getPositionX()+ 30, iconCoin.getPositionY());
            layout.addChild(labelGold, 2);

    },

    testKeCuaDanhBien: function (slotUIIdx) {
        this.nodeKeCuaDanhBien = new ccui.Layout();
        this.nodeKeCuaDanhBien.setLayoutType(ccui.Layout.DIR_VERTICAL);
        this.nodeKeCuaDanhBien.setContentSize(100,60);
        this.nodeKeCuaDanhBien.setAnchorPoint(0.5,0.5);
        this.addChild(this.nodeKeCuaDanhBien, 1);

        switch(slotUIIdx) {
            case POS.ISME:
                this.nodeKeCuaDanhBien.setPosition(-100,30);
                break;
            case POS.PLAYER1:
            case POS.PLAYER2:
            case POS.PLAYER3:
                this.nodeKeCuaDanhBien.setPosition(-100,30);
                break;
            case POS.PLAYER4:
            case POS.PLAYER5:
                this.nodeKeCuaDanhBien.setPosition(100,30);
                break;
            case POS.PLAYER6:
            case POS.PLAYER7:
            case POS.PLAYER8:
                this.nodeKeCuaDanhBien.setPosition(100,30);
                break;
        }

            this.btnKeCua = new ccui.Button(res.btn_ke_cua, res.btn_ke_cua, res.btn_ke_cua);
            this.btnKeCua.setPosition(this.nodeKeCuaDanhBien.getContentSize().width/2 , this.nodeKeCuaDanhBien.getContentSize().height/2 + 20);
            this.btnKeCua.setTitleText("Ke Cua");
            this.btnKeCua.addTouchEventListener(this._onTouchUIEvent, this);
            this.btnKeCua.setPressedActionEnabled(true);
            this.nodeKeCuaDanhBien.addChild(this.btnKeCua,1);

            this.btnDanhBien = new ccui.Button(res.btn_ke_cua, res.btn_ke_cua, res.btn_ke_cua);
            this.btnDanhBien.setPosition(this.btnKeCua.getPositionX(), this.btnKeCua.getPositionY() - 30);
            this.btnDanhBien.setTitleText("Dat Bien");
            this.btnDanhBien.addTouchEventListener(this._onTouchUIEvent, this);
            this.btnDanhBien.setPressedActionEnabled(true);
            this.nodeKeCuaDanhBien.addChild(this.btnDanhBien,1);

    },
    setMaxMin: function (max, min, tableId) {
        this.maxGold = max;
        this.minGold = min;
        this.tableId = tableId;
    },

    setStructureId: function (structureId) {
        this.structureId = structureId;
    },

    setIsMe: function (b) {
        this._isMe = b;
        if(b){
            this.img_bg.setSpriteFrame(res.box_avatar2);
            this.lbMoney.setColor(cc.color(136,62,23));
            this.lbPlayerName.setColor(cc.color(136,62,23));
        }
        else{
            this.img_bg.setSpriteFrame(res.box_avatar1);
            this.lbMoney.setColor(cc.color(255,165,0));
            this.lbPlayerName.setColor(cc.color(255,165,0));
        }
    },

    setIsBoss: function (b) {
        this._isBoss = b;
        this.img_chuong.setVisible(b);
    },

    setVip: function (b) {
        this._vip = b;
        if(b < 1)
            this.imgVIP.setVisible(false);
        else
            this.imgVIP.setSpriteFrame(res["vip_ingame_" + b]);
    },

    setGold :function (b) {
        this._money = b;
        this.lbGold.setString(Utility.formatMoney(this._money,""));
    },
    getMoney :function () {

    },
    getVip: function () {
        return this._vip;
    },

    isBoss: function () {
        return this._isBoss;
    },

    canCheck: function () {
        return this._canCheck;
    },

    setCanCheck: function (b) {
        this._canCheck = b;
    },
    setAlive: function (b) {
        this._isAlive = b;
        this._nodeUI.setVisible(b);
        this.btnInvite.setVisible(!b);

    },
    setSlotIndex: function (idx){
        this.index = idx;
    },

    getSlotIndex: function () {
        return this.index;
    },

    isMe: function () {
        return this._isMe;
    },

    isAlive: function () {
        return this._isAlive;
    },

    isSitting: function () {
        return this._isSitting;
    },

    isEmpty: function () {
        return this.status === SlotStatus.NONE;
    },

    isSpectator: function () {
        return this.status === SlotStatus.SPECTATOR;
    },



    /**
     *
     * @param dataPlayer
     */
    setPlayerInfo: function (dataPlayer) {
        ZLog.error("dataaaaaa" + JSON.stringify(dataPlayer));
        // this.playerInfo = dataPlayer;
        // this.lbName.setString(Utility.displayName(dataPlayer.uName, 7));
        // this.index = dataPlayer.slotIdx;
        // this.setStatus(dataPlayer.status);
        // this.setVip(dataPlayer.vipLevel);
        // this.setGold(dataPlayer.gold);
        // this.avatar.setSprite(dataPlayer.defaultAvatar);

        this.lbName.setString(dataPlayer.uName);
        this.setGold(dataPlayer.gold);
        this.index = dataPlayer.slotIdx;

    },

    getPlayerInfo: function () {
        return this.playerInfo;
    },

    getStatus: function () {
        return this.status;
    },

    setStatus: function (s) {
        this.status = s;
        this._isAlive = true;

        switch (this.status) {
            case SlotStatus.NONE:
            case SlotStatus.SPECTATOR:
                this._isAlive = false;
                this.setVisibleInviting(false);
                break;
            case SlotStatus.SITTING:
                this._isSitting = true;
                this.setVisibleInviting(true);
                break;
            default:
                break;
        }

    },

    cleanUpStatus: function () {
        this.index = -1;
        this.setStatus(SlotStatus.NONE);
        this.playerInfo = null;
        this._isMe = false;
        if (this._imgEmo) {
            this._imgEmo.setVisible(false);
        }
        this._nodeUI.setVisible(false);
        this.btnInvite.setVisible(true);
    },

    /**
     *
     * @returns {boolean}
     */

    switchToPlayer: function () {
        this.setStatus(SlotStatus.SITTING);
        this._nodeUI.runAction(cc.fadeTo(0.3, FoldOpacity));
    },

    switchToSpectator: function () {
        this.setStatus(SlotStatus.SPECTATOR);
        this.fade();
    },

    fade: function(){
        this._nodeUI.setVisible(true);
        this._nodeUI.setOpacity(FoldOpacity);
        if(this.avatar){
            this.avatar.getListener().setEnabled(true);
        }
    },

    leaveTable: function () {
        this.setStatus(SlotStatus.NONE);
        this.hide();
        // TODO send leave table
    },

    isVisibleInviting: function () {
        return this.btnInvite.isVisible();
    },

    setVisibleInviting: function (b) {
        this.btnInvite.setVisible(b);
        if (!b) {
            Tooltip.hide();
        }

        if (this.isMe()) {
            this.btnInvite.setVisible(false);
        }
        if (this._nodeUI.isVisible()) {
            this.btnInvite.setVisible(false);
        }
    },

    sitDown: function () {
        this.setStatus(SlotStatus.SITTING);
        this.btnInvite.setVisible(false);
        this._nodeUI.setOpacity(255);
    },

    addEmoticon: function (emoName) {
        if (emoName && emoName.length > 0 && isEmoticon(emoName)) {
            if (this._imgEmo === null) {
                this._imgEmo = new Emoticon(emoName);
                this._imgEmo.setPosition(0, 0);
                this.addChild(this._imgEmo, 1);

                if (!this.isMe()) {
                    this._imgEmo.setScale(0.78);
                }
            }
            else {
                this._imgEmo.stop();
                this._imgEmo.changeEmo(emoName);
                this._imgEmo.setPosition(0, 0);
                this._imgEmo.setVisible(true);
                this._imgEmo.setOpacity(255);
            }

            this._imgEmo.start();
        }
        else {
            ZLog.error("emoticon not found - %s", emoName);
        }
    },




    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this.btnKeCua:
                ZLog.error("Ke cua");
                var sceneTest = this.getParent();
                sceneTest._showDatCuoc(2);
                break;
            case this.btnDanhBien:
                ZLog.error("Danh bien");
                break;

        }
    },
});