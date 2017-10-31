
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


    testLabelWinLose : function (slotUIIdx) {
        var playerDiem = new cc.LabelTTF("WIN", "Arial", 30);
        playerDiem.setPosition(0, -50);
        playerDiem.setLocalZOrder(3);
        this.addChild(playerDiem, 3);

        ZLog.error("Finish Lose and Win");
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
                this.nodeKeCuaDanhBien.setPosition(-100,30);
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