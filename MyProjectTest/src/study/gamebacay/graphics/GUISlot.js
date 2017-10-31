
var GUISlot = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.lbGold = null;
        this.lbName = null;
        this.iconAvatar = null;
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


    testLabelWinLose : function (slotUIIdx) {
        var playerDiem = new cc.LabelTTF("WIN", "Arial", 30);
        playerDiem.setPosition(0, -50);
        playerDiem.setLocalZOrder(3);
        this.addChild(playerDiem, 3);

        ZLog.error("Finish Lose and Win");
    },
    
    testIconAndLabel: function (slotUIIdx) {
        var bgLayout = new cc.Sprite(res.bgLayout);
        this.addChild(bgLayout , 1);
        //bgLayout.setPosition(0,80);
        switch(slotUIIdx) {
            case POS.ISME:
                bgLayout.setPosition(0,80);
                break;
            case POS.PLAYER1:
            case POS.PLAYER2:
            case POS.PLAYER3:
                bgLayout.setPosition(90,50);
                break;
            case POS.PLAYER4:
            case POS.PLAYER5:
                bgLayout.setPosition(0,-80);
                break;
            case POS.PLAYER6:
            case POS.PLAYER7:
            case POS.PLAYER8:
                bgLayout.setPosition(-90,50);
                break;
        }

            var iconCoin = new cc.Sprite(res.icon_coin);
            bgLayout.addChild(iconCoin,1);
            iconCoin.setPosition(15, 12);


            var labelGold = new cc.LabelTTF("$2", "Arial", 10);
            labelGold.setPosition(iconCoin.x + 30, iconCoin.y);
            bgLayout.addChild(labelGold, 2);






    }


});