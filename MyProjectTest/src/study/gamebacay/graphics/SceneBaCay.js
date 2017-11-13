
var BaCayLayer = AdminBaseGUI.extend({
	ctor:function () {
		this._super();
		this._cocos2D = new BaCayEffectLayer();
		this.spCard = null;
		this.listCards = [];
        this.serverCardTest =[6,26,13];
        this.serverList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
        this.slotPos = [{x: 400, y: 110},
            {x: 215, y: 162},  {x: 215, y: 320}, {x: 215, y: 478},
            {x: 400, y: 540}, {x: 714, y: 540},
            {x: 925, y: 162}, {x: 925, y: 320}, {x: 925, y: 478}];
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
        this.btnStore = null;
        this.btnChatBox = null;
        this.btnLatBai = null;

        this.cardsChiaBai = [];

        this.contenSizeAVT = null;
		this.init();

	},
	init: function () {
        var size = cc.winSize;
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.scene_bacay, this);
        cc.spriteFrameCache.addSpriteFrames(res.new_cards_chips_plist);


       // cc.spriteFrameCache.addSpriteFrames(res.new_cards_chips_plist);

        // var test  = new BaseCards();
        // this.addChild(test);
        // test.setPosition(size.width/2, size.height/2);
        // test.setIdx(52);
        // test.setTypeCard(TYPE_CARD.CARD_NORMAL);
        // test.flipCards();
        // ZLog.error("cay bai", test.getNumOfCard());
        // ZLog.error("chat bai ", test.getSuitOfCard());

        // var listCards =[];
        // for (var i = 0; i < 3 ; i++) {
        // var card = new BaseCards();
        // card.setIdx(AdminRandom.randomBetweenNumber(1,35));
        // card.flipCards();
        // listCards.push(card);
        // this.addChild(card);
        // card.setPosition(cc.winSize.width/2 + i *30, cc.winSize.height/2);
        // }
        //
        // var test = new BaCayBo(listCards);
        // test.getDiem();

        var bgBaCay = new cc.Sprite(res.bg_bacay);
        this.addChild(bgBaCay, -30);
        bgBaCay.setPosition(size.width/2, size.height/2);

        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        buttonTest.setPosition( 1050, 50);

        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        this.addChild( buttonTest, 3);


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
        this.showStartGame();


        ZLog.error("Finish SceneBaCay");

        return true;

    },

    _actionChiaBaiServer : function (data) {
        var time = 0;
        var scale = 0.5;
        //var dtPos = cc.p (0,0);
        var timeSlow = 3*8/3;
        var timeDealOne = 0.05*timeSlow;
        var count = 0;
        for (var i = 1; i <= 3; i++)  //Tổng số quân bài muốn chia
        {

            for (var j = 1; j <= data.playerList.length; j++) {
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
                if(j == 1 ){        // Bộ bài của minh
                    x = dtPos.x - this.contenSizeAVT.height * 0.5 + 90 * (i - 1) + 150 + anChorX;
                    y= dtPos.y + this.contenSizeAVT.width * 0.5 - dty + anChorY;

                    // dtPos.x  = 440 + i*90;  // chiều ngang bộ bài
                    // dtPos.y = 120;           //chiều dọc bộ bài
                    scale = 1;
                }
                else if( j == 2 || j == 3 || j == 4){
                    // dtPos.x = 280;
                    // card.setAnchorPoint(0,0);
                    x = dtPos.x + this.contenSizeAVT.width * 0.5 + 5 + anChorX;
                    y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                    ZLog.error("dtPost " + JSON.stringify(dtPos));
                    // this.contenSizeAVT.height += i + 15;
                }
                else if( j == 5 || j ==6){
                    // card.setAnchorPoint(0,1);
                    x = dtPos.x - this.contenSizeAVT.height * 0.5 + dtx * (i - 1) + dtx1 + anChorX;
                    y= dtPos.y - this.contenSizeAVT.width * 0.5 - 50 - anChorY;

                }
                else if( j == 7 || j == 8 || j == 9){
                    // card.setAnchorPoint(1,0);
                    x = dtPos.x - this.contenSizeAVT.width * 0.5 - 5 - anChorX ;
                    y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                }

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cc.p(x,y)), cc.scaleTo(timeDealOne, scale), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(time), cc.delayTime(time), cc.show(),
                    acSpawn,cc.delayTime(1),cc.callFunc(function () {
                     this.btnLatBai.setVisible(true);
                    }.bind(this)));
                card.runAction(sequence);

            }

        }
    },

    _actionChiaBai : function () {
        var time = 0;
        var scale = 0.5;
        //var dtPos = cc.p (0,0);
        var timeSlow = 3*8/3;
        var timeDealOne = 0.05*timeSlow;
        var count = 0;
        for (var i = 1; i <= 3; i++)  //Tổng số quân bài muốn chia
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
                if(j == 1 ){        // Bộ bài của minh
                    x = dtPos.x - this.contenSizeAVT.height * 0.5 + 90 * (i - 1) + 150 + anChorX;
                    y= dtPos.y + this.contenSizeAVT.width * 0.5 - dty + anChorY;

                    // dtPos.x  = 440 + i*90;  // chiều ngang bộ bài
                    // dtPos.y = 120;           //chiều dọc bộ bài
                    scale = 1;
                }
                else if( j == 2 || j == 3 || j == 4){
                    // dtPos.x = 280;
                    // card.setAnchorPoint(0,0);
                    x = dtPos.x + this.contenSizeAVT.width * 0.5 + 5 + anChorX;
                    y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                    ZLog.error("dtPost " + JSON.stringify(dtPos));
                    // this.contenSizeAVT.height += i + 15;
                }
                else if( j == 5 || j ==6){
                    // card.setAnchorPoint(0,1);
                    x = dtPos.x - this.contenSizeAVT.height * 0.5 + dtx * (i - 1) + dtx1 + anChorX;
                    y= dtPos.y - this.contenSizeAVT.width * 0.5 - 50 - anChorY;

                }
                else if( j == 7 || j == 8 || j == 9){
                    // card.setAnchorPoint(1,0);
                    x = dtPos.x - this.contenSizeAVT.width * 0.5 - 5 - anChorX ;
                    y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                }

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cc.p(x,y)), cc.scaleTo(timeDealOne, scale), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(time), cc.delayTime(time), cc.show(),
                    acSpawn);
                card.runAction(sequence);

            }

        }
    },
    showStartGame:function () {
        var self = this;
        this._timerStart = setInterval(function () {
            self.lbTimer.setString(BACAY_SERVER_TEST.TIMERSTART);
            BACAY_SERVER_TEST.TIMERSTART--;
            ZLog.error("CountDown", BACAY_SERVER_TEST.TIMERSTART);
            if (BACAY_SERVER_TEST.TIMERSTART === 0) {
                clearInterval(self._timerStart);
                ZLog.error("VAO GA");
                self.imgClockStart.setVisible(false);
                self.nodeChicken.setVisible(true);
                self.showStartVaoGa();

                //moduleMgr.getBaCayModule().showGUIBaCay();
            }
        }, 1000);
    },

    showStartVaoGa:function () {
        var self = this;
        this._timerVaoGa = setInterval(function () {
            self.lbTimerGa.setString(BACAY_SERVER_TEST.TIMERCHICKEN);
            BACAY_SERVER_TEST.TIMERCHICKEN--;
            ZLog.error("CountDown", BACAY_SERVER_TEST.TIMERCHICKEN);
            if (BACAY_SERVER_TEST.TIMERCHICKEN === 0) {
                clearInterval(self._timerVaoGa);
                self.nodeChicken.setVisible(false);
                ZLog.error("CHIA BAI");
//                this._actionChiaBai();
             //   self._showNanBai();
                //moduleMgr.getBaCayModule().showGUIBaCay();
            }
        }, 1000);
    },



	_testGameUI : function(){
        for (var i = 0; i < BACAY_GET_GAME_INFO.playerList.length; ++i) {
            var newSlot = new GUISlot();
            newSlot.setPosition(this.slotPos[i]);
            this.addChild(newSlot, 1);
            this.slots.push(newSlot);
            this.contenSizeAVT = newSlot.imgAvatar.getContentSize();
            newSlot.setPlayerInfo(BACAY_GET_GAME_INFO.playerList[i]);

           // newSlot.testLabelWinLose(i,1);
          //  newSlot.testIconAndLabel(i);
             newSlot.testKeCuaDanhBien(BACAY_GET_GAME_INFO.playerList[i].gamePosition);
           // newSlot.testLabelDiemAndGold( i);
            //
            // for (var j = 0; j < 3; ++j) {
            //     var addCards = new cc.Sprite("#newcardschips/card_" + AdminRandom.randomBetweenNumber(1,36) + ".png");
            //     this.addChild(addCards, 2);
            //     addCards.setScale(0.3);
            //     switch (i){
            //         case POS.ISME:
            //             addCards.setSpriteFrame("newcardschips/card_black.png");
            //            // newSlot.imgAvatar.setTexture("res/box_myAvatar.png");
            //             newSlot.lbGold.setString("1$");
            //             newSlot.lbName.setString("Min");
            //             newSlot.nodeKeCuaDanhBien.setVisible(false);
            //             this.listCardsPlayer.push(addCards);
            //             addCards.setScale(1);
            //             addCards.setPosition(newSlot.getPosition().x + j* 40 + 150,newSlot.getPosition().y + 40);
            //             break;
            //         case POS.PLAYER1:
            //         case POS.PLAYER2:
            //         case POS.PLAYER3:
            //             addCards.setPosition(newSlot.getPosition().x + 80,newSlot.getPosition().y - (j * 25) + 12);
            //             break;
            //         case POS.PLAYER4:
            //         case POS.PLAYER5:
            //             addCards.setPosition(newSlot.getPosition().x + ( j* 15) - 15,newSlot.getPosition().y - 125 );
            //             break;
            //         case POS.PLAYER6:
            //         case POS.PLAYER7:
            //         case POS.PLAYER8:
            //             addCards.setPosition(newSlot.getPosition().x - 80,newSlot.getPosition().y - (j * 25) + 12);
            //         break;
            //
            //     }
            // }
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

    _showNanBai: function () {
        if(this._guiNanBai == null){
            this._guiNanBai  = new GUINanBai();
            this.addChild(this._guiNanBai,11);
            this.retain();
        }

        this._guiNanBai.initListCardHand(this.serverCardTest);
        // test.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this._guiNanBai.setCallbackFunc(this.callBackNanBai,this);

    },

    showBai: function () {

    },

    hideBai: function () {

    },


    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnDatCuoc:
               break;
            case this.btnHuyBo:
                break;
            case this.btnVaoGa:
                this.runEffectAddGold(450, 96, 568,320);
                break;
            case this.btnStore:
                break;
            case this.btnChatBox:
                break;
            case this.btnLatBai:
                this.callBackNanBai();
                break;

        }
    },
    runEffectAddGold: function (_fromX, _fromY, _toX, _toY) {
        for (var i = 0; i < 5; i++) {
            var iconGold = new cc.Sprite(res.icon_coin);
            this.addChild(iconGold);
            iconGold.setAnchorPoint(0.5, 0.5);
            // iconGold.setPosition(95, 13);
            iconGold.setPosition(_fromX, _fromY);
            var iconGoldMoveToTai = new cc.MoveTo(0.5, cc.p(_toX, _toY));
            iconGold.runAction(
                cc.sequence(
                    cc.fadeIn(0.2 * i),
                    iconGoldMoveToTai,
                    cc.fadeOut(0.2 * i)
                )
            );
        }
    },

    callBackNanBai: function(){
        for (var i = 0 ; i < this.serverCardTest.length; i++){
            var x = this.serverCardTest[i];
            ZLog.error("Call back lat bai", this.serverCardTest[i]);
            var self = this;
            var scaleTo = cc.scaleTo(0.4, 0.1, 1);
            var comeBack = cc.scaleTo(0.4, 1, 1);
            var delay = cc.delayTime(0.05);
            var sum = 0;
            this.listCardsPlayer[i].runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender,data) {
                ZLog.error("Call back lat bai", data);
                //sender.setTexture(res.card_0);
                sender.setSpriteFrame("newcardschips/card_" + data + ".png");
                sum += data;

                ZLog.error("Tinh diem", sum % 10 );
            },this.listCardsPlayer[i],this.serverCardTest[i]),comeBack)));
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
		    this._actionChiaBaiServer(BACAY_GET_GAME_INFO);


            // setTimeout(function(){
            //     for(var card in this.cardsChiaBai){
            //         if(card){
            //             card.removeFromParentAndCleanup(true);
            //         }
            //     }
            // }.bind(this), 7000); // after 3 seconds
		    //end game thi xoa bo bai

            // var getIndexCard = AdminRandom.randomBetweenNumber(0,35);
            // ZLog.error("test",getIndexCard);
            // this.cardIndex.setSpriteFrame("card_" + getIndexCard + ".png");

            // var labelTest = new cc.LabelTTF("Min","Arial",32);
            // labelTest.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            // labelTest.setTag(1);
            // this.addChild(labelTest);
            // ZLog.error("addLabel");
            // setTimeout(function(){
            //     this.removeChildByTag(1); // remove sprite by tag
            // }.bind(this), 3000); // after 3 seconds



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