
var GUINanBai = BaseGUI.extend({
    ctor: function () {
        this._super();
        this.btnLatBai = null;
        this.listCards =[];
        this.checkNanBai = false;
        this.init();
    },
    init:function () {
        ZLog.error("Vao GUI NAN BAI");

        this.btnLatBai = new ccui.Button("textures/bacay/btn_lat_bai.png", "", "",ccui.Widget.PLIST_TEXTURE);
        this.addChild(this.btnLatBai, 1);
        this.btnLatBai.setTitleText("LAT BAI");
        this.btnLatBai.setTitleFontSize("28");
        this.btnLatBai.setTitleFontName(res.UTM_PenumbraBold);
        this.btnLatBai.setPosition(cc.winSize.width/2, cc.winSize.height/2 - 200);
        this.btnLatBai.addTouchEventListener(this._onTouchUIEvent, this);


    },

    onExit: function () {

    },


    setCallBackNanBai:function (b) {
        this.checkNanBai.setVisible(b);
    },
    getCallBackNanBai: function () {
        return this.checkNanBai;
    },
    initListCardHand: function (listCards) {
        for (var i =0 ; i < listCards.length; i++){
            var pCard= new cc.Sprite("#textures/newcardschips/card_" + listCards[i] + ".png");
            this.addChild(pCard,1);
            pCard.setTag(i);
            pCard.setScale(1.5);
            pCard.setLocalZOrder(i);
            pCard.setPosition(580,309);
            this.listCards.push(pCard);

            var listener = cc.EventListener.create({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches : true,
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved.bind(this),
                onTouchEnded: this.onTouchEnded.bind(this)});
            cc.eventManager.addListener(listener, this.listCards[i]);
        }
        this.checkNanBai = false;
         if (this.listCards.length == 0)
             return;
    },


    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if(cc.rectContainsPoint(rect, locationInNode)){
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {

        var target = event.getCurrentTarget();
        target.setPosition(touch.getLocation());
    },
    onTouchEnded: function (touch, event) {
        var target = event.getCurrentTarget();
        target.setPosition(touch.getLocation());
        ZLog.error("touch end",target.getTag());

        if(target.getTag() == 1 ){   //check moved mà > chiều cao || > chiều rộng mặc định nửa quân bài thì mới được set Vị trí
            target.runAction(cc.sequence(cc.moveTo(0.2,cc.p(740,309)),
                cc.delayTime(1),cc.callFunc(function () {
                    this.closeLayerNanBai();
                }.bind(this))));
        }
        else if(target.getTag() == 2){
            target.runAction(cc.moveTo(0.2,cc.p(440,309)));
        }

    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this.btnLatBai:
                this.closeLayerNanBai();
                break;
        }
    },

    closeLayerNanBai: function () {
        ZLog.error("Function callback");
        this.checkNanBai = true;
        if(sceneMgr.isScene(GV.SCENE_IDS.GAME_BACAY)){
            var _sceneBacay = sceneMgr.getCurrentScene();
            _sceneBacay.callBackLatBai();
            _sceneBacay.callBackActionBet(BACAY_ACTION_TYPE.LAT_BAI);

        }
        this.hide();
        for (var i = 0; i < this.listCards.length; i++) {
            this.listCards[i].removeFromParent();          //Xoá bộ bài
        }
        this.listCards = [];

    }
});