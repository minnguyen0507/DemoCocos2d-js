
var SceneLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao scene test");

        return true;
    }
});

var SceneTest = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SceneLayer();
        this.addChild(layer);
    }
});

