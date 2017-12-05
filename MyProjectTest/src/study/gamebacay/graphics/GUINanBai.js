var BaCayNanBai = AdminBaseGUI.extend({
    arrCardTypes: [],
    CardOnHand: [],
    sizeScreen: cc.size(0, 0),
    disTouchBegan: cc.size(0, 0),
    pointTouchBegan: cc.size(0, 0),
    bottomCard: 0,
    leftCard: 0,
    rightCard: 0,

    widthCard: 0,
    heightCard: 0,

    startLeft: 0,
    startTop: 0,

    //Nan 3 Cay
    dx: 0,
    dy: 0,
    _index: 0,
    _where: 0,
    isTouched: false,

    //Bat dau nan 3 cay
    deltaX: 0,
    deltaY: 0,
    sX: 0,
    sY: 0,
    xcu: 0,
    ycu: 0,
    cardIndex: 0,

    //Touch move
    cardIndex_under: 0,
    flag_move: false,
    flag_left: 0,
    flag_right: 0,
    count_move: 0,

    //Touch end
    vt: 0,
    m_callback: null,
    m_callbackListener: null,
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        // this.setAnchorPoint(0, 0);
        // this.setPosition(0, 0);

        this.sizeScreen = cc.director.getVisibleSize();

        this.startLeft = 0;
        this.startTop = 0;

        this.dx = 0;
        this.dy = 0;
        this._index = -1;
        this._where = -1;
        this.isTouched = false;

        this.deltaX = 0;
        this.deltaY = 0;
        this.sX = 0;
        this.sY = 0;
        this.xcu = 0;
        this.ycu = 0;

        this.cardIndex = 2;

        //Touch move
        this.cardIndex_under = 0;
        this.flag_move = false;
        this.flag_left = this.flag_right = -1;
        this.count_move = 0;

        //touch end
        this.vt = -1;

        this.bottomCard = this.sizeScreen.height >> 1;
        this.leftCard = this.sizeScreen.width >> 1;
        this.rightCard = this.leftCard;


        this.widthCard = 94 * 1.2;
        this.heightCard = 130 * 1.2;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

    },

    onExit: function () {
        this._super();
    },

    ConvertPoint: function (point) {
        var xCenter = this.sizeScreen.width / 2;
        var yCenter = this.sizeScreen.height / 2;

        var xTap = point.x;
        var yTap = point.y;

        var x1, x2;
        var y1, y2;

        var A = ((Math.pow(xCenter - xTap, 2) + Math.pow(yCenter - yTap, 2)));
        var B = Math.pow((yCenter - yTap) / (xCenter - xTap), 2) + 1;

        x1 = xCenter + Math.sqrt(A / B);
        x2 = xCenter - Math.sqrt(A / B);

        y1 = yCenter + (yCenter - yTap) * (x1 - xCenter) / (xCenter - xTap);
        y2 = yCenter + (yCenter - yTap) * (x2 - xCenter) / (xCenter - xTap);

        if ((xTap < xCenter && x1 < xCenter) || (xTap > xCenter && x1 > xCenter)) {
            x1 -= this.startLeft;
            y1 -= this.startTop;

            point.x = x1;
            point.y = y1;
        } else if ((xTap < xCenter && x2 < xCenter) || (xTap > xCenter && x2 > xCenter)) {
            x2 -= this.startLeft;
            y2 -= this.startTop;

            point.x = x2;
            point.y = y2;
        } else {
            cc.log("no define point convert");
        }
        return point;
    },

    initListCardHand: function (listCardsSever) {

        for (var i = 0; i < listCardsSever.length; ++i) {

            var pCard = new cc.Sprite("#textures/newcardschips/card_black.png");
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame("textures/newcardschips/card_" + listCardsSever[i] + ".png");
            if(spriteFrame || spriteFrame !== undefined)
                pCard.setSpriteFrame(spriteFrame);

            pCard.setScale(1.2);
            pCard.setPosition(this.leftCard, this.bottomCard);
            pCard.setLocalZOrder(i + 1);

            this.addChild(pCard);
            this.CardOnHand.push(pCard);
        }
        this.xMin = this.leftCard - (this.widthCard >> 1);
        this.xMax = this.leftCard + (this.widthCard >> 1);
        this.yMin = this.bottomCard - (this.heightCard >> 1);
        this.yMax = this.bottomCard + (this.heightCard >> 1);


        if (this.CardOnHand.length === 0)
            return;


        this.cardIndex = parseInt(this.CardOnHand.length - 1);
        var btnLatBai = new ccui.Button("textures/bacay/btn_lat_bai.png", "", "", ccui.Widget.PLIST_TEXTURE);
        this.addChild(btnLatBai, 1);
        btnLatBai.setTitleText("Lật bài");
        btnLatBai.setTitleFontSize("28");
        btnLatBai.setTitleFontName(res.UTM_PenumbraBold);
        btnLatBai.setPosition(cc.winSize.width / 2, cc.winSize.height / 2 - 200);
        btnLatBai.addTouchEventListener(this._onTouchUIEvent, this);
    },

    _onTouchUIEvent: function (sender) {
        this.CloseLayerNanBai();
    },
    setCallbackFunc: function (target, callfun) {
        this.m_callback = target;
        this.m_callbackListener = callfun;
    },

    onTouchBegan: function (pTouch, pEvent) {
        var target = pEvent.getCurrentTarget();
        var touch = pTouch;
        var tap = target.convertToNodeSpace(touch.getLocation());
        target.pointTouchBegan = tap;
        target.disTouchBegan = cc.size(0, 0);
        if (tap.x > target.xMin && tap.x < target.xMax &&
            tap.y > target.yMin && tap.y < target.yMax) {
            target.isTouched = true;
            target.dx = tap.x - target.leftCard;
            target.dy = tap.y - target.bottomCard;
            target._index = 7;

            target.sX = tap.x;
            target.sY = tap.y;

            target.xcu = tap.x;
            target.ycu = tap.y;

            target.disTouchBegan = cc.size(tap.x - target.leftCard, tap.y - target.bottomCard);
        }
        return true;
    },

    onTouchMoved: function (pTouch, pEvent) {
        var target = pEvent.getCurrentTarget();
        var touch = pTouch;

        var tap = target.convertToNodeSpace(touch.getLocation());
        tap = target.ConvertPoint(tap);
        if (target.isTouched) {
            target.deltaX = target.sX - tap.x;
            target.deltaY = target.sY - tap.y;
            target.sX = tap.x;
            target.sY = tap.y;

            if (target.deltaX > 0 && tap.x < target.xcu) {
                target.count_move++;
                if (target.count_move === 1)
                    target.flag_left = 0;
                else
                    target.count_move++;
            }

            if (target.deltaX < 0 && tap.x > target.xcu) {
                target.count_move--;
                if (target.count_move === -1)
                    target.flag_right = 0;
                else
                    target.count_move++;
            }

            tap.x -= target.disTouchBegan.width;
            tap.y -= target.disTouchBegan.height;

            if (target.flag_left === 0) {
                var pCard = target.CardOnHand[target.cardIndex];
                pCard.setPosition(tap);
            }

            if (target.flag_right === 0) {
                var pCard = target.CardOnHand[target.cardIndex_under];
                pCard.setPosition(tap);
            }
        }
    },

    onTouchEnded: function (pTouch, pEvent) {
        var target = pEvent.getCurrentTarget();
        if (target.flag_left === 0)
            target.vt = target.cardIndex;
        else if (target.flag_right === 0)
            target.vt = target.cardIndex_under;

        if (target.isTouched) {
            if (target.vt === -1)
                return;

            var pCard = target.CardOnHand[target.vt];
            if (pCard.getPositionX() <= (target.leftCard - target.widthCard) ||
                pCard.getPositionX() >= (target.leftCard + target.widthCard) ||
                pCard.getPositionY() >= (target.bottomCard + target.heightCard)) {
                if (target.flag_left === 0) {
                    target.MovePockerFinish(pCard, target.vt);
                    target.cardIndex--;
                }
                if (target.flag_right === 0) {
                    target.MovePockerFinish(pCard, target.vt);
                    target.cardIndex_under++;
                }
            }
            else {
                pCard.setPosition(cc.p(target.leftCard, target.bottomCard));
            }

        }

        target.isTouched = false;
        target.flag_left = target.flag_right = -1;
        target.count_move = 0;

        if (target.cardIndex === target.cardIndex_under) {
            var pCard = target.CardOnHand[target.cardIndex];
            target.MovePockerFinish(pCard, target.cardIndex);
            target.runAction(cc.sequence(
                cc.delayTime(1),
                cc.callFunc(target.CloseLayerNanBai, target)));
        }
    },

    // Di Chuyen la bai sau khi nan xong
    MovePockerFinish: function (pCard, pos) {
        var toX = -1;
        var toY = -1;
        toY = this.bottomCard;

        switch (pos) {
            case 0:
                toX = this.leftCard + this.widthCard;
                break;
            case 1:
                toX = this.leftCard;
                break;
            case 2:
                toX = this.leftCard - this.widthCard;
                pCard.setLocalZOrder(0);
                break;
            default:
                break;
        }

        var pMoveBy = cc.moveTo(0.4, cc.p(toX, toY));
        pCard.runAction(pMoveBy);
    },

    CloseLayerNanBai: function () {
        ZLog.error("Function callback");
        if (this.m_callback && this.m_callbackListener)
            this.m_callback.call(this.m_callbackListener);
        this.cleanUp();
    },
    cleanUp: function () {
        this.startLeft = 0;
        this.startTop = 0;

        this.dx = 0;
        this.dy = 0;
        this._index = -1;
        this._where = -1;
        this.isTouched = false;

        this.deltaX = 0;
        this.deltaY = 0;
        this.sX = 0;
        this.sY = 0;
        this.xcu = 0;
        this.ycu = 0;

        this.cardIndex = 2;

        //Touch move
        this.cardIndex_under = 0;
        this.flag_move = false;
        this.flag_left = this.flag_right = -1;
        this.count_move = 0;

        //touch end
        this.vt = -1;

        this.bottomCard = this.sizeScreen.height >> 1;
        this.leftCard = this.sizeScreen.width >> 1;
        this.rightCard = this.leftCard;


        this.widthCard = 96 * 1.2;
        this.heightCard = 130 * 1.2;

        for (var i = 0; i < this.CardOnHand.length; i++) {
            this.CardOnHand[i].removeFromParent(true);
        }
        this.CardOnHand = [];
        this.hide();
    }
});
