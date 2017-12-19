

var SceneMauBinh = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.slotPos =  [{x: 500, y: 70},
                         {x: 100, y: 320},
                         {x: 500, y: 540},
                         {x: 1050, y: 320}];
        this.slots = [];
        this.contenSizeAVT = null;
        this.init();
    },
    init: function () {
        var size = cc.winSize;
        this._super();
        // this.setDeepSyncChildren();
        // this.syncAllChildren(res.scene_bacay, this);
        cc.spriteFrameCache.addSpriteFrames(res.new_cards_chips_plist);

        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        buttonTest.setPosition( 1050, 50);

        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        this.addChild( buttonTest, 3);
        this._testGameUI();
    },

    _testGameUI : function() {
        for (var i = 0; i < this.slotPos.length; ++i) {
            var newSlot = new SlotMauBinh();
            newSlot.setPosition(this.slotPos[i]);
            this.addChild(newSlot, 1);
            this.slots.push(newSlot);
            this.contenSizeAVT = newSlot.imgAvatar.getContentSize();
        }
    },

    _actionChiaBai : function () {
        var time = 0;
        var scale = 0.5;
        //var dtPos = cc.p (0,0);
        var timeSlow = 3*8/3;
        var timeDealOne = 0.05*timeSlow;
        var count = 0;
        for (var i = 1; i <= 15; i++)  //Tổng số quân bài muốn chia
        {

            for (var j = 1; j <= this.slotPos.length; j++) {
                var dtPos = this.slotPos[j-1];
                count++;
                // ZLog.error("pos", dtPos.y);

                time  = time + 0.05; // Tốc độ chia bài

                var card = new BaseCards();
                card.setPosition(cc.winSize.width/2, cc.winSize.height/2);
                this.addChild(card,1);
                card.setScale(0.5);
                card.setLocalZOrder(-count);
                scale = 0.4;
                // ZLog.error("contenSize",this.contenSizeAVT.height/2);
                var x = dtPos.x; //  vị trí chiều ngang quân bài
                var y = dtPos.y; //  vị trí chiều ngang quân bài
                var dtx = 20; //  Khoảng cách ngang giữa 2 quân bài
                var dty = 20; //  Khoảng cách dọc giữa 2 quân bài
                var dtx1 = 30; //  Khoảng cách ngang theo contenSize cha
                var dty1 = 0; //  Khoảng cách dọc theo contenSize cha
                var anChorX =  card.getContentSize().width * 0.5 * scale;
                var anChorY =  card.getContentSize().height * 0.5 * scale;
                switch (j){
                   // tile.setPosition(cc.winSize.width / 2 +i%8*50/-10, cc.winSize.height / 2-Math.floor(i/8)*50);
                    case 1:
                        ZLog.error("test + " + i);
                       // x = dtPos.x - this.contenSizeAVT.height * 0.5 + 90 * (i - 1) + 150 + anChorX;
                        x = dtPos.x - this.contenSizeAVT.height * (i-1) % 5 *50 + anChorX;
                        y= dtPos.y + this.contenSizeAVT.width * 0.5 + anChorY - Math.floor((i-1)/5)*50;
                        //y= dtPos.y + this.contenSizeAVT.width * 0.5 - dty + anChorY;
                        scale = 1;
                        break;
                    case 2:
                        x = dtPos.x + this.contenSizeAVT.width * 0.5 + 5 + anChorX;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                        break;
                    case 3:
                        x = dtPos.x - this.contenSizeAVT.height * 0.5 + dtx * (i - 1) + dtx1 + anChorX;
                        y= dtPos.y - this.contenSizeAVT.width * 0.5 - 50 - anChorY;

                        break;
                    case 4:
                        x = dtPos.x - this.contenSizeAVT.width * 0.5 - 5 - anChorX ;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                        break;
                }
                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cc.p(x,y)), cc.scaleTo(timeDealOne, scale), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(time), cc.delayTime(time), cc.show(),
                    acSpawn);
                card.runAction(sequence);

            }

        }
    },
    touchEvent : function (sender,  type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._actionChiaBai(BACAY_GET_GAME_INFO);
        }
    }
});