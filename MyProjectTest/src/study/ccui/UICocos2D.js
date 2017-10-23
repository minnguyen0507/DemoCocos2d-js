var GUIUICocos2d = AdminBaseGUI.extend({
    _className: "UICocos2d",

    ctor: function() {
        this._super();
        this.loadingBar = null;
        this.count = 100;
        this.init();
    },
    init: function() {
        this._super();

        this._createProgressTimerBar();

        //this._createUISlider();
        //this._createUILoadingBar();

        //this.schedule(this.update, 0.2);
        ZLog.error("Finish new UI");
        return true;

    },

    _createUILabel: function () {

    },
    _createUILabelEffects: function () {

    },

    _createUIMenu: function(){

    },
    _createUIButton: function () {

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
        var to1 = cc.progressTo(5, 0); //trong vòng 5s chạy từ 100-> 0
        testProgressTimer.runAction(to1);
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

    update: function (dt) {
        this.count --;
        if ( this.count < 0){
            this.count = 100; // Sau khi chạy đến 100% thì làm gì thì làm
        }
        this.loadingBar.setPercent(this.count);
    },
    onTouchUIEndEvent: function(sender){
        switch (sender) {
            case this.btnClose:
                ZLog.error("ok");

                break;

        }
    }

});