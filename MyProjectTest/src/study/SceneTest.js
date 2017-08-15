
var SceneLayer = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;


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

