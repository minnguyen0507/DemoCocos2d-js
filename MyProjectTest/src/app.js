var img_tai;
var imgJackPot;
var cbTest;
var configGoldTest = 100000;
var labelTest;
var listArray = [5,1,4,2,8];
var lbArrayBeforeSort;
var listArrayRandom = [];

var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.sprite = null;
        this.runningAction = null;
        this._guiTest = null;
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


    labelTest = new cc.LabelTTF("Hight Score: " + Utility.formatMoney(configGoldTest),"Arial",24);
    labelTest.setAnchorPoint(1.0, 0.5);
    //labelTest.setPosition( size.width/2 , size.height * 0.75);
    labelTest.setPosition( 1050 , 600);
    bgTest.addChild( labelTest, 2);

    lbArrayBeforeSort = new cc.LabelTTF("Array Before Sorted: " + listArray ,"Arial",24);
    lbArrayBeforeSort.setAnchorPoint(0.5, 0.5);
    //labelTest.setPosition( size.width/2 , size.height * 0.75);
    lbArrayBeforeSort.setPosition( 350 , 550);
    bgTest.addChild( lbArrayBeforeSort, 2);



//Tao Button
     var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
     //buttonTest.loadTextures(res.btn_next, res.btn_next, res.btn_next);
     buttonTest.setAnchorPoint(0.5 , 0.5);
    // buttonTest.setPosition( size.width /2, size.height * 0.25);
     buttonTest.setPosition( 1050, 50);

     buttonTest.addTouchEventListener(this.touchEvent,this);
     buttonTest.setPressedActionEnabled(true);
     bgTest.addChild( buttonTest, 3);

     this._createMenuItem();


      //  this._initCheckBox();
        this._testFuncInterval();
        //setTimeout(this._testSetTimeout,3000);
        return true;
    },

    _testSetTimeout: function () {
        ZLog.error("something...");
        alert("Chào mừng bạn đến với MyProject");
    },

    _testFuncInterval: function () {
        var counter  = 10;
        var testInterval =  setInterval(function () {
            counter --;
          ZLog.error("count ==== ",counter);
          if (counter == 0) { // hết thời gian làm 1 nhiệm vụ nào đó
              ZLog.error("HAPPY NEW YEAR");
              clearInterval(testInterval);
          }
        },1000);
    },
    _createMenuItem: function () {
        this.Menu = new cc.Menu();
        this.Menu.setPosition(cc.winSize.width/2 - 600 , cc.winSize.height/2 - 300);
        this.Menu.setAnchorPoint(0.5, 0.5);

        //Menu item with label ( Label trong button);
        var _labelTest = new cc.LabelTTF("MenuItem", 36);
        this.MenuItem1 = new cc.MenuItemLabel(_labelTest, "onMenuClicked",this);
        this.MenuItem1.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.MenuItem1.setTag(0);
        this.Menu.addChild(this.MenuItem1, 1);

        //Menu Item Image
        this.MenuItem2 = new cc.MenuItemImage(res.tile_0, res.tile_1,null,"onMenuClicked",this);
        this.MenuItem2.setPosition(cc.winSize.width/2, cc.winSize.height/2 - 100);
        this.Menu.addChild(this.MenuItem2, 1);
        this.MenuItem2.setTag(1);



        this.addChild(this.Menu, 1);
    },

    onMenuClicked:function () {
          ZLog.error("Touch Menu");
    },
    sapXepTangDan: function(){
        var listNewArray= [];
        listNewArray = listArray.sort(AdminSort.sortNumberAsc);
        ZLog.error("Sort Array" + listNewArray);
    },

    sapXepGiamDan: function(){
        var listNewArray= [];
        listNewArray = listArray.sort(AdminSort.sortNumberDesc);
        ZLog.error("Sort Array" + listNewArray);
    },
    _initCheckBox: function(){ // tạo checkbox
        imgJackPot = new cc.Sprite("res/img_jackpot.png");
        imgJackPot.setPosition(size.width/2, size.height/2);
        ZLog.error("win size x =%s: , y = %s: ",size.width/2,size.height/2);
        imgJackPot.setAnchorPoint(0.5, 0.5);
        this.addChild(imgJackPot, 1);
        imgJackPot.setScale(0.1);

        cbTest = new ccui.CheckBox();
        cbTest.loadTextures("res/checkbox_bg.png", "res/checkbox_bg.png", "res/checkbox_tick.png");
        cbTest.addEventListener(this.selectedStateEvent, this);
        this.addChild(cbTest, 2);
        cbTest.setPosition(cc.winSize.width/2 + 100, cc.winSize.height/2 + 100);
    },

    changeStringText: function(){ //đổi text
        configGoldTest = 1000000;
        labelTest.setString("Hight Score:" + Utility.formatMoney(configGoldTest), "Arial", 24);
        labelTest.setColor(cc.color(255,255,0));

    },
    runImgJackpot: function(){ //action chạy ngang rồi quay về pos
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

    _loadSpriteIndex: function () {
        for (var i = 0; i < 4; i++){
         //   var iconCards = new cc.Sprite("res/cards/at_" + i + ".png"); //cách 1
            var iconCards = new cc.Sprite(res["card_" + i]);
            this.addChild(iconCards, 1);
            iconCards.setAnchorPoint(0.5, 0.5);
            iconCards.setPosition(cc.winSize.width/2 + i * 30, cc.winSize.height/2);
        }

    },

    _loadSpriteSheet: function () {
        cc.spriteFrameCache.addSpriteFrames("res/animation/tx_animations.plist");

        // init runningAction
        var animFrames = [];
        for (var i = 1; i < 19; i++) {
            var str = "tx_animation_00" + (i < 10 ? ("0" + i) :  i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
            cc.log(str);
        }


        var animation = new cc.Animation(animFrames, 0.1);
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(true);
        var runningAction = new cc.RepeatForever(new cc.Animate(animation));

        var sprite = new cc.Sprite("#tx_animation_0001.png");
        sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        sprite.runAction(runningAction);
        this.addChild(sprite, 2);
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
                this._loadSpriteIndex();
              //   var test = new GameTaiXiuLayer();
              // if (this._guiTest == null){
              //     this.addChild(test, 1);
              //     this._guiTest = true;
              // }
                break;
        }
    }
});

function actionNhayTaiXiu(sprite) // action nhấp nháy
{
    stopNhayTaiXiu();

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
