/**
 * Created by Admin on 22/8/2017.
 */
var world;
var worldScale =30;
var GameToTemLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao game Totem");

        var backgroundLayer = new cc.LayerGradient(cc.color(0xdf,0x9f,0x83,255), cc.color(0xfa,0xf7,0x9f,255));
        this.addChild(backgroundLayer);

        var gravity = new Box2D.Common.Math.b2Vec2(0, -10);
        world = new Box2D.Dynamics.b2World(gravity, true);

        this.addBody(240, 10, 480, 20, false, res.totem_ground, "ground" );
        //240 : trung tâm ngang của ảnh, tính  = pixel
        //10 : trung tâm ảnh dọc của ảnh
        //480 : kích thước chiều dài ảnh
        //20 : kích thước chiều rộng của ảnh
        //False : kiểm tra xem ảnh có hoạt động không? vì  đây là ảnh tĩnh không hoạt động nên False
        //res.totem_ground : nơi chứa ảnh
        //ground : tên gọi của ảnh
        
        this.scheduleUpdate();

        return true;
    },
    update : function (dt) {
        world.Step(dt, 10, 10);
        ZLog.error("world");
    }
});

var GameToTemScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameToTemLayer();
        this.addChild(layer);
    }
});

