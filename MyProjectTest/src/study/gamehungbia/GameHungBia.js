var itemsLayer;
var cart;
var topLayer;
var xSpeed = 0;
var left;
var right;
var touchOrigin;
var touchEnd;
var touching = false;
var GameHungBiaLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao Game Hung Bia");

        var backgroundLayer = new cc.LayerGradient(cc.color(0,0,0,225), cc.color(0x46, 0x82,0xB4,255)); //tao background = mau
        this.addChild(backgroundLayer);

        itemsLayer = new cc.Layer();
        this.addChild(itemsLayer);

        topLayer = new cc.Layer();
        this.addChild(topLayer);

        cart = new cc.Sprite(res.hungbia_cart);
        topLayer.addChild(cart, 0);
        cart.setPosition(240, 24);

        left = new cc.Sprite(res.hungbia_leftbutton);
        topLayer.addChild(left, 0);
        left.setPosition(40, 160);
        left.setOpacity(128);

        right = new cc.Sprite(res.hungbia_rightbutton);
        topLayer.addChild(right, 0);
        right.setPosition(440, 160);
        right.setOpacity(128);
        cc.eventManager.addListener(touchListener, this);

        this.schedule(this.addItem,1);  //Call hàm update từ 1 object khác
        this.scheduleUpdate(); //Call hàm update ở trong object hiện tại
        return true;
    },
    addItem : function () {
        var item = new Item();
        itemsLayer.addChild(item, 1);
    },
    update : function (dt) {
        if (touching){
            xSpeed = (touchEnd.getPositionX() - touchOrigin.getPositionX())/50;
            if (xSpeed > 0){
                cart.setFlippedX(true);
            }
            if (xSpeed < 0){
                cart.setFlippedX(false);
            }
            cart.setPosition(cart.getPositionX() + xSpeed, cart.getPositionY());
        }


    }
    // removeItem : function () {
    //     itemsLayer.removeChild(item);
    // }
});
var touchListener = cc.EventListener.create({
        event : cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches : true,
        onTouchBegan : function (touch, event) {
            if (touch.getLocation().x < 240){
                // xSpeed = -2;
                // left.setOpacity(255);
                // right.setOpacity(128);
                touchOrigin = new cc.Sprite(res.hungbia_touchorigin);
                topLayer.addChild(touchOrigin, 0);
                touchOrigin.setPosition(touch.getLocationX(), touch.getLocationY());

                touchEnd = new cc.Sprite(res.hungbia_touchend);
                topLayer.addChild(touchEnd, 0);
                touchEnd.setPosition(touch.getLocationX(), touch.getLocationY());
                touching = true;
            }
            else{
                // xSpeed = 2;
                // right.setOpacity(255);
                // left.setOpacity(128);
            }
            return true;
        },
        onTouchMoved : function (touch, event) {
            touchEnd.setPosition(touch.getLocationX(), touch.getLocationY());
        },
        onTouchEnded : function (touch, event) {
            // xSpeed = 0;
            // left.setOpacity(128);
            // right.setOpacity(128);

            touch = false;
            topLayer.removeChild(touchOrigin);
            topLayer.removeChild(touchEnd);

        }
});
var GameHungBiaScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameHungBiaLayer();
        this.addChild(layer);
    }
});

