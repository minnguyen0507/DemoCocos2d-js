
listCards = [];
var TouchEventLayers = cc.Layer.extend({
        ctor: function () {
            this._super();
            this.sprite = null;


            var size = cc.winSize;

            for (var i = 0; i < 14; i++){
                listCards[i] = new cc.Sprite(res.card_0);
                listCards[i].setTag(i);
                listCards[i].setPosition(size.width/2 + i * 30 - 200, size.height/2 - 150); // My pos cards
                this.addChild(listCards[i]);
                var listener = cc.EventListener.create({
                    event : cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches : true,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)});
                    cc.eventManager.addListener(listener, listCards[i]);

            }
            var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
            buttonTest.setAnchorPoint(0.5 , 0.5);
            buttonTest.setPosition( 1050, 50);

            buttonTest.addTouchEventListener(this.touchEvent,this);
            buttonTest.setPressedActionEnabled(true);
            this.addChild( buttonTest, 3);
        return true;

        },

        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);

            //Check the click area
            if(cc.rectContainsPoint(rect, locationInNode)){
                    ZLog.error("Up Sprite");
                    target.runAction(cc.moveTo(0.2, target.getPositionX(),target.getPositionY() + 40));
                return true;
            }
            return false;
        },
        onTouchMoved: function (touch, event) {
            // var target = event.getCurrentTarget();
            // target.setPosition(touch.getLocation());
        },
        onTouchEnded: function (touch, event) {
           //  ZLog.error("touch end");
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
                   ZLog.error("Checkkkkkkkk");
                    break;
            }
        }
});