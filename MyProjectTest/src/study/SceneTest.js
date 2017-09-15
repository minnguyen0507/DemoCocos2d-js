
var SceneLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao scene test");

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
                break;
        }
    }
});

var SceneTest = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SceneLayer();
        this.addChild(layer);
    }
});

