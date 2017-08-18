/**
 * Created by Admin on 17/8/2017.
 */
var BaseLayerTest = cc.Layer.extend({
    ctor : function () {
      this._super();

      var size = cc.winSize;

      var spriteTest = new cc.Sprite(res.btn_next);
      this.addChild(spriteTest,1);
      spriteTest.setPosition(size.width/2, size.height/2);
      spriteTest.setAnchorPoint(0.5, 0.5);
    },

    testLayer : function () {
        var size = cc.winSize;
        var bgTest = new cc.Sprite(res.bg_test);
        this.addChild(bgTest,1);
        bgTest.setPosition(size.width/2, size.height/2);
        bgTest.setAnchorPoint(0.5, 0.5);
    },
});