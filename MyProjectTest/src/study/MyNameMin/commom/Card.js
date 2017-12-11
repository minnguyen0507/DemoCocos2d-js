var Card = cc.Sprite.extend({
    ctor: function () {
        this._super("#textures/cards/back.png"); //khởi tạo mặc định là quân bài đen
        this.idxCard = -1; // số id server trả về
        this.N = 0;
        this.S = 0;
        this.cardName = "";
        this._type = TYPE_CARD.CARD_NORMAL;
        this._isClicked = false;
        this.init();

    },

    init: function () {
        this.idxCard = 0;
        this.N = 0;
        this.S = 0;
    },

    setIdCard: function (id) {
        this.idxCard = id;
    },

    getIdx: function () {
        return this.idxCard;
    },

    setClicked: function (b) {
        this._isClicked = b;
    },

    getClicked: function () {
        return this._isClicked;
    },

    getNumOfCard: function () {
        return this.N;
    },

    getSuitOfCard: function () { /// 1 : bich , 2 : tep , 3 : ro , 4 : co
        return this.S;
    },

    flipCard: function () {
        this.decodeCard();
        var sourceName = this.getResourceName();
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(sourceName);
        if (!spriteFrame || spriteFrame === undefined) {
            this.idxCard = -1;
            return;
        }

        var scale = this.getScale();
        var scaleTo = cc.scaleTo(0.4, 0.1, scale);
        var comeBack = cc.scaleTo(0.4, scale, scale);
        var delay = cc.delayTime(0.05);

        this.runAction(cc.sequence(scaleTo, delay, cc.spawn(cc.callFunc(function (sender) {
            sender.setSpriteFrame(spriteFrame);
        }, this), comeBack)));
    },

    setTypeCard: function (type) {
        this._type = type;
        switch (type) {
            case TYPE_CARD.CARD_SMALL:
                this.setScale(0.4);
                break;
            case TYPE_CARD.CARD_NORMAL:
                this.setScale(0.5);
                break;
            case TYPE_CARD.CARD_BIG:
                this.setScale(1);
                break;
        }
    },

    getCardContentSize: function () {
        var sizeW = this.getContentSize().width * this.getScale();
        var sizeH = this.getContentSize().height * this.getScale();
        return cc.size(sizeW, sizeH);
    },

    setTextureWithCode: function (code) {
        this.setIdCard(code);
        this.decodeCard();
        var sourceName = this.getResourceName();
        this.setSpriteFrame(sourceName);

    },

    showCard : function () {
        this.decodeCard();
        var sourceName = this.getResourceName();
        this.setSpriteFrame(sourceName);
    },

    decodeCard: function () {
        switch (moduleMgr.getLobbyModule().getGameID()) { //lay id game
            case GAME_ID.BA_CAY:
                if (this.idxCard > 0 && this.idxCard < 10) {
                    this.S = 1;
                } else if (this.idxCard > 40 && this.idxCard < 290) {
                    this.S = 2;
                }
                if (this.idxCard > 500 && this.idxCard < 4510) {
                    this.S = 4;
                }
                if (this.idxCard > 15001 && this.idxCard < 150052) {
                    this.S = 3;
                }
                this.N = this.idxCard % 10;
                break;
            case GAME_ID.TIEN_LEN:
                this.S = this.idxCard % 4 + 1;
                this.N = Math.floor(this.idxCard / 4) + 1;

                if (this.N === 1) {
                    this.N = 14;
                }
                if (this.N === 2) {
                    this.N = 15;
                }
                break;
        }
    },

    encodeCard: function () {
        var encodeValue = 0;
        switch (moduleMgr.getLobbyModule().getGameID()) { //lay id game
            case GAME_ID.BA_CAY:
                break;
            case GAME_ID.TIEN_LEN:
                encodeValue = 13 * ( this.S - 1) + this.N - 2;
                break;
            default:
                encodeValue = 13 * ( this.S - 1) + this.N - 1;
                break;
        }
        return encodeValue;
    },

    getResourceName: function () {
        var value = 0;
        if (this.N === 15) {
            value = 2;
        } else if (this.N === 14) {
            value = 1;
        } else {
            value = this.N;
        }
        if (value > 0) {
            this.cardName = cards_dir + (value + this.getSuitInVietnamese()) + ".png";
            return this.cardName;
        } else {
            return "textures/cards/back.png";
        }
    },

    getSuitInVietnamese: function () {
        if (this.S === 1)
            return "b"; //bich
        if (this.S === 2)
            return "t"; //tep
        if (this.S === 3)
            return "r"; //ro
        if (this.S === 4)
            return "c"; //co
        return "-1";
    },

    runEffectDealCard: function (posTo, delayTime, timeMove, bHiddenWhenFinish, scale) {

        this.stopAllActions();
        this.setVisible(true);
        var ac1 = cc.sequence(cc.scaleTo(timeMove * 0.45, scale * 1.1), cc.scaleTo(timeMove * 0.45, scale));
        var ac2 = cc.spawn(ac1, cc.moveTo(timeMove, posTo));
        this.runAction(cc.sequence(
            cc.delayTime(delayTime),
            ac2,
            cc.delayTime(0.25),
            cc.callFunc(function () {
                this.setVisible(!bHiddenWhenFinish);
            }, this)));
    }

});


TYPE_CARD = {
    CARD_SMALL: 0,
    CARD_NORMAL: 1,
    CARD_BIG: 2,
};