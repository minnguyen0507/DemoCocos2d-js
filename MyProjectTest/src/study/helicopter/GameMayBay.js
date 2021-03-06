var background;
var ship;

var GameMayBayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        cc.log("vao game may bay");

      //  var test = new LayerTest(); // Kế thừa thằng Test
       // test.testLayer();           // Thằng Test gọi đến hàm
      //  this.addChild(test);     //Add vào Scene

        cc.eventManager.addListener({
            event : cc.EventListener.MOUSE,
            onMouseDown : function (event) {
               ship.engineOn = true;    
            },
            onMouseUp : function (event) {
                ship.engineOn = false;
            }
        },this)


        background = new ScrollingBG();
        this.addChild(background);
        this.scheduleUpdate();
        this.schedule(this.addAsteroid,0.5);
        ship = new Ship();
        this.addChild(ship);
        return true;
    },
    update : function (dt) {
        background.scroll();
        ship.updateY();
    },
    addAsteroid : function (event) {
       var asteroid = new Asteroid();
       this.addChild(asteroid, 1);

    },
    removeAsteroid : function (asteroid) {
        this.removeChild(asteroid);
    }
});

var GameMayBayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameMayBayLayer();
        this.addChild(layer);
    }
});

