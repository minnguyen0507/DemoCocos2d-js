
var GameHungBiaLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao Game Hung Bia");

        return true;
    }
});

var GameHungBiaScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameHungBiaLayer();
        this.addChild(layer);
    }
});

