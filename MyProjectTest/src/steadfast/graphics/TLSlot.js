/**
 * Created by TuanND on 11/24/2017.
 */

var TLSlot = BaseSlot.extend({
    _className: "TLSlot",
    ctor: function () {
        this._super();
        this._isShowedCard = false;
        this._type = -1;

        this.listDataCards = [];
        this.listCardsSlot = [];

        this.init();
    },
    init: function () {
        this._super();

    },

    initWithType: function (type) {
        this._type = type;
        switch (type) {
            case SLOT_INDEX.ME: //me
                this.imgVIP.setPositionX(-42.00);
                break;
            case SLOT_INDEX.LEFT: //left
                this.imgVIP.setPositionX(-42.00);
                break;
            case SLOT_INDEX.TOP_LEFT: //top-left
                this.imgVIP.setPositionX(42.00);

                break;
            case SLOT_INDEX.TOP_RIGHT:
                this.imgVIP.setPositionX(-42.00);
                break;
            case SLOT_INDEX.RIGHT://right
                this.imgVIP.setPositionX(42.00);
                break;
            default:
                break;
        }

    },

    addCard: function (card) {
        if (card)
            this.listCardsSlot.push(card);
    },

    setListDataCards: function (data) {
        this.listDataCards = data;
        ZLog.error("setListDataCards", data.length);
    },

    setListCardsSlot: function (data) {
        this.listCardsSlot = data;
    },

    actionShowAllCards: function () {
        if (this._isShowedCard)
            return;
        if (this.listDataCards.length !== this.listCardsSlot.length)
            return;
        for (var i = 0; i < this.listCardsSlot.length; i++) {
            this.listCardsSlot[i].setIdCard(this.listDataCards[i]);
            this.listCardsSlot[i].flipCard();
        }
        this._isShowedCard = true;

    },

    showScores: function (type, eva) {   //set bộ bài đặc biệt
        this.pn_result.setVisible(true);
        this.lb_result.setVisible(true);
        switch (type) {
            case BACAY_BOBAI_TYPE.VAY:
                this.lb_result.setString("Vây");
                break;
            case BACAY_BOBAI_TYPE.SAP:
                this.lb_result.setString("sáp A cụ");
                break;
            case BACAY_BOBAI_TYPE.AT_CU:
                this.lb_result.setString("A cụ");
                break;
            case BACAY_BOBAI_TYPE.MUOI:
                this.lb_result.setString("10 điểm");
                break;
            case BACAY_BOBAI_TYPE.THUONG:
                this.lb_result.setString(eva + " điểm");
                break;
            default:

                break;
        }
    },

    getShowCard: function () {
        return this._isShowedCard;
    },


    getListDataCard: function () {
        return this.listDataCards;
    },

    getlistCardsSlot: function () {
        return this.listCardsSlot;
    },

    setShowCard: function (b) {
        this._isShowedCard = b;
    },


    leaveTable: function () {
        this._super();

        for (var i = 0; i < this.listCardsSlot.length; i++) {
            this.listCardsSlot.splice(i, 1);
        }
        this.listCardsSlot = [];
        for (var i = 0; i < this.listDataCards.length; i++) {
            this.listDataCards.splice(i, 1);
        }
        this.listDataCards = [];
    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this.btnInvite:
                var data = {};
                data.uId = moduleMgr.getPlayerModule().getPlayerInfo().uId;
                data.tableId = this.tableId;
                data.goldMin = this.blindLevel;
                data.goldMax = this.blindLevel * 2;
                data.structureId = this.structureId;
                data.gameID = moduleMgr.getLobbyModule().getGameID();
                moduleMgr.getLobbyModule().sendInvitingCashGame(data);
                Notifications.show(languageMgr.getString("CASINO_INVITING_SUCCESS"));
                break;

        }
    },
    runEffectDealCards: function () {
        var scale = 0.5;
        var disCard = 60;
        var topCard = 20;

        if (this._isMe) {
            var leftTheFirst = (GV.VISIBALE_SIZE.width - ((this.listCardsSlot.length - 1)) * disCard) / 5;
            for (var i = 0; i < this.listCardsSlot.length; i++) {
                var card = this.listCardsSlot[i];
                card.setIdCard(this.listDataCards[i]);
                card.showCard();
                var m_CardSize = 94;
                card.runAction(cc.sequence(cc.delayTime(0.04 * i), cc.moveTo(0.4, cc.p(leftTheFirst + i * disCard + m_CardSize / 2, topCard)),
                    cc.scaleTo(0.15, 1)));
            }

        } else {
            var deltaTime = 0;
            for (var i = 0; i < this.listCardsSlot.length; i++) {
                var card = this.listCardsSlot[i];
                card.runEffectDealCard(this.getPosition(), deltaTime, kDistributeCardsTime, false, scale);
                deltaTime += kDistributeCardsDelay;
            }
        }

    },

    swapSlot: function (slot) {
        var dataInfo = slot.getPlayerInfo();
        var isMe = slot.isMe();
        var isBoss = slot.isBoss();
        var status = slot.getStatus();
        var isShowCard = slot.getShowCard();
        var listDataCards = slot.getListDataCard();
        var listCardsSlot = slot.getlistCardsSlot();


        slot.setPlayerInfo(this.playerInfo);
        slot.isMe(this._isMe);
        slot.setIsBoss(this._isBoss);
        slot.setStatus(this._status);
        slot.setShowCard(this._isShowedCard);
        slot.setListDataCards(this.listDataCards);
        slot.setListCardsSlot(this.listCardsSlot);

        this.setPlayerInfo(dataInfo);
        this.isMe(isMe);
        this.setIsBoss(isBoss);
        this.setStatus(status);
        this.setShowCard(isShowCard);
        this.setListDataCards(listDataCards);
        this.setListCardsSlot(listCardsSlot);

    },


    resetAllForNewGame: function () {

        for (var i = 0; i < this.listCardsSlot.length; i++) {
            this.listCardsSlot[i].removeFromParent();
        }

        for (var i = 0; i < this.listCardsSlot.length; i++) {
            this.listCardsSlot.splice(i, this.listCardsSlot.length);
        }
        this.listCardsSlot = [];

        for (var i = 0; i < this.listDataCards.length; i++) {
            this.listDataCards.splice(i, this.listDataCards.length);
        }
        this.listDataCards = [];

        this._isShowedCard = false;

        if (this.isAlive())
            this.setStatus(SLOT_STATUS.PLAYER);

    }
});
var kSortCardsHandEndTime = 0.3;
var kSortCardsHandEndDelay = 0.03;
var kDistributeCardsDelay = 0.04;
var kDistributeCardsTime = 0.4;