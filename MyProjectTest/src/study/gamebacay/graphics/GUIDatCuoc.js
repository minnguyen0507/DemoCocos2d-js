var GUIDatCuoc = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.imgSlider = null;
        this.lbGoldBet = null;
        this.init();

    },
    init: function () {
        var size = cc.winSize;
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_betting_bacay, this);
        this.imgSlider.addEventListener(this.sliderEvent ,this);

        ZLog.error("Finish Dat Cuoc");
    },

    showGui : function (tag) {
        ZLog.error("Taggg",tag);

        if(tag % 2 ){
            this.setPosition(cc.winSize.width/2, cc.winSize.height/2); // ngang
            this.imgSlider.setPosition(0,0);
            this.lbGoldBet.setPosition(38,66);
            this.imgSlider.setRotation(0);
            this.imgSlider.setPercent(10);
            this.lbGoldBet.setString(1000);
        }
        else{
            this.setPosition(cc.winSize.width/2, cc.winSize.height/2); // doc
            this.imgSlider.setPosition(0,0);
            this.lbGoldBet.setPosition(38,66);
            this.imgSlider.setRotation(-90);
            this.imgSlider.setPercent(10);
            this.lbGoldBet.setString(1000);
        }


    },

    sliderEvent: function (sender, type) {
        switch (type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:
                ZLog.error("Percent " + sender.getPercent().toFixed(0));

                    this.lbGoldBet.setPositionX(this.imgSlider.getPositionX() - this.imgSlider.getContentSize().width/2 + (this.imgSlider.getContentSize().width)*this.imgSlider.getPercent()/100 + 220);
                    this.lbGoldBet.setString(AdminRandom.randomBetweenNumber(1000,5000));
                break;
        }
    },
});