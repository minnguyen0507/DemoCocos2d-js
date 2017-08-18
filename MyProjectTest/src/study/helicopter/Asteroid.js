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
        this.setPosition(400,Math.random() *320);
        cc.log("sssssssssssss",Math.random() *320);
        // var moveAction= cc.MoveTo.create(2.5, new cc.Point(-100,Math.
        //     random()*320));
        var moveAction= new cc.MoveTo(2.5, cc.p( 60, 160 ) );
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update : function (dt) {
        if (this.getPosition().x < -50){
            GameMayBayLayer.removeAsteroid(this);
        }
    }

});