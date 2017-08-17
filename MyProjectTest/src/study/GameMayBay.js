
var GameMayBayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao game may bay");

        return true;
    }
});

var GameMayBayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameMayBayLayer();
        this.addChild(layer);
    }
});

