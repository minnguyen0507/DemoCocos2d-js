
var GuiVuotBai = AdminBaseGUI.extend({
    ctor: function () {
        this._super();
        this.cardPos = cc.p(0,0);
        this.init();
    },
    init: function () {
        ZLog.error("Vao GUI Vuot Bai");


    },

    initListCardsHand : function () {
        for (var i = 0; i < 3; i++){
            var spCards = new cc.Sprite(res.card_black);
            spCards.setTag(i);
            spCards.setPosition(cc.winSize.width/2 + i * 90 - 60, cc.winSize.height/2 - 160); // My pos cards
            spCards.setScale(0.7);
            this.addChild(spCards);
            var listener = cc.EventListener.create({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches : true,
                onTouchBegan: this.onTouchBegan.bind(this),
                onTouchMoved: this.onTouchMoved.bind(this),
                onTouchEnded: this.onTouchEnded.bind(this)});
            cc.eventManager.addListener(listener, spCards);
        }
    },

    finishTouchCards : function () {
        this.hide();
        this.cleanup();
    },
    cleanup: function () {
        //do something
    },

    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        this.cardPos = target.getPosition();
        //Check the click area
        if(cc.rectContainsPoint(rect, locationInNode)){
            ZLog.error("Up Sprite");
         var test = this.getParent();
         test.callBackNanBai();

            // target.runAction(cc.moveTo(0.2, target.getPositionX(),target.getPositionY() + 40));
            return true;
        }
        ZLog.error("NULL");
        // target.runAction(cc.moveTo(0.2, target.getPositionX(),target.getPositionY()));
        return false;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        //var locationInNode = target.getPositionY();
        ZLog.error("POs Y",target.getPositionY());
        // if(touch.getLocation().y < 160) // Khong cho no moved xuong duoi quan bai
        //     return;
        target.setPositionY(touch.getLocation().y);
        ZLog.error("this.cardsPost" + JSON.stringify(this.cardPos));


    },
    onTouchEnded: function (touch, event) {
         var target = event.getCurrentTarget();
        // ZLog.error("touch end getTag" + target.getTag());
        if(target.getPositionY() > 200 || target.getPositionY() < 120){
            if(target.getPositionY() > 200){ // move len tren
                target.runAction(cc.sequence(cc.moveTo(0.2,cc.p(target.getPositionX(),target.getPositionY() + 100)),cc.fadeOut(0.5),cc.removeSelf()));
            }
            else{ //move xuong duoi
                target.runAction(cc.sequence(cc.moveTo(0.2,cc.p(target.getPositionX(),target.getPositionY() - 100)),cc.fadeOut(0.5),cc.removeSelf()));
            }

        }
        else{
            target.setPosition(this.cardPos);
        }
    },
});