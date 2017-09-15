
var SceneCocostudioLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.btnBack = null;
        this.btnClose = null;
        var size = cc.winSize;
        ZLog.error("Scene Cocostudio");


        sceneConfig = ccs.load(res.scene_cocostudio, "res/");
        nodeCocostudio = sceneConfig.node;
        this.addChild(nodeCocostudio,0);

        this.btnBack = nodeCocostudio.getChildByName("btnBack");
        this.btnClose =  nodeCocostudio.getChildByName("btnClose");

        this.btnBack.addTouchEventListener(this.touchEvent,this);
        this.btnBack.setPressedActionEnabled(true);

        this.btnClose.addTouchEventListener(this.touchEvent,this);
        this.btnClose.setPressedActionEnabled(true);

        return true;
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
                    switch (sender){
                        case this.btnBack:
                            ZLog.error("Click Back");
                            break;
                        case  this.btnClose:
                            ZLog.error("Click Close");
                            break;
                    }
                break;
        }
    }
});

var SceneCocostudio = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SceneCocostudioLayer();
        this.addChild(layer);
    }
});

