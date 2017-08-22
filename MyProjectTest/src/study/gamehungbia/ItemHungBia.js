/**
 * Created by Admin on 22/8/2017.
 */
var size = cc.winSize;
var Item  = cc.Sprite.extend({
    ctor : function () {
        this._super();
        var size = cc.winSize;
        if (Math.random() < 0.5){
            this.initWithFile(res.hungbia_bomb);
            this.isBomb = true;
        }
        else{
            this.initWithFile(res.hungbia_strawberry);
            this.isBomb = false;
        }

    },
    onEnter : function () {
        this._super();
        this.setPosition(Math.random() * 400 + 40, 350);
        var moveAction = new cc.MoveTo(8, cc.p(Math.random() * 400 + 40, -50));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
    update : function (dt) {
      if (this.getPositionY() < 35 && this.getPositionY() > 30 && Math.abs(this.getPositionX() - cart.getPositionX()) < 10 && !this.isBomb ){
          //gameLayer.removeItem(this);
          this.removeFromParent();
           ZLog.error("Fruit"); //trai cay
      }
      if(this.getPosition().y < 35 && Math.abs(this.getPosition().x - cart.getPosition().x) < 25 && this.isBomb){
          //gameLayer.removeItem(this);
          this.removeFromParent();
          ZLog.error("BOMB"); // bomb
      }
      if (this.getPositionY() < -30){
          //gameLayer.removeItem(this);
          this.removeFromParent();
          ZLog.error("??");  // trai cay + bomb roi ra ngoai man hinh
      }
    },
    testFunction : function () {
        //xu ly ham gi o day cung duoc
    }

});