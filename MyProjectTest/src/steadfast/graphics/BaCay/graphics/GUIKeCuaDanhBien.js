var GUIKeCuaDanhBien = BaseGUI.extend({
    ctor: function () {
        this._super();
        this.lbTitle = null;
        this.slider = null;
        this.buyIn = null;
        this.btnHuy = null;
        this.btnOk = null;
        this.lbMin = null;
        this.lbMax = null;
        this.lbMoneySlider = null;
        this._type = 0;
        this._goldKeCuaDanhBien = 0;
        this._dataTable  = null;
        this.btnSub = null;
        this.btnAdd = null;
        this.buyIn = 0;
        this._playerID = 0;
        this.init();

    },
    init: function () {
        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_betting_kecua_danhbien_bacay, this);
        this.slider.addEventListener(this.sliderEvent ,this);
        var size = cc.winSize;

    },

    getType : function () {
        return this._type;
    },

    getDataTable: function () {
        return this._dataTable;
    },


    getGoldKeCuaDanhBien: function () {
        return this._goldKeCuaDanhBien;
    },

    setData:function (data,type,uid) {
        this._dataTable = resourceMgr.getConfigTableCashGame(data.structureId);
        ZLog.error("dataa table KE cua"+ JSON.stringify(type));
        this._playerID = uid;

        this._type = type;
        if(type == 1){
            this.lbTitle.setString("Ke Cua");
        }
        else{
            this.lbTitle.setString("DANH BIEN");
        }this._goldKeCuaDanhBien = this._dataTable.buyInMin;
        this.buyIn = this._dataTable.buyInMin;

        this.lbMax.setString(Utility.formatMoney(this._dataTable.buyInMax));
        this.lbMin.setString(Utility.formatMoney(this._dataTable.buyInMin));
        this.slider.setPercent(5);
        this.lbMoneySlider.setString(Utility.formatMoney(this._dataTable.buyInMin));
        this.lbMoneySlider.setPositionX(this.slider.getPositionX() - this.slider.getContentSize().width/2 + (this.slider.getContentSize().width)*this.slider.getPercent()/100);
    },

    sliderEvent: function (sender, type) {
        switch (type){
            case ccui.Slider.EVENT_PERCENT_CHANGED:

                if(this.slider.getPercent() < 5){
                    this.slider.setPercent(5);
                }
                if(this.slider.getPercent() > 95){
                    this.slider.setPercent(95);
                }

                var data = {};
                var configTable = resourceMgr.getConfigTableCashGame(this._dataTable.structureId);
                data.buyInMax = configTable.buyInMax;
                data.buyInMin = configTable.buyInMin;
                data.blindLevel = configTable.blindLevel;

                var truePercent = (this.slider.getPercent() - 5) * 100 / 90;

                var delta =  data.buyInMax - data.buyInMin;
                var step = data.blindLevel << 1;
                var value = data.buyInMin+ Math.ceil((truePercent * delta / 100) / step) * step;

                if(value > data.buyInMax ){
                    value = data.buyInMax;
                }

                this._goldKeCuaDanhBien = value;


                this.lbMoneySlider.setPositionX(this.slider.getPositionX() - this.slider.getContentSize().width/2 + (this.slider.getContentSize().width)*this.slider.getPercent()/100)
                this.lbMoneySlider.setString(Utility.formatMoney(value));
                break;
        }
    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this.btnHuy:
                ZLog.error("Touch CLOSE");
                this.hide();
                break;
            case this.btnOk:
                if(this.getType() == 1){
                    if(sceneMgr.isScene(GV.SCENE_IDS.GAME_BACAY)){
                        ZLog.error("Touch OK KE CUA");
                        var _sceneBacay = sceneMgr.getCurrentScene();
                        _sceneBacay.callBackActionBet(BACAY_ACTION_TYPE.BET_KE_CUA, this._playerID);
                    }
                }else{
                    if(sceneMgr.isScene(GV.SCENE_IDS.GAME_BACAY)){
                        ZLog.error("Touch OK DANH BIEN");
                        var _sceneBacay = sceneMgr.getCurrentScene();
                        _sceneBacay.callBackActionBet(BACAY_ACTION_TYPE.BET_DANH_BIEN, this._playerID);
                    }
                }
                this.hide();
                break;
            case this.btnSub:
                var offset = this._dataTable.blindLevel << 1;
                this.buyIn = Math.max(this._dataTable.buyInMin, this.buyIn - offset);
                this.slider.setPercent(5 + (this.buyIn - this._dataTable.buyInMin) * 85 / (this._dataTable.buyInMax - this._dataTable.buyInMin));
                this.lbMoneySlider.setString(Utility.formatMoney(this.buyIn));
                break;

            case this.btnAdd:
                offset = this._dataTable.blindLevel << 1;

                this.buyIn = Math.min(this._dataTable.buyInMax, this.buyIn + offset);
                this.slider.setPercent(10 + (this.buyIn - this._dataTable.buyInMin) * 85 / (this._dataTable.buyInMax - this._dataTable.buyInMin));
                this.lbMoneySlider.setString(Utility.formatMoney(this.buyIn));
                break;
        }
    }
});