
var GameMayBayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao game may bay");

        var test = new LayerTest(); // Kế thừa thằng Test
        test.testLayer();           // Thằng Test gọi đến hàm
      //  this.addChild(test);     //Add vào Scene

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

