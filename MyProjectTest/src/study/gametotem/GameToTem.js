/**
 * Created by Admin on 22/8/2017.
 */

var GameToTemLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao game Totem");

        return true;
    }
});

var GameToTemScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameToTemLayer();
        this.addChild(layer);
    }
});

