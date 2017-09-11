var img_tai;
var img_xiu;
var imgJackPot;
var cbTest;
var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;

//tao Sprite
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

        imgJackPot = new cc.Sprite("res/img_jackpot.png");
        imgJackPot.setPosition(size.width/2, size.height/2);
        ZLog.error("win size x =%s: , y = %s: ",size.width/2,size.height/2);
        imgJackPot.setAnchorPoint(0.5, 0.5);
        this.addChild(imgJackPot, 1);
        imgJackPot.setScale(0.1);

        this._initCheckBox();

        return true;
    },

    _initCheckBox: function(){
        cbTest = new ccui.CheckBox();
        cbTest.loadTextures("res/checkbox_bg.png", "res/checkbox_bg.png", "res/checkbox_tick.png");
        cbTest.addEventListener(this.selectedStateEvent, this);
        this.addChild(cbTest, 2);
        cbTest.setPosition(cc.winSize.width/2 + 100, cc.winSize.height/2 + 100);
    },

    runImgJackpot: function(){
       //  var fadeIn = cc.FadeIn.create(0.3);
       //  var fadeOut = cc.FadeOut.create(0.3);
       // /// var runImg = new cc.repeatForever(cc.sequence(fadeIn, cc.moveTo(5, imgJackPot.x - 200, imgJackPot.y), cc.moveTo(0.3,cc.winSize.width/2, cc.winSize.y/2)));
       //  var runImg = new cc.repeatForever(cc.moveTo(5, imgJackPot.x - 200, imgJackPot.y));
       //  //imgJackPot.runAction(runImg);
       //  imgJackPot.runAction(cc.repeatForever(cc.sequence(fadeIn,cc.moveTo(5, imgJackPot.x - 200, imgJackPot.y),cc.moveTo(0.3,imgJackPot.x - 200, imgJackPot.y))));

        var fadeIn = cc.fadeIn(0.1); // new cc.FadeIn.create(0.5);
        var moveTo = cc.moveTo(5,cc.p(imgJackPot.x - 200, imgJackPot.y));
        var comeBack =  cc.moveTo(0.1,cc.p(imgJackPot.x ,imgJackPot.y));
        var fadeOut = cc.fadeOut(0.1);
        var seq =  cc.sequence(
            fadeIn,
            moveTo,
            fadeOut,
            comeBack);
        var repeatForeverAction =  cc.repeatForever(seq);
        imgJackPot.runAction(repeatForeverAction);

    },


    actionQuayTronPhongTo : function () {

        var fadeIn = cc.FadeIn.create(0.3);
        var fadeOut = cc.FadeOut.create(0.3);
        var scaleTo1 = new cc.ScaleTo(0.3, 0.1, 0.1);
        var scaleTo2 = new cc.ScaleTo(0.3, 0.3, 0.3);
        var scaleTo3 = new cc.ScaleTo(0.3, 0.5, 0.5);
        var scaleTo4 = new cc.ScaleTo(0.3, 0.7,0.7);
        var scaleTo5 = new cc.ScaleTo(0.3, 0.9, 0.9);
        var scaleTo7 = new cc.ScaleTo(1.0, 2.0, 2.0);
        var rotation = cc.rotateBy(0.3, 360,360);

        var sequenceAction = new cc.Sequence(fadeIn,cc.spawn(scaleTo2, rotation),cc.spawn(scaleTo3, rotation),cc.spawn(scaleTo4, rotation),cc.spawn(scaleTo5, rotation), scaleTo7,fadeOut, scaleTo1);
       // var rotationAction = cc.repeatForever(cc.rotateBy(1.5, 300));
       // var sequenceAction = new cc.Spawn(fadeIn, fadeOut);
       // var sequenceAction = new cc.Sequence(fadeIn, fadeOut);
      //  var sequenceAction = new cc.Sequence(fadeIn, cc.spawn(scaleTo2,rotation1) ,fadeOut);
       imgJackPot.runAction(sequenceAction);

        //imgJackPot.runAction(cc.sequence(fadeIn,cc.spawn(),fadeOut));
        // img_tai.runAction(new cc.Repeat(cc.spawn(cc.sequence(cc.delayTime(0.15),cc.callFunc(function () {
        //     img_tai.setTexture("res/txtTai.png");
        // }),cc.delayTime(0.15),cc.callFunc(function () {
        //     img_tai.setTexture("res/tai1.png");
        // })))));

        //img_tai.setTexture("res/txtTai.png");
                //---action nhap nhay
                //         img_tai.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.delayTime(0.15),cc.callFunc(function () {
                //             img_tai.setTexture("res/txtTai.png");
                //         }),cc.delayTime(0.15),cc.callFunc(function () {
                //             img_tai.setTexture("res/tai1.png");
                //         })))))
    },
    selectedStateEvent: function(sender, type)
    {
        switch (type)
        {
            case ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("Not selected");

                break;

            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("Selected");
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
                this.runImgJackpot();
              //  cbTest.loadTextureBackGround("res/checkbox_bg.png",0);
                //this.changeBox();
                // var gameLatBai = new GameLatBai();
                // cc.director.pushScene(gameLatBai);

                // var gameMayBay = new GameMayBayScene();
                // cc.director.runScene(gameMayBay);
                break;
        }
    }
});

function actionNhayTaiXiu(sprite)
{
    //stopNhayTaiXiu();

    sprite.runAction(cc.repeatForever(cc.spawn(cc.sequence(cc.scaleTo(0.15,1.1),cc.scaleTo(0.15,1)),cc.sequence(cc.delayTime(0.15),cc.callFunc(function(){
        if(sprite == taiXiu.sp_tai)
        {
            sprite.setTexture("res/tai1.png");
        }else
        {
            sprite.setTexture("res/xiu1.png");
        }
    }),cc.delayTime(0.15),cc.callFunc(function(){
        if(sprite == taiXiu.sp_tai)
        {
            sprite.setTexture("res/txtTai.png");
        }else
        {
            sprite.setTexture("res/txtXiu.png");
        }
    })))));

}
function stopNhayTaiXiu()
{
    img_tai.stopAllActions();
    img_tai.setScale(1);
    img_tai.setTexture("res/txtTai.png");
    // taiXiu.sp_tai.stopAllActions();
    // taiXiu.sp_xiu.stopAllActions();
    // taiXiu.sp_tai.setScale(1);
    // taiXiu.sp_xiu.setScale(1);
    // taiXiu.sp_tai.setTexture("res/txtTai.png");
    // taiXiu.sp_xiu.setTexture("res/txtXiu.png");

}
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

