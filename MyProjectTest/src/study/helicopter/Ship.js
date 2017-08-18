/**
 * Created by Admin on 18/8/2017.
 */
var gameGravity = -0.05;
var gameThrust = 0.1;
var emitter ; //ống xả của ship

var Ship  = cc.Sprite.extend({
    ctor : function () {
        this._super();
        var size = cc.winSize;
        this.initWithFile(res.helicopter_ship);
        this.ySpeed = 0;
        this.engineOn = false;
        this.invulnerability = 0; // bất khả xâm phạm :))

        emitter = new cc.ParticleSun();
        this.addChild(emitter, 1);
        var myTexture = cc.textureCache.addImage(res.helicopter_particle);
        emitter.setTexture(myTexture);
        emitter.setPosition(this.getPosition().x,this.getPosition().y+10);
        emitter.setStartSize(2);
        emitter.setEndSize(4);

    },
    onEnter : function () {
        this._super();
        this.setPosition(60,160);
    },
    updateY : function () {
        if (this.engineOn){
            this.ySpeed += gameThrust;
        }

        if (this.invulnerability > 0){ //Xu li khi Ship va cham roi restart game, dang nhu co khoang vai giay de hoi phuc
            this.invulnerability --;
            this.setOpacity(255 - this.getOpacity());
        }
        this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
        this.ySpeed += gameGravity;
        if (this.getPosition().y <0 || this.getPosition().y >320){




            //Vuot qua khung man hinh
            cc.log("Vuot qua khung man hinh")
            var getAsteroid  = new Asteroid();
            getAsteroid.restartGame();
        }
    }

});