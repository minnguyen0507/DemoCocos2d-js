
var BaCayLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		var size = cc.winSize;
		cc.log("vao  SceneBaCay");
		
		var bg = new cc.Sprite(res.bg_test);
		this.addChild(bg);
		bg.setPosition(cc.winSize.width/2, cc.winSize.height/2);
		
		
		//ZLog.error("xxxxxxx", this.testGetNomalId(20));

		var testQuanBai = new BaCayCard(20);
		var testBoBai = new BaCayBo(2);
        ZLog.error("xxxxxxx", testQuanBai);
        ZLog.error("xxxxxxx", testBoBai);

		return true;
	},
	testGetNomalId: function(id) {
		var realSo;
		if(id < 4){
			realSo = 11;
		}else if(id < 8){
			realSo = 12
		}
		else{
			realSo = Math.floor(id/4) - 2;
		}

		var chat = Math.floor(id%4);
		if(chat == 3){
			chat = 2;
		}
		else if(chat == 2){
			chat = 3;
		}
		return realSo*4 + chat;
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

