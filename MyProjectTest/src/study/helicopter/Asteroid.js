/**
 * Created by Admin on 18/8/2017.
 */
//Asteroid = nhung vat bay xung quanh
var Asteroid  = cc.Sprite.extend({
    ctor : function () {
        this._super();
        var size = cc.winSize;
        this.initWithFile(res.helicopter_store);
    },
    onEnter : function () {
        this._super();
        this.setPosition(600,Math.random() *320);
        var moveAction= cc.MoveTo.create(2.5, new cc.Point(-100,Math.random()*320));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    restartGame : function () {
      ship.ySpeed = 0;
      ship.setPosition(ship.getPosition().x, 160);
      ship.invulnerability =100;
    },
    update : function (dt) {
        var shipBoundingBox = ship.getBoundingBox(); //Lay doi tuong hcn cua object
        var asteroidBoundingBox = this.getBoundingBox();
        if (cc.rectIntersectsRect(shipBoundingBox, asteroidBoundingBox) && ship.invulnerability == 0){  //Xu li va cham
           // GameMayBayLayer.removeAsteroid(this);
            this.removeFromParent();
            this.restartGame();
        }
        if (this.getPosition().x < -50){
           cc.log("Xoa khoi Scene");
           this.removeFromParent();
          // GameMayBayLayer.removeAsteroid(this); // Van chua hieu tai sao ham nay ko xoa duoc
        }
    }

});