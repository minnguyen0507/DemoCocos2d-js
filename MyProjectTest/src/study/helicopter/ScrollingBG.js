/**
 * Created by Admin on 17/8/2017.
 */
var scrollSpeed = 1;
var ScrollingBG  = cc.Sprite.extend({
    ctor : function () {
      this._super();
      var size = cc.winSize;
      this.initWithFile(res.helicopter_background);
    },
    onEnter : function () {
      this.setPosition(480,160);
    },
    scroll : function () {
      this.setPosition(this.getPosition().x - scrollSpeed, this.getPosition().y);
      if (this.getPosition().x < 0){
          this.setPosition(this.getPosition().x + 480, this.getPosition().y);
      }
    }

});