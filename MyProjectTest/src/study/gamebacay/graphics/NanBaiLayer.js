var NanBaiLayer = AdminBaseGUI.extend({
    arrCardTypes: [],
    CardOnHand: [],
    sizeScreen: cc.size(0, 0),
    scaleApp: 1,
    disTouchBegan: cc.size(0, 0),
    pointTouchBegan: cc.size(0, 0),
    bottomCard: 0,
    leftCard: 0,
    rightCard: 0,

    widthCard: 0,
    heightCard: 0,

    scaleApp: 0,
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
    tag: null,

    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();
        // this.setAnchorPoint(0, 0);
        // this.setPosition(0, 0);

        this.sizeScreen = cc.director.getVisibleSize();
        var scaleX = 1;
        var scaleY = 1;
        var scaleMin = (scaleX < scaleY) ? scaleX : scaleY;
        this.scaleApp = scaleMin;

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

        this.bottomCard = 60;
        this.leftCard = 129 + (129 / 2);
        this.rightCard = this.leftCard;

        this.widthCard = 129;
        this.heightCard = 178;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

    },

    onExit: function () {

    },

    ConvertPoint: function (point) {
        var xCenter = this.sizeScreen.width / 2;
        var yCenter = this.sizeScreen.height / 2;

        var xTap = point.x;
        var yTap = point.y;

        var x1, x2;
        var y1, y2;

        var A = ((Math.pow(xCenter - xTap, 2) + Math.pow(yCenter - yTap, 2))) / Math.pow(this.scaleApp, 2);
        var B = Math.pow((yCenter - yTap) / (xCenter - xTap), 2) + 1;

        x1 = xCenter + Math.sqrt(A / B);
        x2 = xCenter - Math.sqrt(A / B);

        y1 = yCenter + (yCenter - yTap) * (x1 - xCenter) / (xCenter - xTap);
        y2 = yCenter + (yCenter - yTap) * (x2 - xCenter) / (xCenter - xTap);
        // "Ä‘iá»ƒm cáº§n convert" = A
        // Bá»Ÿi vĂ¬ A vĂ  Tap náº±m á»Ÿ cĂ¹ng 1 phĂ­a so vá»›i Center nĂªn náº¿u xTap < xCenter thĂ¬ xA < xCenter vĂ  ngÆ°á»£c láº¡i
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
        cc.log("x= " + point.x + ": y = " + point.y);
        return point;
    },

    InitListCardHand: function () {
        for (var i = 0; i < 3; ++i) {
            var pCard = new cc.Sprite("#card_" + AdminRandom.randomBetweenNumber(10,30) + ".png");
            pCard.setPosition(this.leftCard, this.bottomCard);
            // pCard.setPosition(cc.winSize.width/2, cc.winSize.height/2);
            pCard.setLocalZOrder(i + 1);

            this.addChild(pCard);
            this.CardOnHand.push(pCard);
        }

        if (this.CardOnHand.length == 0)
            return;

        this.cardIndex = parseInt(this.CardOnHand.length - 1);
    },

    SetCallbackFunc: function (target, callfun) {
        this.m_callback = target;
        this.m_callbackListener = callfun;
    },

    onTouchBegan: function (pTouch, pEvent) {
        var target = pEvent.getCurrentTarget();
        var touch = pTouch;
        var tap = target.convertToNodeSpace(touch.getLocation());
        target.pointTouchBegan = tap;
        target.disTouchBegan = cc.size(0, 0);

        if (tap.x > target.leftCard && tap.x < target.leftCard + target.widthCard &&
            tap.y > target.bottomCard && tap.y < target.bottomCard + target.heightCard) {
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
        cc.log("onTouchMoved");
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
                if (target.count_move == 1)
                    target.flag_left = 0;
                else
                    target.count_move++;
            }

            if (target.deltaX < 0 && tap.x > target.xcu) {
                target.count_move--;
                if (target.count_move == -1)
                    target.flag_right = 0;
                else
                    target.count_move++;
            }

            tap.x -= target.disTouchBegan.width;
            tap.y -= target.disTouchBegan.height;

            if (target.flag_left == 0) {
                var pCard = target.CardOnHand[target.cardIndex];
                pCard.setPosition(tap);
            }

            if (target.flag_right == 0) {
                var pCard = target.CardOnHand[target.cardIndex_under];
                pCard.setPosition(tap);
            }
        }
    },

    onTouchEnded: function (pTouch, pEvent) {
        var target = pEvent.getCurrentTarget();
        if (target.flag_left == 0)
            target.vt = target.cardIndex;
        else if (target.flag_right == 0)
            target.vt = target.cardIndex_under;

        if (target.isTouched) {
            if (target.vt == -1)
                return;

            var pCard = target.CardOnHand[target.vt];
            if (pCard.getPositionX() <= (target.leftCard - target.widthCard) ||
                pCard.getPositionX() >= (target.leftCard + target.widthCard) ||
                pCard.getPositionY() >= (target.bottomCard + target.heightCard)) {
                if (target.flag_left == 0) {
                    target.MovePockerFinish(pCard, target.vt);
                    target.cardIndex--;
                }
                if (target.flag_right == 0) {
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

        if (target.cardIndex == target.cardIndex_under) {
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
        this.removeFromParent(true);

    }
});