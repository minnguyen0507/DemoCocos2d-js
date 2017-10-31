var GUINanBai = AdminBaseGUI.extend({

    ctor: function () {
        this._super();
        this.btnClose = null;
        this.listCards = [];
        this.cardCenter = null;
        this.init();
    },
    init:function () {
        ZLog.error("Vao GUI NAN BAI");

        this._super();
        this.setDeepSyncChildren();
        this.syncAllChildren(res.node_nan_bai_bacay, this);

        cc.spriteFrameCache.addSpriteFrames(res.cards_chips_plist);

        for (var i =0 ; i< 3; i++){
            var cardTest = new cc.Sprite("#card_1.png");
            this.addChild(cardTest,22);
            cardTest.setTag(i);
            cardTest.setPosition(580,309);
            this.listCards.push(cardTest);

            listener = cc.EventListener.create({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches : true,
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved.bind(this),
                onTouchEnded: this.onTouchEnded.bind(this)});
            cc.eventManager.addListener(listener, this.listCards[i]);
        }
    },

    showGui: function () {
        //this.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if(cc.rectContainsPoint(rect, locationInNode)){
            ZLog.error("TOUCH BEN TRONG SPRITE", target.getTag());
            return true;
        }
        ZLog.error("TOUCH BEN NGOAI SPRITE");
        return false;
    },
    onTouchMoved: function (touch, event) {

        var target = event.getCurrentTarget();
        target.setPosition(touch.getLocation());
        ZLog.error("TOUCH MOVED" + JSON.stringify(touch.getLocation()));


    },
    onTouchEnded: function (touch, event) {
        // var target = event.getCurrentTarget();
        // target.setPosition(touch.getLocation());
        // ZLog.error("touch end",target.getTag());
        //
        // if(target.getTag() == 1 ){   //check moved mà > chiều cao || > chiều rộng mặc định nửa quân bài thì mới được set Vị trí
        //     target.runAction(cc.moveTo(0.2,440,309));
        // }
        // else if(target.getTag() == 2){
        //     target.runAction(cc.moveTo(0.2,740,309));
        // }
    },


    onEnter: function() {
        this._super();
        ZLog.error("Joinnnnnn");
    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {

        }
    },
});