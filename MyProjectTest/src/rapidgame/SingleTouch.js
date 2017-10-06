var TouchEventLayers = cc.Layer.extend({
        ctor: function () {
            this._super();
            this.sprite = null;

            var size = cc.winSize;

            this.sprite = new cc.Sprite(res.btn_next);
            this.addChild(this.sprite, 1);
            this.sprite.setPosition(size.width/2, size.height/2);
            this.sprite.tag = 'TouchTarget';

            //Create Event Listener Object
            var listener = cc.EventListener.create({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches : true,
                
                onTouchBegan: function (touch, event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    //Check the click area
                    if(cc.rectContainsPoint(rect, locationInNode)){
                        ZLog.error("Ben trong Sprite");
                        target.runAction(cc.moveTo(0.2, target.getPositionX(),target.getPositionY() + 20));
                        return true;
                    }

                    ZLog.error("Ben ngoai Sprite");
                    return false;
                },
                onTouchMoved: function (touch, event) {
                    var target = event.getCurrentTarget();
                    target.setPosition(touch.getLocation());
                },
                onTouchEnded: function (touch, event) {
                    ZLog.error("touch end");
                }

            });

        cc.eventManager.addListener(listener, this.sprite);
        return true;

        } 
});