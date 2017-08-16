
var GameLatBai = cc.Layer.extend({
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        cc.log("yessss");
        
        for ( i= 0; i< 16; i++){
        	var tile = new cc.Sprite(res.cover);
        	this.addChild(tile, 0);
        	tile.setPosition(49+ i%4 *74, 400- Math.floor( i/4) * 74);
        }
        
        
        

        return true;
    }
});

var GameLatBaiScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLatBai();
        this.addChild(layer);
    }
});

