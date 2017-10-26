var GUIUICocos2d = AdminBaseGUI.extend({
    _className: "UICocos2d",

    ctor: function() {
        this._super();
        this.loadingBar = null;
        this.count = 100;
        this.serverList = [9,14,7];
        this.init();
    },
    init: function() {
        this._super();



       // this._createUIAnimation();
       // this._createUIButton();
       // this._createProgressTimerBar();

        //this._createUISlider();
        //this._createUILoadingBar();

        //this.schedule(this.update, 0.2);
        var listCard = [];
        for (var i = 0; i < this.serverList.length; i++){
            var card = new CardGame(this.serverList[i]).getDiemById();


            ZLog.error("Show Cards", card);
            ZLog.error("Sum diem bo bai", sum);

        }

        ZLog.error("Finish new UI");
        return true;

    },

    _createUILabel: function () {
        var lbTest = new cc.LabelTTF("Hello World", "Arial", 32);
        this.addChild(lbTest);
        lbTest.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    },
    _createUILabelBMT: function () {

    },

    _createUIMenu: function(){
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

    _createUIButton: function () {
        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        //buttonTest.loadTextures(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        // buttonTest.setPosition( size.width /2, size.height * 0.25);
        buttonTest.setPosition( 1050, 50);
        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        this.addChild( buttonTest, 3);
    },

    _createUICheckBox: function(){

    },

    _createUILoadingBar: function(){
        this.loadingBar = new ccui.LoadingBar();
        this.loadingBar.setName("LoadingBar");
        this.loadingBar.loadTexture(res.slider_progress);
        this.loadingBar.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.loadingBar.setPercent(100);
        this.addChild(this.loadingBar,2);
        ZLog.error("Finish UI LoadingBar");
    },

    _createUIScrollView: function(){
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setBackGroundImage(res.popup_mini);
        scrollView.setContentSize(cc.size(300, 200));
        scrollView.setInnerContainerSize(cc.size(1280, 2500));
        scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        scrollView.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(scrollView);
        for (var i = 0; i < 50; i++)
        {
            var button = new ccui.Button();
            button.setTouchEnabled();
            button.setTag(i);
            button.setPosition(cc.p(scrollView.width / 2 - 80, i * 50));
            button.loadTextures(res.btn_next, res.btn_next, "");
            scrollView.addChild(button);
            button.addTouchEventListener(this.touchEvent, this);
            button.setPressedActionEnabled(true);
        }

        ZLog.error("Finish UI ScrollView");
    },
    _createUIListView: function(){

    },

    _createUISlider: function () {
        var uiSlider = new ccui.Slider();
        uiSlider.setTouchEnabled(true);
        uiSlider.loadBarTexture(res.slider_track);
        uiSlider.loadSlidBallTextures(res.slider_thumb,res.slider_thumb,""); // Nút kéo
        uiSlider.loadProgressBarTexture(res.slider_progress);
        uiSlider.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        uiSlider.setRotation(-90); // Xoay 90 độ
        this.addChild(uiSlider, 2);
        uiSlider.addEventListener(this.sliderEvent ,this);
    },
    _createProgressTimerBar: function(){ //Tạo UI chạy thời gian kiểu loading bar
        var testProgressTimer = new cc.ProgressTimer(new cc.Sprite(res.slider_progress));
        testProgressTimer.setType(cc.ProgressTimer.TYPE_BAR);
        testProgressTimer.setBarChangeRate(cc.p(1,0));
        testProgressTimer.setPercentage(100); //set giá trị = 100%
        testProgressTimer.setMidpoint(cc.p(0,0));
        testProgressTimer.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(testProgressTimer, 1);

        var to1 = cc.progressTo(3, 0); //trong vòng 5s chạy từ 100-> 0

        var remainingTime = 10;
        var maxTurnTime = 3;

        var  actionProgress =cc.sequence(
            cc.spawn(
                cc.progressTo(remainingTime, 0),
                cc.tintTo(remainingTime, 255, 0, 0),
                cc.sequence(
                    cc.delayTime(remainingTime - Math.min(maxTurnTime * 0.3, remainingTime)),
                    cc.callFunc(function(){
                        ZLog.error("do somethingxxxx...");
                        // Audio.playEffectByLanguage(res.wth_slow);
                       // Audio.playEffect(res.clocktable, true);
                       // Vibrator.vibrateDevice(1000);
                    }),
                    cc.blink(Math.min(maxTurnTime * 0.3, remainingTime), Math.ceil(maxTurnTime * 0.3 / 0.4))
                )
            ),
            cc.callFunc(function(sender){
                ZLog.error("do something...");
                testProgressTimer.setColor(cc.color(0,255,0));
                testProgressTimer.setPercentage(100); //set giá trị = 100%
            })
        );
        testProgressTimer.runAction(cc.repeatForever(actionProgress));
    },
    sliderEvent: function (sender, type) {
        switch (type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                ZLog.error("Percent " + sender.getPercent().toFixed(0));
                break;
        }
    },
    _createUITextField: function(){

    },

    _createUISkeleton: function(){
        //????
        var spineClock = new sp.SkeletonAnimation('res/spine/demgio/skeleton.json', 'res/spine/demgio/skeleton.atlas');
        spineClock.setPosition(cc.p(size.width / 2, size.height / 2 ));
        spineClock.setAnchorPoint(0.5,0.5);
        spineClock.setAnimation(-1, 'danhchuong', true);
        //spineBoy.setAnimationListener(this, this.animationStateEvent);
        this.addChild(spineClock, 4);
    },

    _createUIAnimation: function () {
        //cc.spriteFrameCache.addSpriteFrames("res/animation/tx_mobat/actionmobat.plist");
        cc.spriteFrameCache.addSpriteFrames("res/animation/tx_socdia/actionsocdia.plist");

        //init runningAction
        var animFrames = [];
        for (var i = 0; i < 49; i++) {
            var str = "anim"+ i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
            cc.log(str);
        }

        var animation = new cc.Animation(animFrames, 0.1);
        animation.setDelayPerUnit(0.1);
        animation.setRestoreOriginalFrame(true);
        var runningAction = new cc.RepeatForever(new cc.Animate(animation));

        var sprite = new cc.Sprite("#anim0.png");
        sprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        //sprite.setRotation(-180);
        sprite.runAction(runningAction);
        this.addChild(sprite, 2);
    },

    update: function (dt) {
        this.count --;
        if ( this.count < 0){
            this.count = 100; // Sau khi chạy đến 100% thì làm gì thì làm
        }
        this.loadingBar.setPercent(this.count);
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

                ZLog.error("Touch Event");
                break;
        }
    },
    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");

                break;

        }
    }

});