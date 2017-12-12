var GUIDatCuoc = BaseGUI.extend({
    ctor: function () {
        this._super();
        this.imgSlider = null;
        this.lbGoldBet = null;
        this.buyIn = 0;
        this.dataCashGame = {};
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

    setData: function (data) {
        ZLog.error("dataaa ", JSON.stringify(data));
        this.dataCashGame = data;
        var configTable = resourceMgr.getConfigTableCashGame(data.structureId);
        this.buyIn = configTable.buyInMin;
        this.imgSlider.setPercent(5);
        this.lbGoldBet.setString(Utility.formatMoney(configTable.buyInMin));
        this.lbGoldBet.setPositionY(this.imgSlider.getPositionX() - this.imgSlider.getContentSize().width/2 + (this.imgSlider.getContentSize().width)*this.imgSlider.getPercent()/100);
    },

    showGui : function () {
        this.setVisible(true);
        this.setPosition(50,330);
    },
    hideGui: function(){
        this.setVisible(false);
    },

    resetBetting: function () {
        this.imgSlider.getPercent();
        this.lbGoldBet.setString(Utility.formatMoney(this.getGoldDatCuoc()));
        this.lbGoldBet.setPositionY(this.imgSlider.getPositionX() - this.imgSlider.getContentSize().width/2 + (this.imgSlider.getContentSize().width)*this.imgSlider.getPercent()/100);
    },

    setGoldDatCuoc: function (data) {
        this.buyIn = data;
    },

    getGoldDatCuoc: function(){
        return this.buyIn;
    },

    sliderEvent: function (sender, type) {
        switch (type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:

                if(this.imgSlider.getPercent() < 5){
                    this.imgSlider.setPercent(5);
                }
                if(this.imgSlider.getPercent() > 95){
                    this.imgSlider.setPercent(95);
                }

                // var data = {};
                // data.tableID = this.dataTable.tableID;
                // var configTable = resourceMgr.getConfigTableCashGame(this.dataTable.structureId);
                // ZLog.error("-------aaaa" + JSON.stringify(configTable));
                var data = {};
                var configTable = resourceMgr.getConfigTableCashGame(this.dataCashGame.structureId);
                data.buyInMax = configTable.buyInMax;
                data.buyInMin = configTable.buyInMin;
                data.blindLevel = configTable.blindLevel;

                var truePercent = (this.imgSlider.getPercent() - 5) * 100 / 90;

                var delta =  data.buyInMax - data.buyInMin;
                var step = data.blindLevel << 1;
                var value = data.buyInMin+ Math.ceil((truePercent * delta / 100) / step) * step;

                if(value > data.buyInMax ){
                    value = data.buyInMax;
                }


                this.setGoldDatCuoc(value);

                this.lbGoldBet.setPositionY(this.imgSlider.getPositionX() - this.imgSlider.getContentSize().width/2 + (this.imgSlider.getContentSize().width)*this.imgSlider.getPercent()/100)
                this.lbGoldBet.setString(Utility.formatMoney(value));
                break;
        }
    },
});