var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
    var bgTest = new cc.Sprite(res.bg_test);
    bgTest.setAnchorPoint( 0.5, 0.5);
    bgTest.setPosition( size.width/2, size.height/2);
    this.addChild( bgTest, 0);
//tạo Sprite
    var spriteTest = new cc.Sprite( res.HelloWorld_png);
    spriteTest.setAnchorPoint( 0.5, 0.5);
    spriteTest.setPosition( size.width/2, size.height/2);
    bgTest.addChild( spriteTest, 1);

//Remove Sprite
//    setTimeout (function(){
//    	bgTest.removeChild(spriteTest); // Delete Sprite at 3s
//    },3000);

//Tạo Label
    var labelTest = new cc.LabelTTF("Nguyen Cong Minh","Arial",24);
    labelTest.setAnchorPoint( 0.5, 0.5);
    labelTest.setPosition( size.width/2 , size.height * 0.75);
    bgTest.addChild( labelTest, 2);

//Tao Button
     var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
     //buttonTest.loadTextures(res.btn_next, res.btn_next, res.btn_next);
     buttonTest.setAnchorPoint(0.5 , 0.5);
     buttonTest.setPosition( size.width /2, size.height * 0.25);
     buttonTest.addTouchEventListener(this.touchEvent,this);
     buttonTest.setPressedActionEnabled(true);
     bgTest.addChild( buttonTest, 3);

    cc.log("test");

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
                cc.log("Fuck you bitch");
                var gameLatBai = new GameLatBaiScene();
                cc.director.runScene(gameLatBai);
                break;
        }
    }
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

