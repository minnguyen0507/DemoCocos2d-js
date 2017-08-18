/**
 * Created by Admin on 18/8/2017.
 */
var gameGravity = -0.05;
var gameThrust = 0.1;

var Ship  = cc.Sprite.extend({
    ctor : function () {
        this._super();
        var size = cc.winSize;
        this.initWithFile(res.helicopter_ship);
        this.ySpeed = 0;
        this.engineOn = false;
    },
    onEnter : function () {
        this.setPosition(60,160);
    },
    updateY : function () {
        if(this.engineOn){
            this.ySpeed += gameThrust;
        }
        this.setPosition(this.getPosition().x, this.getPosition().y + this.ySpeed);
        this.ySpeed += gameGravity;
    }

});