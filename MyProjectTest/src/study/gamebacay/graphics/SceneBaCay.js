playerList =[3,2,4];
var BaCayLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this._cocos2D = new BaCayEffectLayer();
		this.spCard = null;
		this.listCards = [];
		this.init();

	},
	init: function () {
        var size = cc.winSize;

        var bg = new cc.Sprite(res.bg_test);
        this.addChild(bg);
        bg.setPosition(cc.winSize.width/2, cc.winSize.height/2);

        this.addChild(this._cocos2D, 1);

        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        buttonTest.setPosition( 1050, 50);

        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        bg.addChild( buttonTest, 3);



        // var labelTest = new AdminLabelTTF("Do something", "Arial", 24);
        // bg.addChild(labelTest, 99);
        // labelTest.setPosition(cc.winSize.width/2, cc.winSize.height/2);
		for (var i= 0; i < 3; i++){

            var spCards = new cc.Sprite(res.card_black);
            this.addChild(spCards, 3);
            spCards.setPosition(size.width/2 + i * 30 - 200, size.height/2 - 150);
            spCards.setAnchorPoint(0.5, 0.5);
            this.listCards.push(spCards);
		}
        ZLog.error("Finish SceneBaCay",this.listCards.length);

        return true;

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
			//this._cocos2D.chiaBai(playerList,9,3);

                for (var i = 0 ; i < this.listCards.length; i++){
                    var self = this;
                    var scaleTo = cc.scaleTo(0.4, 0.1, 1);
                    var comeBack = cc.scaleTo(0.4, 1, 1);
                    var delay = cc.delayTime(0.05);

                    this.listCards[i].runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender) {
                        sender.setTexture(res.card_0);
                    },this.listCards[i]),comeBack)));
                }

                ZLog.error("Finish Action");

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

