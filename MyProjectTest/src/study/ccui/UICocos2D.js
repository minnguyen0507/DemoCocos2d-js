var GUIUICocos2d = AdminBaseGUI.extend({
    _className: "UICocos2d",

    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();
        this._createUISlider();
        ZLog.error("Finish new UI");
        return true;

    },

    _createUISlider: function () {
        var uiSlider = new ccui.Slider();
        uiSlider.setTouchEnabled(true);
        uiSlider.loadBarTexture(res.slider_track); // Nút kéo
        uiSlider.loadSlidBallTextures(res.slider_thumb,res.slider_thumb,"");
        uiSlider.loadProgressBarTexture(res.slider_progress);
        uiSlider.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(uiSlider, 2);
        uiSlider.addEventListener(this.sliderEvent ,this);
    },
    sliderEvent: function (sender, type) {
        switch (type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                ZLog.error("Percent " + sender.getPercent().toFixed(0));
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