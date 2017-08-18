/**
 * Created by Admin on 17/8/2017.
 */
var size = cc.winSize;
var BaseSpriteTest  = cc.Sprite.extend({
    ctor : function () {
      this._super();
      var size = cc.winSize;
      this.initWithFile(res.cover);
    },
    onEnter : function () {
        this._super();
      this.setPosition(200,200);
    },
    testFunction : function () {
        //xu ly ham gi o day cung duoc
    }

});