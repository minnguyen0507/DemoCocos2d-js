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

    actionCocos : function (object, actionType) {
        switch (actionType){
            case ActionsType.MOVETO:
                return object.runAction(cc.moveTo(2, 80, 80));
                break;
            case ActionsType.MOVEBY:
                return object.runAction(cc.moveBy(2, 80, 80));
                break;
            case ActionsType.SCALETO:
                break;
            case ActionsType.SCALEBY:
                break;

            default:
                break;
        }

        var moveBy = cc.moveBy(2, 80, 80);

       return object;
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
                this._actionCocos(spriteTest,ActionsType.MOVEBY);
                break;
        }
    }
});

ActionsType = {
    MOVETO : 0,
    MOVEBY : 1,
    SCALETO : 2,
    SCALEBY : 3,
    ROTATE : 4,
};