var BaseCards = cc.Sprite.extend({
    ctor:function () {
        this._super("#newcardschips/card_black.png");
        this.idx = - 1;
        this.num = 0;
        this.suit = 0;
        this.typeCard = TYPE_CARD.CARD_NORMAL;
        this.init();

    },

    init: function () {
      this.idx = 0;
      this.num = 0;
      this.suit = 0;
    },

    setIdx: function (id) {
        this.idx = id;
        //this.setSpriteFrame("newcardschips/card_" + id + ".png");  //Fix show bai
    },

    getIdx: function () {
      return this.idx;
    },

    getNumOfCard : function () {
        if (this.idx < 0)
            return 0;
        return Math.ceil(this.idx / 4);
    },
    getSuitOfCard: function () { /// 1 : bich , 2 : tep , 3 : ro , 4 : co
        if (this.idx < 0)
            return 0;
        return this.idx % 4;
    },

    flipCards: function () {
        var scale = 0;
        switch(this.typeCard){
            case TYPE_CARD.CARD_SMALL:
                scale = 0.5 ;
                break;
            case TYPE_CARD.CARD_NORMAL:
                scale = 1;
                break;
            case TYPE_CARD.CARD_BIG:
                scale = 1.5;
                break;
        }

        var scaleTo = cc.scaleTo(0.4, 0.1, scale);
        var comeBack = cc.scaleTo(0.4, scale,scale);
        var delay = cc.delayTime(0.05);
        var sum = 0;
        this.runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender,data) {

            sender.setSpriteFrame("newcardschips/card_" + data + ".png");

        },this,this.idx),comeBack)));
    },

    setTypeCard: function (type) {
        this.typeCard = type;
        switch(type){
            case TYPE_CARD.CARD_SMALL:
                this.setScale(0.5);
                break;
            case TYPE_CARD.CARD_NORMAL:
                this.setScale(1);
                break;
            case TYPE_CARD.CARD_BIG:
                this.setScale(1.5);
                break;
        }
    },



});


TYPE_CARD ={
    CARD_SMALL :0,
    CARD_NORMAL: 1,
    CARD_BIG: 2,
};