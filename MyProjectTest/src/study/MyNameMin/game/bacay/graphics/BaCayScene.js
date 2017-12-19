/**
 * Created by TuanND on 11/24/2017.
 */
var BaCayScene = AdminBaseGUI.extend({
    _className: "BaCayScene",
    ctor: function () {
        this._super();
        this._needLooping = true;
        this.gameStatus = -1;
        this._guiSetting = null;
        this.moneyBuyin = 0;

        //ui
        this.sp_timer = null;
        this.lb_timer = null;
        this.sp_timer_chick = null;
        this.lb_timer_chick = null;
        this.btn_chick = null;
        this.lb_money_chick = null;
        this.lb_status = null;
        this._guiNanBai = null;

        this.betSlider = null;
        this._popupDanhBienKeCua = null;
        this._isRegOut = false;


        this.slotPos_6 = [{x: 410, y: 82}, {x: 177, y: 320}, {x: 403, y: 545}, {x: 733, y: 545}, {
            x: 957,
            y: 430
        }, {x: 957, y: 200}];
        this.slotPos_9 = [{x: 410, y: 82}, {x: 170, y: 156}, {x: 150, y: 327}, {x: 200, y: 500}, {
            x: 410,
            y: 547
        }, {x: 726, y: 547}, {x: 936, y: 500}, {x: 986, y: 327}, {x: 966, y: 156}];
        this.listSlots = [];

        this.mySlot = null;
        this.myDataInfo = {};
        this.dataTable = {};
        this.myMoneyInGame = 0;

        this.bossId = 0;
        this.listChipBet = [];
        this.totalBetChick = 0;
        this.listPlayerOutGame = [];
        this.numOfPlayerInGame = 0;

        this._listAction = [];
        this._actionIsRunning = false;

        this.init();
    },
//--------------------------------------  PHẦN KHỞI TẠO KHI VÀO GAME ------------------
    init: function () {
        this._super();
        this.syncAllChildren(res.scene_BaCay, this);
        this.setDeepSyncChildren(3);
        this.doLayout(GV.VISIBALE_SIZE);
        this.myDataInfo = moduleMgr.getPlayerModule().getMyInfo();
        this._initGUI();

    },

    onEnter: function () {
        this._super();

    },

    onExit: function () {
        this._super();
        sceneMgr.removeScene(GV.SCENE_IDS.GAME_BACAY); // xoa scene khi roi phong
    },

    onEnterTransitionDidFinish: function () {
        this._super();

    },

    onExitTransitionDidStart: function () {
        this._super();

    },

    onTouchUIEndEvent: function (sender) {

        switch (sender) {
        }
    },

    _initGUI: function () {
        if (this._guiSetting === null) {
            this._guiSetting = new GUISetting();
            this.getLayer(GV.LAYERS.GUI).addChild(this._guiSetting, 2);
        }
        this._guiSetting.btnConfirmSms.setVisible(false);
        this._guiSetting.btnLogout.setVisible(false);
        this._guiSetting.btnSupport.setVisible(false);
        this._guiSetting.setVisible(false);

        if (this.betSlider === null) {
            this.betSlider = new BaCaySlider();
            this.getLayer(GV.LAYERS.GUI).addChild(this.betSlider);
        }
        this.betSlider.setPosition(50, 330);
        this.betSlider.setVisible(false);

        if (this._popupDanhBienKeCua === null) {
            this._popupDanhBienKeCua = new BaCayPopupDanhBien();
            this.getLayer(GV.LAYERS.GUI).addChild(this._popupDanhBienKeCua, 1);
        }
        this._popupDanhBienKeCua.setVisible(false);

        this.btn_chick.setVisible(false);
        this.sp_timer.setVisible(false);
        this.sp_timer_chick.setVisible(false);

        if(this._guiNanBai === null)
        {
            this._guiNanBai = new BaCayNanBai();
            this._guiNanBai.setCallbackFunc(this._actionLatBai,this);
            this.getLayer(GV.LAYERS.GUI).addChild( this._guiNanBai);
            this._guiNanBai.setVisible(false);
        }

    },

    _initSlot: function () {
        for (var i = 0; i < this.listSlots.length; i++)
        {
            if(this.listSlots[i])
                this.listSlots[i].removeFromParent(true);
        }
        this.listSlots = [];
        if (this.dataTable.maxPlayer > 6) {
            for (var i = 0; i < this.slotPos_9.length; i++) {
                var slot = new BaCaySlot();
                switch (i) {
                    case 0: //me
                        slot.initWithType(SLOT_INDEX.ME);
                        break;
                    case 1: //LEFT
                    case 2:
                    case 3:
                        slot.initWithType(SLOT_INDEX.LEFT);
                        break;
                    case 4: //TOP LEFT
                        slot.initWithType(SLOT_INDEX.TOP_LEFT);
                        break;
                    case 5: //TOP_RIGHT
                        slot.initWithType(SLOT_INDEX.TOP_RIGHT);
                        break;
                    default:
                        slot.initWithType(SLOT_INDEX.RIGHT);
                        break;
                }
                slot.setPosition(this.slotPos_9[i]);
                slot.setSlotIndex(i);
                slot.setTableInfo(this.dataTable.tableId,this.dataTable.blindLevel,this.dataTable.structureId);
                this.getLayer(GV.LAYERS.BG).addChild(slot);
                this.listSlots.push(slot);
            }
        } else {
            for (var i = 0; i < this.slotPos_6.length; i++) {
                var slot = new BaCaySlot();
                switch (i) {
                    case 0: //me
                        slot.initWithType(SLOT_INDEX.ME);
                        break;
                    case 1: //LEFT
                        slot.initWithType(SLOT_INDEX.LEFT);
                        break;
                    case 2: //TOP LEFT
                    case 3:
                        slot.initWithType(SLOT_INDEX.TOP_LEFT);
                        break;
                    case 4: //right
                        slot.initWithType(SLOT_INDEX.RIGHT);
                        break;
                    default:
                        slot.initWithType(SLOT_INDEX.RIGHT);
                        break;

                }
                slot.setPosition(this.slotPos_6[i]);
                slot.setSlotIndex(i);
                slot.setTableInfo(this.dataTable.tableId,this.dataTable.blindLevel,this.dataTable.structureId);
                this.getLayer(GV.LAYERS.BG).addChild(slot);
                this.listSlots.push(slot);
            }
        }

    },

    _findSlotByID: function (slotId) {
        for (var i = 0; i < this.listSlots.length; i++) {
            if (this.listSlots[i].isAlive() && this.listSlots[i].getUId() === slotId) {
                return this.listSlots[i];
            }
        }
        return null;
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
//--------------------------------------  END ------------------

    //-------------------Tạo bàn và vào bàn------------------

    onGET_TABLE_INFO : function (data) {
        this.dataTable = {};
        var configTable = resourceMgr.getConfigTableCashGame(data.structureId);
        asyncTaskMgr.cleanUp();
        this.setTableName(data.id + "");
        this.setTableMoney(Utility.formatMoney(data.blindLevel));
        this.gameStatus = data.gameStatus;
        this.sp_timer.setVisible(true);
        this._startTimer(data.timer);
        this.dataTable.structureId = data.structureId;
        this.dataTable.tableId = data.id;
        this.dataTable.blindLevel = data.blindLevel;
        this.dataTable.maxPlayer = configTable.maxPlayer;
        var listDataPlayer = data.playerList;
        this.numOfPlayerInGame = listDataPlayer.length;
        this.bossId = data.bossId;
        this._initSlot();
        this._updateListSlot(listDataPlayer);
        this.lb_status.setString("Vui lòng chờ người chơi khác...");

        //reconnect
        if(this.gameStatus === BACAY_GAME_STATUS.PRE_START)
        {
            var obj = {};
            obj.time = data.timer;
            this.onPRESTART(obj);
        }else if(this.gameStatus === BACAY_GAME_STATUS.BETTING)
        {
            for (var i = 0; i < data.playerList.length; i++) {
                var slot = this._findSlotByID(data.playerList[i].uId);
                if(slot && slot.isPlaying() && data.playerList[i].goldBet > 0){
                    slot.setGoldBet(data.playerList[i].goldBet);
                }
            }
            var obj = {};
            obj.time = data.timer;
            this.onBET(obj);


        }else if(this.gameStatus === BACAY_GAME_STATUS.BETCHICHKEN)
        {
            this.lb_status.setString("");
            for (var i = 0; i < data.playerList.length; i++) {
                var slot = this._findSlotByID(data.playerList[i].uId);
                if(slot && slot.isPlaying()){
                    if(data.playerList[i].goldBet > 0){
                        slot.setGoldBet(data.playerList[i].goldBet);
                    }
                    if(data.playerList[i].goldChicken > 0){
                        slot.setGoldChick(data.playerList[i].goldBet);
                    }
                }
            }
            var obj = {};
            obj.time = data.timer;
            this.onCHICKEN(obj);

        }else if(this.gameStatus === BACAY_GAME_STATUS.DEAL_GAME)
        {
            this._createCardForSlotWhenReconectOrJoinEndGame();
            this.lb_status.setString("");
            this._startTimer(data.timer);
            for (var i = 0; i < data.playerList.length; i++) {
                var slot = this._findSlotByID(data.playerList[i].uId);
                if (slot && slot.isPlaying()) {
                    if (data.playerList[i].goldBet > 0) {
                        slot.setGoldBet(data.playerList[i].goldBet);
                    }
                    if (data.playerList[i].goldChicken > 0) {
                        slot.setGoldChick(data.playerList[i].goldBet);
                    }
                    var cardPlayer = [];
                    cardPlayer.push(data.playerList[i].card1);
                    cardPlayer.push(data.playerList[i].card2);
                    cardPlayer.push(data.playerList[i].card3);
                    slot.setListDataCards(cardPlayer);
                    if (data.playerList[i].isShowCard > 0) {
                        slot.actionShowAllCards();
                    }
                }
            }
            this.mySlot.actionShowAllCards();

        }else if(this.gameStatus === BACAY_GAME_STATUS.END_GAME)
        {
            this.lb_status.setString("");
            var dataEndGame = {};
            this._createCardForSlotWhenReconectOrJoinEndGame();
            dataEndGame.playerList = data.playerList;
            for (var i = 0; i < data.playerList.length; i++) {
                var slot = this._findSlotByID(data.playerList[i]);
                if (slot && slot.isPlaying()) {
                    if (data.playerList[i].goldBet > 0) {
                        slot.setGoldBet(data.playerList[i].goldBet);
                    }
                    if (data.playerList[i].goldChicken > 0) {
                        slot.setGoldChick(data.playerList[i].goldBet);
                    }
                    var cardPlayer = [];
                    cardPlayer.push(data.playerList[i].card1);
                    cardPlayer.push(data.playerList[i].card2);
                    cardPlayer.push(data.playerList[i].card3);
                    slot.setListDataCards(cardPlayer);
                    slot.actionShowAllCards();
                }
            }

            this.onEND_GAME(dataEndGame);

        }else if(this.gameStatus === BACAY_GAME_STATUS.CHUONG)
        {
            var obj = {};
            obj.time = data.timer;
            this.onCHUONG(obj);
        }

    },

    _updateListSlot: function (data) {
        for (var i = 0; i < data.length; i++)
        {
            if(this.listSlots[i] && this.listSlots[i] !== undefined)
            {
                this.listSlots[i].setPlayerInfo(data[i]);
                this.listSlots[i].setIsBoss(data[i].uId === this.bossId);
                this.listSlots[i].setStatus(data[i].status);
            }
        }

        var slot = this._findSlotByID(this.myDataInfo.uId);
        if (slot && slot.getSlotIndex() !== 0) {
            slot.swapSlot(this.listSlots[0]);
            this.mySlot = this.listSlots[0];
        } else
            this.mySlot = slot;

        this.mySlot.setIsMe(true);

    },

    onPLAYER_JOIN_GAME : function (data) {
        if(data.uId === this.myDataInfo.uId)
            return;

        var dataPlayer = new DataPlayer();
        dataPlayer.uId = data.uId;
        dataPlayer.displayName = data.displayName;
        dataPlayer.status = data.status;
        dataPlayer.gold = data.gold;
        dataPlayer.defaultAvatar = data.defaultAvatar;
        dataPlayer.level = data.level;
        dataPlayer.vipLevel = data.vipLevel;
        for (var i = 0; i < this.listSlots.length; i++) {
            if (!this.listSlots[i].isAlive()) {
                this.listSlots[i].setIsMe(false);
                this.listSlots[i].setPlayerInfo(dataPlayer);
                this.listSlots[i].setStatus(data.status);

                this.numOfPlayerInGame ++;

                break;
            }
        }

    },
    //--------------------------------------------------------
});