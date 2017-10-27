playerList =[3,2,4];
var BaCayLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this._cocos2D = new BaCayEffectLayer();
		this.spCard = null;
		this.listCards = [];
        this.serverList = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
        this.slotPos = [{x: 410, y: 150},
            {x: 68, y: 380},  {x: 300, y: 580},
            {x: 700, y: 580}, {x: 1050, y: 500}, {x: 1050, y: 250}];
        this.slots = [];
        this.cards = null;
        this.cardIndex = null;
        this.listCardIndex = [];
        this.listCardsPlayer = [];
		this.init();

	},
	init: function () {
        var size = cc.winSize;

        // var bg = new cc.Sprite(res.bg_test);
        // this.addChild(bg);
        // bg.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        this.addChild(this._cocos2D, 1);

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


		this._testGameUI();
        ZLog.error("Finish SceneBaCay");

        return true;

    },

	_testGameUI : function(){
        var _tableMaxPlayer = 6;

        for (var i = 0; i < _tableMaxPlayer; ++i) {
            var newSlot = new cc.Sprite(res.btn_next);
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
                        addCards.setScale(0.8);
                        addCards.setPosition(newSlot.getPosition().x + j* 30 + 100,newSlot.getPosition().y);
                        break;
                    case POS.PLAYER1:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                        break;
                    case POS.PLAYER2:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                        break;
                    case POS.PLAYER3:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                        break;
                    case POS.PLAYER4:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                        break;
                    case POS.PLAYER5:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                        break;
                    case 6:
                        addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);


                }

                // addCards.setPosition(newSlot.getPosition().x + j*30,newSlot.getPosition().y);
                // if (i != 0){
                //     addCards.setPosition(newSlot.getPosition().x + 30,newSlot.getPosition().y+ j*30);
                // }

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
                for (var i = 0 ; i < this.listCardsPlayer.length; i++){
                   var self = this;
                   var scaleTo = cc.scaleTo(0.4, 0.1, 1);
                   var comeBack = cc.scaleTo(0.4, 1, 1);
                   var delay = cc.delayTime(0.05);

                   this.listCardsPlayer[i].runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender) {
                       sender.setTexture(res.card_0);
                   },this.listCardsPlayer[i]),comeBack)));
                }


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
}


