/**
 * Created by Admin on 17/8/2017.
 */
var spriteTest;
var CocosActions = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init : function(){
        var size = cc.winSize;

        var buttonTest = new ccui.Button(res.btn_next, res.btn_next, res.btn_next);
        //buttonTest.loadTextures(res.btn_next, res.btn_next, res.btn_next);
        buttonTest.setAnchorPoint(0.5 , 0.5);
        // buttonTest.setPosition( size.width /2, size.height * 0.25);
        buttonTest.setPosition( 1050, 50);
        buttonTest.addTouchEventListener(this.touchEvent,this);
        buttonTest.setPressedActionEnabled(true);
        this.addChild(buttonTest, 3);

        spriteTest = new cc.Sprite(res.helicopter_ship);
        this.addChild(spriteTest,1);
        spriteTest.setPosition(size.width/2, size.height/2);
        spriteTest.setAnchorPoint(0.5, 0.5);




        ZLog.error("Cocos Actions Finish");
    },

    _actionMoveTo : function (_object) {
        _object.runAction(cc.moveTo(2, 80, 80));
    },

    _actionMoveBy : function (_object) {
        _object.runAction(cc.moveBy(1, 80, 80));
    },

//action lần lượt
    _actionSequence: function (_object) {
        var moveBy = cc.moveBy(2,80,80);
        var comeBack = moveBy.reverse(); // quay về vị trí cũ
        _object.runAction(cc.sequence(moveBy,comeBack));
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
                 this._actionSequence(spriteTest);
                break;
        }
    }
});