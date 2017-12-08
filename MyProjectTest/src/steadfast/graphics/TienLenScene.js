/**
 * Created by TuanND on 12/06/2017.
 */
var _this = null;
var TienLenScene = BaseGameUI.extend({
    _className: "TienLenScene",
    ctor: function () {
        this._super();
        this._needLooping = true;

        this.gameStatus = -1;
        this.GAME_STATUS = {
            PRE_START: 1,
            START: 2,
            RESULT: 3,
            END_GAME: 4
        };
        this._guiSetting = null;

        this.lb_timer = null;

        this.lb_notifi = null;

        this.myDataInfo = {};
        this.dataTable = {};
        this.myMoneyInGame = 0;
        this.listResultGame = [];
        this.listSlot = [];
        this.listPosSlot = [{x: 568, y: 100}, {x: 70, y: 350}, {x: 568, y: 540}, {x: 1066, y: 350}];

        this._listAction = [];
        this._actionIsRunning = false;

        this.btn_ready = null;
        this.btn_fold = null;
        this.btn_fire = null;
        this.btn_sort = null;

        this._isDealingCard = false;

        this.disCard = 60;
        this.topCard = 20;
        this.sizeCard = cc.size(94, 130);
        this.mTouchFlag = false;
        this.indexCardCurrent = 0;
        this.indexCardTarget = 0;

        _this = this;
        this.init();
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },

    init: function () {
        this._super();
        this.syncAllChildren(res.scene_TienLen, this);
        this.setDeepSyncChildren(3);
        this.doLayout(GV.VISIBALE_SIZE);
        this.btn_ready.setVisible(false);
        this.btn_fire.setVisible(true);
        this.btn_fold.setVisible(false);
        moduleMgr.getLobbyModule().setGameID(GAME_ID.TIEN_LEN);
        this._initGUI();
    },

    onEnter: function () {
        this._super();
        this.myDataInfo = moduleMgr.getPlayerModule().getMyInfo();

    },

    onExit: function () {
        this._super();
        sceneMgr.removeScene(GV.SCENE_IDS.GAME_TAIXIU);
    },

    onEnterTransitionDidFinish: function () {
        this._super();

    },

    onExitTransitionDidStart: function () {
        this._super();

    },

    onTouchUIEndEvent: function (sender) {
        switch (sender) {
            case this.btn_ready:
            case this.btn_fold:
            case this.btn_fire:
                this._actionDealCard();
                break;
            case this.btn_sort:
                this.refreshCardOnHandBool(true);
                break;
        }
    },

    onTouchBegan: function (ptouch, event) {


        if (_this.mTouchFlag === true) return false;
        _this.mTouchFlag = true;
        var touch = ptouch;
        var target = event.getCurrentTarget();
        var tap = target.convertToNodeSpace(touch.getLocation());
        _this.pointTouchBegan = tap;

        _this.disTouchBegan = cc.size(0, 0);
        _this.indexCardCurrent = -1;
        _this.indexCardTarget = -1;
        _this.isClickCard = true;

        var length = _this.mySlot.getlistCardsSlot().length;
        for (var i = 0; i < length; i++) {
            var card = _this.mySlot.getlistCardsSlot()[i];
            if (i < length - 1 && _this.isTouchedCard_notTail(card, tap) ||
                i === length - 1 && _this.isTouchedCard_Tail(card, tap)) {
                _this.disTouchBegan = cc.size(tap.x - card.getPositionX(),
                    tap.y - card.getPositionY());
                _this.indexCardCurrent = i;
                break;
            }
        }
        return true;
    },
    onTouchEnded: function (ptouch, event) {
        _this.mTouchFlag = false;
        if (_this.indexCardCurrent >= 0 && _this.indexCardCurrent < _this.mySlot.getlistCardsSlot().length) {
            var cardCurrent = _this.mySlot.getlistCardsSlot()[_this.indexCardCurrent];
            if (cardCurrent === null) return;
            var touch = ptouch;
            var target = event.getCurrentTarget();
            var tap = target.convertToNodeSpace(touch.getLocation());
            if (_this.getDisPoint(tap, _this.pointTouchBegan) < 10) {
                cardCurrent.setLocalZOrder(_this.indexCardCurrent);
                _this.setCardClick(cardCurrent);
            } else {
                if (_this.indexCardCurrent < _this.indexCardTarget) _this.indexCardTarget++;
                if (_this.indexCardTarget >= 0) {
                    var arrCardCopy = [];
                    for (var i = 0; i < _this.indexCardTarget; i++) {
                        var card = _this.mySlot.getlistCardsSlot()[i];
                        if (i !== _this.indexCardCurrent) {
                            arrCardCopy.push(card);
                        }
                    }

                    var card = _this.mySlot.getlistCardsSlot()[_this.indexCardCurrent];
                    arrCardCopy.push(card);
                    for (var i = _this.indexCardTarget; i < _this.mySlot.getlistCardsSlot().length; i++) {
                        var card = _this.mySlot.getlistCardsSlot()[i];
                        if (i !== _this.indexCardCurrent) {
                            arrCardCopy.push(card);
                        }
                    }
                    // var data = [];
                    _this.mySlot.setListCardsSlot([]);

                    _this.mySlot.setListCardsSlot(arrCardCopy);
                }
                _this.refreshCardOnHandBool(false);
            }
        }
    },
    onTouchMoved: function (ptouch, event) {
        var touch = ptouch;
        if (_this.indexCardCurrent >= 0 && _this.indexCardCurrent < _this.mySlot.getlistCardsSlot().length) {
            var length = _this.mySlot.getlistCardsSlot().length;
            var card = _this.mySlot.getlistCardsSlot()[_this.indexCardCurrent];
            if (card === null) return;
            var cardTarget = null;
            var target = event.getCurrentTarget();
            var tap = target.convertToNodeSpace(touch.getLocation());
            if (_this.disTouchBegan.width > 0) {
                _this.isClickCard = false;

                for (var i = 0; i < length; i++) {
                    cardTarget = _this.mySlot.getlistCardsSlot()[i];
                    if (card !== cardTarget) {
                        if (i < (length - 1) && _this.isTouchedCard_notTail(cardTarget, tap) ||
                            i === (length - 1) && _this.isTouchedCard_Tail(cardTarget, tap)) {
                            _this.indexCardTarget = i;
                            break;
                        }
                    }
                }

                tap.x -= _this.disTouchBegan.width;
                tap.y -= _this.disTouchBegan.height;

                card.setLocalZOrder(length);
                card.setPosition(tap);
            }
        }
    },
    update: function (dt) {

        //===============================================================================
        // run action in order, action by action with delay
        //===============================================================================
        if (this._listAction.length > 0 && !this._actionIsRunning) {
            // reconnect to update states
            if (this._listAction.length >= MaxActionsToReconnect) {
                this._actionIsRunning = true;
                connector.autoReconnect();
                return;
            }

            var nextAction = this._listAction[0];
            this._actionIsRunning = true;

            try {
                switch (nextAction.type) {

                }
                this._listAction.splice(0, 1);
            }
            catch (err) {
                ZLog.debug("scene table: exception - " + err);
                connector.autoReconnect();
            }
        }

        // this.updateTimeOnline();
    },

    addAction: function (action) {
        switch (action.type) {
            case CMD.TX_GET_GAME_INFO:
                break;
            case CMD.TX_PRESTART_GAME:
                break;
            case CMD.TX_START_GAME:
                break;
            case CMD.TX_RESULT_GAME:
                break;
            case CMD.TX_END_GAME:
                break;
            case CMD.TX_BET:
                break;
            case CMD.TX_LEAVE_GAME:
                break;
            case CMD.TX_GET_HISTORY:
                break;
            case CMD.TX_GET_LIST_PLAYER:
                break;
            case CMD.TX_AUTO_BUYIN:
                break;
            case CMD.TX_PLAYER_JOIN_GAME:
                break;
            case CMD.TX_KICK_OUT:
                break;
        }
        this._listAction.push(action);
    },

    actionDone: function () {
        this._actionIsRunning = false;
    },

    _initGUI: function () {

        this._initSlot();

        var data = [];
        for (var i = 0; i < 13; i++) {
            data.push(i);
        }

        this.mySlot.setListDataCards(data);
    },

    _initSlot: function () {
        for (var i = 0; i < this.listPosSlot.length; i++) {
            var slot = new TLSlot();
            slot.setStatus(SLOT_STATUS.PLAYER);
            slot.setPosition(this.listPosSlot[i]);
            slot.setSlotIndex(i);
            slot.setIsMe(i === 0);
            this.listSlot.push(slot);
            this.getLayer(GV.LAYERS.BG).addChild(slot);
        }
        this.mySlot = this.listSlot[0];
    },

    backToLobby: function () {
        // confirm to quiting game

        if (this.gameStatus === this.GAME_STATUS.START || this.gameStatus === this.GAME_STATUS.RESULT) {
            if (this.isRegOut) {
                CenterNotifications.show(languageMgr.getString("CANCEL_OUT_TABLE"));
                this.isRegOut = false;
            } else {
                CenterNotifications.show(languageMgr.getString("REG_OUT_TABLE"));
                this.isRegOut = true;
            }
        } else {
            var content = {text: languageMgr.getString("CONFIRM_EXIT")};
            var listButtons = [
                {
                    btnName: 'ok', hide: true, callback: {
                    func: function () {
                        if (this.gameStatus === this.GAME_STATUS.START || this.gameStatus === this.GAME_STATUS.RESULT) {
                            CenterNotifications.show(languageMgr.getString("TX_GAME_STARTING"));
                        } else {
                            moduleMgr.getTaiXiuModule().sendLeaveGame();
                            sceneMgr.viewSceneById(GV.SCENE_IDS.LIST_TABLES, false);
                        }

                    }.bind(this)
                }
                },
                {btnName: 'cancel', hide: true}
            ];
            Popups.show(content, listButtons);
        }
    },

    setShowLevelUp: function (b, level) {
        this.showGUILevelUp.isShow = b;
        this.showGUILevelUp.level = level;
    },

    setShowVipLevelUp: function (b, level) {
        this.showGUIVipLevelUp.isShow = b;
        this.showGUIVipLevelUp.level = level;
    },

    showGUILevelUp: function () {
        if (this.showGUILevelUp.isShow === undefined) {
            this.showGUILevelUp.isShow = false;
        }

        if (this.showGUILevelUp.isShow) {
            this.showGUILevelUp.isShow = false;
            moduleMgr.getPlayerModule().showGUILevelUp(this.showGUILevelUp.level);
        }
    },

    showGUIVipLevelUp: function () {
        if (this.showGUIVipLevelUp.isShow === undefined) {
            this.showGUIVipLevelUp.isShow = false;
        }

        if (this.showGUIVipLevelUp.isShow) {
            this.showGUIVipLevelUp.isShow = false;
            moduleMgr.getPlayerModule().showGUIVipLevelUp(this.showGUIVipLevelUp.level);
        }
    },

    showGUISetting: function () {
        this._guiSetting.show();
    },

    _startTimer: function (time) {
        this._stopTimer();
        if (time < 0)
            return;
        this.lb_timer.setString(time);

        var seq = cc.sequence(cc.delayTime(1.0), cc.callFunc(function (sender) {
            if (time !== 0) {
                time--;
                sender.setString(time);
            }
            else {
                sender.stopAllActions();
            }
        }));
        this.lb_timer.stopAllActions();
        this.lb_timer.runAction(cc.repeatForever(seq));
    },

    _stopTimer: function () {
        this.lb_timer.stopAllActions();
    },

    onGET_TABLE_INFO: function (data) {
        this.dataTable = data;
        this.myMoneyInGame = data.moneyBuyin;
        this.lb_gold.setString(Utility.formatMoney(this.myMoneyInGame));
        this.lb_users.setString(data.totalPlayer);
        this.lb_timer.setString(data.time);
        this.setTableName(data.tableId + "");
        this.setTableMoney(Utility.formatMoney(data.blindLevel));
        this._initBetLevel(data.blindLevel);
        this._startTimer(data.time);
        this._setStatusGame(data.statusGame);
        this.isRegOut = false;
        for (var i = 0; i < this.listResultGame.length; i++) {
            this.listResultGame.splice(i, this.listResultGame.length);
        }
        this.listResultGame = [];
        for (var i = 0; i < this.listAllChipBetInGame.length; i++) {
            this.listAllChipBetInGame.splice(i, this.listAllChipBetInGame.length);
        }
        this.listAllChipBetInGame = [];
    },

    _setStatusGame: function (data) {
        this.statusGame = data;
        switch (data) {
            case this.GAME_STATUS.PRE_START:
                this.lb_notifi.setString(languageMgr.getString("TX_PRESTART_GAME"));
                break;
            case this.GAME_STATUS.START:
                this.lb_notifi.setString(languageMgr.getString("TX_START_GAME"));
                break;
            case this.GAME_STATUS.RESULT:
                this.lb_notifi.setString(languageMgr.getString("TX_RESULT_GAME"));
                break;
            case this.GAME_STATUS.END_GAME:
                this.lb_notifi.setString(languageMgr.getString("TX_END_GAME"));
                break;
        }
    },

    _actionDealCard: function () {

        this._isDealingCard = true;
        this.mySlot.runAction(cc.moveTo(0.3, cc.p(68, 100)));
        for (var i = 0; i < this.listSlot.length; i++) {
            var slot = this.listSlot[i];
            if (!slot)
                continue;
            for (var j = 0; j < 13; j++) {
                var card = new BaseCard();
                card.setAnchorPoint(0,0);
                card.setPosition(cc.winSize.width >> 1, cc.winSize.height >> 1);
                this.getLayer(GV.LAYERS.BG).addChild(card);
                card.setTypeCard(TYPE_CARD.CARD_NORMAL);
                slot.addCard(card);

            }
            slot.runEffectDealCards();
        }
        this._isDealingCard = false;
    },

    refreshCardOnHandBool: function (isRefreshTop) {
        // mỗi lần xếp đều "nghỉ" 3s

        var leftTheFirst = (GV.VISIBALE_SIZE.width - ((this.mySlot.getlistCardsSlot().length - 1)) * this.disCard) / 5;
        var top;
        for (var i = 0; i < this.mySlot.getlistCardsSlot().length; i++) {
            var card = this.mySlot.getlistCardsSlot()[i];
            if (isRefreshTop === true) {
                top = this.topCard;
                card.setClicked(false);
            } else {
                // nếu quân bài đang được click thì top giữ nguyên
                // ngược lại top cần được đặt lại vị trí khởi tạo topCard
                if (card.getClicked() === true)
                    top = this.topCard + card.getContentSize().height / 4;
                else
                    top = this.topCard;
            }
            card.setLocalZOrder(i);
            card.stopAllActions();
            var m_CardSize = card.getContentSize().width * card.getScaleX();
            card.runAction(cc.moveTo(0.1, cc.p(leftTheFirst + i * this.disCard + m_CardSize / 2, top)));
        }
    },
    getDisPoint: function (p1, p2) {
        return  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    },
    isTouchedCard_Tail: function (card, tap) {
        if (tap.x > card.getPositionX() && tap.x < card.getPositionX() + card.getContentSize().width &&
            tap.y > card.getPositionY() && tap.y < card.getPositionY() + card.getContentSize().height)
            return true;

        return false;
    },
    isTouchedCard_notTail: function (card, tap) {
        if (tap.x > card.getPositionX() && tap.x < card.getPositionX() + this.disCard &&
            tap.y > card.getPositionY() && tap.y < card.getPositionY() + card.getContentSize().height)
            return true;

        return false;
    },
    setCardClick: function (card) {
        var isClick = card.getClicked();
        var size_card = cc.size(94, 130);
        var top;
        if (isClick)
            top = this.topCard;
        else
            top = this.topCard + size_card.height / 4;

        card.stopAllActions();
        card.runAction(cc.moveTo(0.1, cc.p(card.getPositionX(), top)));

        card.setClicked(!isClick);
    },
    _actionSortCard : function () {
        var list = this.mySlot.getlistCardsSlot();
        var lsC = TLCardLogic.sortList(this.mySlot.getlistCardsSlot());

        if (lsC.empty())
        {
            return;
        }
        for (var i = 0; i < list.length; i++ )
        {
            var card = list[i];
            if (card)
            {
                card.setVisible(false);
            }
        }
        this.mySlot.setListCardsSlot([]);
        for (var i = 0; i < lsC.length; i++ ){
            var card = lsC[i];
            if (card)
            {
                card.setVisible(true);
                this.mySlot.addCard(card);
            }
        }
        this.refreshCardOnHandBool(false);
    }
});