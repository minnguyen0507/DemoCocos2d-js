playerList =[3,2,4];
var BaCayLayer = AdminBaseGUI.extend({
	ctor:function () {
		this._super();
		this._cocos2D = new BaCayEffectLayer();
		this.spCard = null;
		this.listCards = [];
        this.serverList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
        this.slotPos = [{x: 450, y: 96},
            {x: 190, y: 180},  {x: 190, y: 330},
            {x: 190, y: 480}, {x: 450, y: 550}, {x: 700, y: 550},
            {x: 920, y: 480}, {x: 920, y: 330}, {x: 920, y: 180}];
        this.slots = [];
        this.cards = null;
        this.cardIndex = null;
        this.listCardIndex = [];
        this.listCardsPlayer = [];
        this.btnVaoGa = null;
        this.lbTimer = null;
        this.lbTimerGa = null;
        this.nodeChicken = null;
        this._timerVaoGa = null;
        this._timerStart = null;
        this.imgClockStart = null;
        this.btnDatCuoc = null;
        this.btnHuyBo = null;

		this.init();

	},
	init: function () {
        var size = cc.winSize;
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.scene_bacay, this);

        var bgBaCay = new cc.Sprite(res.bg_bacay);
        this.addChild(bgBaCay, -1);
        bgBaCay.setPosition(size.width/2, size.height/2);

        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        buttonTest.setPosition( 1050, 50);

        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        this.addChild( buttonTest, 3);

        cc.spriteFrameCache.addSpriteFrames(res.cards_chips_plist);

        var arrayTest = [11,12,13,14,15,16,17,18,19,10];

        //
        // for (var i = 1; i < arrayTest.length ; i++){
        //     var cardsInDex= new cc.Sprite("#card_" + arrayTest[i] + ".png");
        //     this.addChild(cardsInDex,2);
        //     cardsInDex.setPosition(cc.winSize.width/2 + i * 30,cc.winSize.height/2);
        //     this.listCardIndex.push(cardsInDex);
        // }
        this.lbTimer.setString("10");
        this.nodeChicken.setVisible(false);
		this._testGameUI();
		//this._testEndGame();
        //this._showKeCuaDatBien();
        this.showStartGame();
        ZLog.error("Finish SceneBaCay");

        return true;

    },

    showStartGame:function () {
        var self = this;
        var counter = 10;
        this._timerStart = setInterval(function () {
            self.lbTimer.setString(counter);
            counter--;
            ZLog.error("CountDown", counter);
            if (counter === 1) {
                clearInterval(self._timerStart);
                ZLog.error("Chia bai - Hien dat cuoc");
                self.imgClockStart.setVisible(false);
                self.nodeChicken.setVisible(true);
                self.showStartVaoGa();

                //moduleMgr.getBaCayModule().showGUIBaCay();
            }
        }, 1000);
    },

    showStartVaoGa:function () {
        var self = this;
        var counter = 5;
        this._timerVaoGa = setInterval(function () {
            self.lbTimerGa.setString(counter);
            counter--;
            ZLog.error("CountDown", counter);
            if (counter === 0) {
                clearInterval(self._timerVaoGa);
                ZLog.error("Show Bai - Tinh Diem");
                //moduleMgr.getBaCayModule().showGUIBaCay();
            }
        }, 1000);
    },

    _showKeCuaDatBien: function(){
        var _tableMaxPlayer = 9;

        for (var i = 0; i < _tableMaxPlayer; ++i) {
            var KeCuaDatBien = new GUIDanhNgoai();
            KeCuaDatBien.setPosition(this.slotPos[i]);
            this.addChild(KeCuaDatBien, 3);
        }
    },
    _testEndGame : function () {
        var _tableMaxPlayer = 9;

        for (var i = 0; i < _tableMaxPlayer; ++i) {
            var playerDiem = new cc.LabelTTF("WIN", "Arial", 30);
            playerDiem.setPosition(this.slotPos[i].x,this.slotPos[i].y - 50 );
            this.addChild(playerDiem, 3);
        }
    },

	_testGameUI : function(){
        var _tableMaxPlayer = 9;

        for (var i = 0; i < _tableMaxPlayer; ++i) {
            var newSlot = new GUISlot();
            newSlot.setPosition(this.slotPos[i]);
            this.addChild(newSlot, 1);
            this.slots.push(newSlot);

            for (var j = 0; j < 3; ++j) {
                var addCards = new cc.Sprite(res.card_black);
                this.addChild(addCards, 2);
                addCards.setScale(0.3);
                switch (i){
                    case POS.ISME:
                        this.listCardsPlayer.push(addCards);
                        addCards.setScale(1);
                        addCards.setPosition(newSlot.getPosition().x + j* 30 + 150,newSlot.getPosition().y);
                        break;
                    case POS.PLAYER1:
                    case POS.PLAYER2:
                    case POS.PLAYER3:
                        addCards.setPosition(newSlot.getPosition().x + 80,newSlot.getPosition().y - (j * 20) + 5);
                        break;
                    case POS.PLAYER4:
                    case POS.PLAYER5:
                        addCards.setPosition(newSlot.getPosition().x - (j* 15) + 20,newSlot.getPosition().y - 100 );
                        break;
                    case POS.PLAYER6:
                    case POS.PLAYER7:
                    case POS.PLAYER8:
                        addCards.setPosition(newSlot.getPosition().x - 80,newSlot.getPosition().y - (j * 20) + 5);
                    break;

                }
            }
        }
        // var listCards1 = [];
        // for (var i = 0; i < 3; i++) {
			// var card = new CardGame(i);
        //     ZLog.error("card ",card.getDiemById());
			// listCards1.push(card);
        // }
        // var test  = new BaCayBoTest(listCards1);
        // test.getDiem();
        //
        //
        // var sum = 0;
        // var listCards2 = [9,6,35];
        // for (var i = 0; i < listCards2.length; i++) {
        //     var showList2 = new CardGame(listCards2[i]).getDiemById();
        //     sum += showList2;
        //     ZLog.error("Show Cards 2222", showList2);
        // }
        // ZLog.error("SUMMMMMM", sum % 10);

	},

    _showDatCuoc : function (tag) {
        if(this._guiBetting == null){
            this._guiBetting  = new GUIDatCuoc();
            this.addChild(this._guiBetting,10);
            this.retain();
        }
        this._guiBetting.showGui(tag);

    },

    showBai: function () {

    },

    hideBai: function () {

    },


    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnDatCuoc:
               var tagDatCuoc = 1;
               this._showDatCuoc(tagDatCuoc);
               break;
            case this.btnHuyBo:
                var tagHuyBo = 2;
                this._showDatCuoc(tagHuyBo);

                break;

        }
    },

	touchEvent : function (sender,  type) {
		switch (type){
		case ccui.Widget.TOUCH_BEGAN:
			break;
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_MOVED:
			break;
		case ccui.Widget.TOUCH_ENDED:
            // var getIndexCard = AdminRandom.randomBetweenNumber(0,35);
            // ZLog.error("test",getIndexCard);
            // this.cardIndex.setSpriteFrame("card_" + getIndexCard + ".png");

            var labelTest = new cc.LabelTTF("Min","Arial",32);
            labelTest.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            labelTest.setTag(1);
            this.addChild(labelTest);
            ZLog.error("addLabel");
            setTimeout(function(){
                this.removeChildByTag(1); // remove sprite by tag
            }.bind(this), 3000); // after 3 seconds

            

            //     for (var i = 0 ; i < this.listCardsPlayer.length; i++){
            //        var self = this;
            //        var scaleTo = cc.scaleTo(0.4, 0.1, 1);
            //        var comeBack = cc.scaleTo(0.4, 1, 1);
            //        var delay = cc.delayTime(0.05);
            //
            //        this.listCardsPlayer[i].runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender) {
            //            //sender.setTexture(res.card_0);
            //            sender.setSpriteFrame("card_" + 32 + ".png");
            //        },this.listCardsPlayer[i]),comeBack)));
            //     }


			break;
		}
	}
});


var SceneBaCay = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new BaCayLayer();
		this.addChild(layer);
	}
});


POS ={
    ISME: 0,
    PLAYER1: 1,
    PLAYER2: 2,
    PLAYER3: 3,
    PLAYER4: 4,
    PLAYER5: 5,
    PLAYER6: 6,
    PLAYER7: 7,
    PLAYER8: 8,
}


