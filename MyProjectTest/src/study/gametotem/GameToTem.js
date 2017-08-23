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
        //240 : vị trí ngang của ảnh (posX), tính  = pixel
        //10 :  vị trí dọc của ảnh (posY)
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
    },
    addBody : function (posX, posY, width, height, isDynamic, spriteImage, type) {
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef;  //tạo 1 khung cảnh vật lý
        fixtureDef.density = 1.0;   //density : tỉ trọng ==>Thuộc tính ảnh hưởng đến khối lượng cơ thẻ
        fixtureDef.friction = 0.5;  // friction: ma sát ==> xác định cơ thể trượt dọc theo nhau
        fixtureDef.restitution = 0.2;//restitution: bồi thường || trả lại ==>  sử dụng để xem làm thế nào để bị trả lại
        fixtureDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;  //tạo ra hình dạng gắn liền với vật cố định
        fixtureDef.shape.SetAsBox(0.5 * width/worldScale, 0.5 * height/worldScale); //tạo ra 1 hộp có chiều rộng và chiều cao mà box2D chấp nhận = nửa vs chiều rộng và chiều cao thực

        var bodyDef = new Box2D.Dynamics.b2BodyDef; //tạo vật lý
        if(isDynamic){                              //check tĩnh hay động
            bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        }
        else{
            bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        }
        bodyDef.position.Set(posX/worldScale, posY/worldScale);

        var userSprite = new cc.Sprite(spriteImage);  // lưu trữ các Sprite
        this.addChild(userSprite, 0);
        userSprite.setPosition(posX, posY);
        bodyDef.userData = {
            type: type,
            asset : userSprite
        }

        var body = world.CreateBody(bodyDef); //tạo ra 1 cơ thể vật lý
        body.CreateFixture(fixtureDef);     //CreateFixture sẽ gắn một vật cố định vào hình dạng (ở đây là ảnh)
    }
});

var GameToTemScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameToTemLayer();
        this.addChild(layer);
    }
});

