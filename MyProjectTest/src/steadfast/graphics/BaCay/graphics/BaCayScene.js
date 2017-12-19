/**
 * Created by Min on 10/17/2017.
 */
var BaCayScene = AdminBaseGUI.extend({
    _className: "BaCayScene",

    ctor: function(){
        this._super();
        this.slotPos9 = [{x: 400, y: 110},
            {x: 215, y: 162},  {x: 215, y: 320}, {x: 215, y: 478},
            {x: 400, y: 540}, {x: 714, y: 540},
            {x: 925, y: 162}, {x: 925, y: 320}, {x: 925, y: 478}];

        this.slotPos6 = [{x: 410, y: 110},
            {x: 177, y: 320}, {x: 403, y: 545}, {x: 733, y: 545},
            {x: 957, y: 430}, {x: 957, y: 200}];

        this.gameStatus = -1;
        this.lbTimerChicken = null;
        this.lbTimer = null;
        this.lbThongBao = null;
        this.nodeStart = null;
        this.nodeChicken = null;
        this.nodeDatCuoc = null;
        this.btnLatBai = null;
        this._gameStatus = -1;
        this.mySlot = null;    //list data cua minh
        this.myDataInfo = {};
        this.dataTable = {};
        this.btnDatCuoc = null;
        this.btnHuyBo = null;
        this.btnVaoGa = null;
        this.btnCuocLai = null;
        this.lbGoldGa = null;
        this._isRegOut = false;
        this.listPlayerOutGame = [];
        this.listSlot = [];     // list  giao diện player
        this.listPlayer = [];   //list data player

        this._timerCountDownStart = null;
        this._timerCountDownChicken = null;
        this.contenSizeAVT = null;
        this.uIdKeCuDanhBien = 0;
        this.listMyCards = []; //  id Bộ bài cua minh
        this.listIconBet = [];
        this.bossId = 0;
        this.init();
    },

    init: function(){
        this._super();
        var layerBg = this.getLayer(GV.LAYERS.BG);
        this.setDeepSyncChildren(3);
        this.syncAllChildren(res.scene_bacay, layerBg);
        this.doLayout(GV.VISIBALE_SIZE);

        var bgBaCay = new cc.Sprite("#textures/bacay/bg_bacay.png");
        this.addChild(bgBaCay, -31);
        bgBaCay.setPosition(cc.winSize.width/2, cc.winSize.height/2);


        ZLog.error("Finish scene bacay");


        this.myDataInfo = moduleMgr.getPlayerModule().getMyInfo();
        return true;

    },

    _initSlot :function (type) { //Khởi tạo 9 button invite theo mảng pos config sẵn
        switch (type){
            case BACAY_MAX.PLAYER6:
                for (var i = 0 ; i < this["slotPos"+type].length; i++){
                    var slot = new GUISlotBaCay();
                    slot.setPosition(this["slotPos"+type][i]);
                    this.contenSizeAVT = slot.img_bg.getContentSize();
                    this.getLayer(GV.LAYERS.GAME).addChild(slot);
                    slot.showGoldBetting(i);
                    slot.showLabelDiem(i);
                    slot.showSpriteWinLose(i);
                    slot.showCardSpecial(i);
                    slot.showKeCuaDanhBien(i);
                    slot.showGoldKeCua(i);
                    slot.showGoldDanhBien(i);
                    slot.showSpriteChicken(i);
                    this.listSlot.push(slot);
                }
                this.mySlot = this.listSlot[0];
                break;
            case BACAY_MAX.PLAYER9:
                for (var i = 0 ; i < this["slotPos"+type].length; i++){
                    var slot = new GUISlotBaCay();
                    slot.setPosition(this["slotPos"+type][i]);
                    this.contenSizeAVT = slot.img_bg.getContentSize();
                    this.getLayer(GV.LAYERS.GAME).addChild(slot);
                    slot.showGoldBetting(i);
                    slot.showLabelDiem(i);
                    slot.showSpriteWinLose(i);
                    slot.showCardSpecial(i);
                    slot.showKeCuaDanhBien(i);
                    slot.showGoldKeCua(i);
                    slot.showGoldDanhBien(i);
                    slot.showSpriteChicken(i);
                    this.listSlot.push(slot);
                }
                this.mySlot = this.listSlot[0];
                break;
        }

    },
    createTable: function (data) {
        this.dataTable = data;
        this.bossId = data.bossId;
        this.gameStatus = data.gameStatus;
        var configTable = resourceMgr.getConfigTableCashGame(data.structureId);
        if(configTable.maxPlayer == BACAY_MAX.PLAYER6){ //check xem chơi bàn 6 hay 9
            this._initSlot(BACAY_MAX.PLAYER6);
        }
        else{
            this._initSlot(BACAY_MAX.PLAYER9);
        }

        this.setTableName(data.id +"");
        this.setTableMoney(Utility.formatMoney(data.blindLevel));


        for(var i = 0; i< data.playerList.length; i++){
            if(data.playerList[i].uId == this.myDataInfo.uId){

                this.listSlot[0].setIsMe(true);
                this.listSlot[0].setPlayerInfo(data.playerList[i]);
                this.listSlot[0].setAlive(true);
                this.listSlot[0].setStatus(data.playerList[i].status);
                this.listSlot[0].setIsBoss(data.playerList[i].uId === this.bossId);
                this.listPlayer.push(data.playerList[i]);
                break;
            }
        }
        var pos = 1;
        for(var i = 0; i< data.playerList.length; i++){
            if(data.playerList[i].uId != this.myDataInfo.uId){
                this.listSlot[pos].setIsMe(false);
                this.listSlot[pos].setPlayerInfo(data.playerList[i]);
                this.listSlot[pos].setAlive(true);
                this.listSlot[pos].setStatus(data.playerList[i].status);
                this.listSlot[pos].setIsBoss(data.playerList[i].uId === this.bossId);
                //this.listSlot[j].sitDown();
                this.listPlayer.push(data.playerList[i]);
                pos = pos + 1;
            }
        }
        ZLog.error("listPlayer---------INFOOOO" + JSON.stringify(this.listPlayer.length));
    },

    playerJoinGame: function (data) {
        ZLog.error("data statussss" + data.status);
        for (var j = 0; j < this.listSlot.length; j++)
        {
            if(!this.listSlot[j].isAlive())
            {
                this.listSlot[j].setIsMe(data.uId === this.myDataInfo.uId);
                this.listSlot[j].setPlayerInfo(data);
                this.listSlot[j].setAlive(true);
                this.listSlot[j].setStatus(data.status);
                this.listPlayer.push(data);
                break;
            }
        }
    },

    onEnterTransitionDidFinish: function(){
        this._super();

    },

    onExitTransitionDidStart: function(){
        this._super();
    },

    onExit: function(){
        this._super();
        sceneMgr.removeScene(GV.SCENE_IDS.GAME_BACAY);

    },

    _showStatusGame: function (data,status) {
        switch (status){
            case BACAY_GAME_STATUS.CHUONG:
                this.gameStatus = BACAY_GAME_STATUS.CHUONG;
                this._guiChuong(data);
                break;

            case BACAY_GAME_STATUS.PRE_START:
                this.gameStatus = BACAY_GAME_STATUS.PRE_START;
                this.preStart(data.time);
                break;

            case BACAY_GAME_STATUS.BETTING:
                this.gameStatus = BACAY_GAME_STATUS.BETTING;
                this._guiDatCuoc(data.time);
                break;

            case BACAY_GAME_STATUS.BETCHICHKEN:
                this.gameStatus = BACAY_GAME_STATUS.BETCHICHKEN;
                this._guiVaoGa(data.time);
                break;

            case BACAY_GAME_STATUS.DEAL_GAME:
                this.gameStatus = BACAY_GAME_STATUS.DEAL_GAME;
                this._guiChiaBai(data);
                break;

            case BACAY_GAME_STATUS.LAT_BAI:
                this.gameStatus = BACAY_GAME_STATUS.LAT_BAI;
                this._guiLatBai(data);
                break;

            case BACAY_GAME_STATUS.END_GAME:
                this.gameStatus = BACAY_GAME_STATUS.END_GAME;
                this._guiEndGame(data);
                break;
        }
    },

    _showCountDownStart: function(time){
        this._stopTimerStart();
        this._timerCountDownStart = setInterval(function () {
            this.lbTimer.setString(time);
            time--;
            if (time === -1) {
                clearInterval(this._timerCountDownStart);
                ZLog.error("an node start - hien node vao ga");


            }
        }.bind(this), 1000);
    },

    _stopTimerStart :function () {
        clearInterval(this._timerCountDownStart);
    },

    _showCountDownChicken: function(time){
        this._stopTimerChicken();
        this._timerCountDownChicken = setInterval(function () {
            this.lbTimerChicken.setString(time);
            time--;
            if (time === -1) {
                clearInterval(this._timerCountDownChicken);
                ZLog.error("an node chicken - chiabai");
            }
        }.bind(this), 1000);
    },

    _stopTimerChicken :function () {
        clearInterval(this._timerCountDownChicken);
    },

    _guiChuong: function (data) {
        this.bossId = data.userID;
        if(data.code == BACAY_CHUONG_TYPE.BANCHUONG){
            //show ban chuong
            if(data.userID == 0){//Thong bao user nhan chuong hay ban chuong
                var content = {title : "BAN CHUONG", text: "BAN CO MUON BAN NHAN OR BAN KO?"};
                var listButtons = [
                    {btnName: 'ok', hide: true, callback: function(){
                        //do some thing
                        var data ={};
                        data.code = 1;
                        moduleMgr.getBaCayModule().sendBuyChuong(data);
                    }},
                    {btnName: 'cancel', hide: true, callback:function () {
                        var data ={};
                        data.code = 0;
                        moduleMgr.getBaCayModule().sendBuyChuong(data);
                    } }
                ];
                Popups.show(content, listButtons);
            }
            else if(data.userID != this.myDataInfo.uId){//THong boa user ABC mua chuong.
                // var msg = languageMgr.getString(languageMgr.getString("LB_DK_DOITHUONG_VIP2"));
                // var title = languageMgr.getString(languageMgr.getString("LB_TITLE_DOITHUONG_FAIL"));
                var content = {title : "MUA CHUONG", text: "BAN CO MUON MUA CHUONG KO?"};
                var listButtons = [
                    {btnName: 'ok', hide: true, callback: function(){
                        //do some thing
                        var data ={};
                        data.code = 1;
                        moduleMgr.getBaCayModule().sendBuyChuong(data);
                    }},
                    {btnName: 'cancel', hide: true}
                ];
                Popups.show(content, listButtons);

            }

        }
        else if(data.code == BACAY_CHUONG_TYPE.CHOICHUONG){ //Chơi chương
            for(var i = 0; i < this.listSlot.length; i++){
                if(this.listSlot[i].getUId() == data.userID) {
                    CenterNotifications.show("PLAYER" + data.displayName + "DA LAM CHUONG");
                    this.listSlot[i].setIsBoss(true);
                }
                else{
                    CenterNotifications.show("PLAYER" + data.displayName + "DA LAM CHUONG");
                    this.listSlot[i].setIsBoss(false);
                }
            }
        }
        else if(data.code == BACAY_CHUONG_TYPE.KHONG_CHUONG){ //Không chơi chương, chuyển nhất ăn tất
            for(var i = 0; i < this.listSlot.length; i++){
                if(this.listSlot[i].getUId() == data.userID){
                    this.listSlot[i].setIsBoss(false);
                    break;
                }
            }
        }
    },
    /**
     * @param time
     * @private
     */
    preStart: function (data) {
        ZLog.error("do some thing...PreStart" +JSON.stringify(this.listPlayer));
        for(var i = 0; i < this.listPlayer.length; i++){
            this.listSlot[i].setStatus(1);  //set lai status game cho player
            this.listSlot[i].setIsBoss(this.listSlot[i].getUId() == this.bossId); //Kiem tra xem thang chuong la thang nao trong listslot
        }
        this.nodeStart.setVisible(true);
        this._showCountDownStart(data);
        this.lbThongBao.setString("Van dau se bat dau sau:");

    },

    _guiDatCuoc: function(data){
        ZLog.error("do some thing...dat cuoc");
        this._showGUIDatCuoc(this.dataTable);  //hiện slider đặt cược
        this.lbThongBao.setString("THOI GIAN DAT CUOC CON:");
        this._showCountDownStart(data);
        ZLog.error("Choi 2 nguoi");
        for (var i = 0; i < this.listPlayer.length; i++) {
            if (this.mySlot.isBoss()) {
                ZLog.error("minh lam chuong");
                this.listSlot[i].setGuiBetting(!this.listSlot[i].isMe());
                this.nodeDatCuoc.setVisible(false);
                this._guiBetting.hideGui();
            }
            else{
                ZLog.error("minh khong lam chuong");
                this.listSlot[i].setGuiBetting(!this.listSlot[i].isBoss());
                this.nodeDatCuoc.setVisible(true);
                this._guiBetting.showGui();
            }
        }
    },

    _findSlotByID : function (slotId) {
        for(var i = 0; i < this.listSlot.length; i++)
        {
            if (this.listSlot[i].isAlive() && this.listSlot[i].getUId() === slotId) {
                return this.listSlot[i];
            }
        }
        return null;
    },

    _guiVaoGa: function(data){
         ZLog.error("do some thing...vao ga");
        if(this._guiBetting != null){
            this._guiBetting.hideGui();
        }
        if(this.listPlayer.length > 2){ // Nếu số người > 2 thì chơi ké cửa đánh biên
            ZLog.error("Choi nhieu hon 2 nguoi");
            for (var i = 0; i < this.listPlayer.length; i++){
                if (this.mySlot.isBoss()) {
                    ZLog.error("choi ke cua minh lam chuong");
                    this.listSlot[i].setButtonKeCuaDanhBien(false); // user khác ko hiện button ké cửa đánh biên
                    this.listSlot[i].setGuiKeCua(!this.listSlot[i].isMe());    // minh không hiện gold ké cửa
                }
                else{
                    ZLog.error("choi ke cua minh khong lam chuong");
                    this.mySlot.setButtonKeCuaDanhBien(false);                  // chính mình  ko hiện button ké cửa đánh biên
                    this.listSlot[i].setButtonKeCuaDanhBien(!this.listSlot[i].isBoss());// chương không hiện button ké cửa đánh biên
                    this.listSlot[i].setGuiKeCua(!this.listSlot[i].isBoss());    //chương không hiện gold ké cửa
                }
            }
        }
        this.nodeStart.setVisible(false);
        this.nodeDatCuoc.setVisible(false);
        this.btnCuocLai.setVisible(false);
        this.nodeChicken.setVisible(true);
        this._showCountDownChicken(data);

    },

    _guiChiaBai : function(data){
        for (var i = 0; i < this.listPlayer.length; i++){
            this.listSlot[i].setButtonKeCuaDanhBien(false); // ẩn  ké cửa đánh biên
            if(this._guiKeCuaDanhBien != null){
                this._guiKeCuaDanhBien.hide();
            }

        }

         ZLog.error("do some thing...chia bai" + JSON.stringify(data));
         this.nodeChicken.setVisible(false);
         this.listMyCards.push(data.card1);
         this.listMyCards.push(data.card2);
         this.listMyCards.push(data.card3);
         this._actionChiaBai();
    },

    _guiLatBai: function (data) {
        ZLog.error("do some thing...lat bai" + JSON.stringify(data));

        var cardPlayer = [];
        cardPlayer.push(data.card1);
        cardPlayer.push(data.card2);
        cardPlayer.push(data.card3);


        ZLog.error("LISTTTT  " + data.userID);
        for (var i = 0; i < this.listSlot.length ; i++){  // Duyệt số người chơi trong bàn
            if (this.listSlot[i].getUId() == data.userID){
                var listCardPlayer = this.listSlot[i].getCards();
                for(var j = 0; j < listCardPlayer.length; j++){
                    listCardPlayer[j].setSpriteFrame("textures/newcardschips/card_" + cardPlayer[j] + ".png");
                }
                break;
            }
        }
    },

    _guiEndGame : function(data){


        var sequenceTask = new SequenceTask();
        sequenceTask.pushTask(new BaseTask(this, this._showEndGame, [data], 2));
        sequenceTask.pushTask(new BaseTask(null, function () {
            ZLog.error("GUI LEVEL UP");
            // this.showGUILevelUp();
            // this.showGUIVipLevelUp();
        }.bind(this), [], 2));
        sequenceTask.pushTask(new BaseTask(this, this.resetNewGame, [], 1));
        asyncTaskMgr.executeTask(sequenceTask);
    },

    _showEndGame: function (data) {

        if(this._guiNanBai != null && this._guiNanBai.getCallBackNanBai() == false){
            this._guiNanBai.closeLayerNanBai();
        }
        ZLog.error("do some thing...endgame", JSON.stringify(data.playerList));
        for (var i = 0; i < this.listSlot.length ; i++){  // Duyệt số người chơi trong bàn
            for(var j = 0; j < data.playerList.length; j++){
                if (data.playerList[j].status != 1)
                    continue;
                if (this.listSlot[i].getUId() == data.playerList[j].uId){
                    this.listSlot[i].setSpriteWinLose(data.playerList[j].goldTotalWin);
                    this.listSlot[i].setCardSpecial(data.playerList[j].typeCards);
                    this.listSlot[i].setGuiEndGame(true);
                    this.listSlot[i].setDiemCards(data.playerList[j].evaCards);
                    this.listSlot[i].setGoldWinEndGame(data.playerList[j].goldTotalWin);
                    this.listSlot[i].setGold(data.playerList[j].chip); //Tổng tiền cuối cùng của user
                    var moveTo = cc.moveTo(2.0, cc.p(this.listSlot[i]._lbGoldWin.x, this.listSlot[i]._lbGoldWin.y + 70));
                    var delay = cc.delayTime(0.25);
                    var moveBack = cc.moveTo(0.1,this.listSlot[i]._lbGoldWin.getPosition().x, this.listSlot[i]._lbGoldWin.getPosition().y);


                    if (data.playerList[j].goldTotalWin > 0) {
                        this.listSlot[i]._lbGoldWin.runAction(cc.sequence(cc.fadeIn(0.1),moveTo, delay.clone(),cc.spawn(cc.fadeOut(0.12),moveBack)));
                    } else {
                        this.listSlot[i]._lbGoldWin.runAction(cc.sequence(cc.fadeIn(0.1),moveTo, delay.clone(),cc.spawn(cc.fadeOut(0.12),moveBack)));
                    }
                }
            }
        }
        this.hideEndGame();
    },

    callBackLatBai: function(){
        var listcards = this.mySlot.getCards();
        for (var i = 0 ; i < listcards.length; i++){
            var scaleTo = cc.scaleTo(0.4, 0.1, 1);
            var comeBack = cc.scaleTo(0.4, 1, 1);
            var delay = cc.delayTime(0.05);
            listcards[i].runAction(cc.sequence(scaleTo,delay,cc.spawn(cc.callFunc(function (sender,data) {
                ZLog.error("Call back lat bai", data);
                //sender.setTexture(res.card_0);
                sender.setSpriteFrame("textures/newcardschips/card_" + data + ".png");
            },listcards[i],this.listMyCards[i]),comeBack)));
        }
         ZLog.error("finish lat bai");
    },

    callBackActionBet : function (type,uid) {
        ZLog.error("callBackActionBetttttt + TYPE == " ,type);
        switch (type){
            case BACAY_ACTION_TYPE.BETTING:
                ZLog.error("send ---Dat cuoc");
                var dataDatCuoc = {};
                dataDatCuoc.actionID = BACAY_ACTION_TYPE.BETTING;
                dataDatCuoc.gold = this._guiBetting.getGoldDatCuoc();
                dataDatCuoc.currUserID = moduleMgr.getPlayerModule().getUId();
                dataDatCuoc.targetUserID = 0;
                moduleMgr.getBaCayModule().sendActionBetting(dataDatCuoc);
                ZLog.error("golddd dat " + JSON.stringify(this._guiBetting.getGoldDatCuoc()));
                break;

            case BACAY_ACTION_TYPE.BET_CHICKEN:
                ZLog.error("send --- vao ga",this.dataTable.blindLevel);
                var dataVaoGa = {};
                dataVaoGa.actionID = BACAY_ACTION_TYPE.BET_CHICKEN;
                dataVaoGa.gold = this.dataTable.blindLevel;
                dataVaoGa.currUserID = moduleMgr.getPlayerModule().getUId();
                dataVaoGa.targetUserID = 0;
                moduleMgr.getBaCayModule().sendActionBetting(dataVaoGa);
                break;

            case BACAY_ACTION_TYPE.BET_DANH_BIEN:
                ZLog.error("send action danh bien " , uid);
                var dataDanhBien = {};
                dataDanhBien.actionID = BACAY_ACTION_TYPE.BET_DANH_BIEN;
                dataDanhBien.gold = this._guiKeCuaDanhBien.getGoldKeCuaDanhBien();
                dataDanhBien.currUserID = moduleMgr.getPlayerModule().getUId();
                dataDanhBien.targetUserID = uid;
                moduleMgr.getBaCayModule().sendActionBetting(dataDanhBien);
                ZLog.error("golddd dat danh bien" + JSON.stringify(this._guiKeCuaDanhBien.getGoldKeCuaDanhBien()));
                break;
            case BACAY_ACTION_TYPE.BET_KE_CUA:
                ZLog.error("send action ke cua " , uid);
                var dataKeCua = {};
                dataKeCua.actionID = BACAY_ACTION_TYPE.BET_KE_CUA;
                dataKeCua.gold = this._guiKeCuaDanhBien.getGoldKeCuaDanhBien();
                dataKeCua.currUserID = moduleMgr.getPlayerModule().getUId();
                dataKeCua.targetUserID = uid;
                moduleMgr.getBaCayModule().sendActionBetting(dataKeCua);
                ZLog.error("golddd dat Ke cua" + JSON.stringify(this._guiKeCuaDanhBien.getGoldKeCuaDanhBien()));
                break;

            case BACAY_ACTION_TYPE.BET_DANH_BIEN_OK:

                break;
            case BACAY_ACTION_TYPE.LAT_BAI:
                ZLog.error("send action lat bai");
                var dataLatBai = {};
                dataLatBai.actionID = BACAY_ACTION_TYPE.LAT_BAI;
                dataLatBai.gold = 0;
                dataLatBai.currUserID = moduleMgr.getPlayerModule().getUId();
                dataLatBai.targetUserID = 0;
                moduleMgr.getBaCayModule().sendActionBetting(dataLatBai);
                break;
            default:
                break;
        }
    },

    _showGUIActionBet : function (data) {
        ZLog.error("SHOW GIAO DIEN DAT CUA " + JSON.stringify(data));
        switch (data.actionID){
            case BACAY_ACTION_TYPE.BETTING:
                if(data.currUserID == this.myDataInfo.uId) {
                    if (data.code == BACAY_CODE.SUCSSESS) {
                        CenterNotifications.show("DAT THANH CONG");
                        if(this._guiBetting != null){
                            this._guiBetting.hideGui();
                        }
                        this.mySlot.setGoldBetting(data.gold);
                        this.mySlot.subGold(this.dataTable.blindLevel);


                    }
                    else if (data.code == BACAY_CODE.NOT_MONEY){
                        CenterNotifications.show("KHONG DU TIEN");
                    }
                    else
                        CenterNotifications.show("DAT THAT BAI");
                }

                else  {
                    for (var i = 0; i < this.listSlot.length; i++) {
                        if(this.listSlot[i].isAlive() && this.listSlot[i].getPlayerInfo().uId == data.currUserID){
                            this.listSlot[i].setGoldBetting(data.gold);
                            this.listSlot[i].subGold(this.dataTable.blindLevel);

                        }

                    }
                }
                break;

            case BACAY_ACTION_TYPE.BET_CHICKEN:
                if(data.currUserID == this.myDataInfo.uId) {
                    switch (data.code) {
                        case BACAY_CODE.SUCSSESS:
                            CenterNotifications.show("DAT THANH CONG");
                            this.lbGoldGa.setString(Utility.formatMoney(data.gold));
                            this.mySlot.setSpriteChicken(true);
                            this.mySlot.subGold(this.dataTable.blindLevel);
                            break;
                        case BACAY_CODE.NOT_MONEY:
                            CenterNotifications.show("KHONG DU TIEN");
                            break;
                        case BACAY_CODE.ERROR:
                            CenterNotifications.show("DAT THAT BAI");
                            break;
                    }
                }
                else{
                    for (var i = 0; i < this.listSlot.length; i++) {
                        if(this.listSlot[i].isAlive() && this.listSlot[i].getPlayerInfo().uId == data.currUserID){
                            CenterNotifications.show("PLAYER # vua dat ga");
                            this.lbGoldGa.setString(data.gold);
                            this.listSlot[i].subGold(this.dataTable.blindLevel);
                            this.listSlot[i].setSpriteChicken(true);
                        }

                    }
                }
                break;

            case BACAY_ACTION_TYPE.BET_DANH_BIEN:
                switch (data.code) {
                    case BACAY_CODE.SUCSSESS:
                        CenterNotifications.show("DANH BIEN THANH CONG");
                        if (this.myDataInfo.uId == data.targetUserID) {
                            var content = {title: "DANH BIEN", text: "BAN CO MUON DANH BIEN KO?"};
                            var listButtons = [{
                                btnName: 'ok', hide: true, callback: function () {
                                    var dataDanhBienOK = {};
                                    dataDanhBienOK.actionID = BACAY_ACTION_TYPE.BET_DANH_BIEN_OK;
                                    dataDanhBienOK.gold = data.gold;
                                    dataDanhBienOK.currUserID = data.currUserID;
                                    dataDanhBienOK.targetUserID = data.targetUserID;
                                    moduleMgr.getBaCayModule().sendActionBetting(dataDanhBienOK);
                                }
                            },
                                {btnName: 'cancel', hide: true}];
                            Popups.show(content, listButtons);
                        }
                        // if(data.targetUserID == this.myDataInfo.uId) {
                        //     this.mySlot.setGuiDanhBien(true);
                        //     this.mySlot.setGoldDanhBien(data.gold);
                        // }
                        // else {
                        //     for (var i = 0; i < this.listSlot.length; i++) {
                        //         if(this.listSlot[i].isAlive() && this.listSlot[i].getUId() == data.currUserID){
                        //             this.listSlot[i].setGuiDanhBien(data.gold);
                        //             this.listSlot[i].setGoldDanhBien(data.gold);
                        //         }
                        //     }
                        // }

                        break;
                    case BACAY_CODE.NOT_MONEY:
                        CenterNotifications.show("KHONG DU TIEN");
                        break;
                    case BACAY_CODE.ERROR:
                        CenterNotifications.show("DAT THAT BAI");
                        break;
                }
                break;

            case BACAY_ACTION_TYPE.BET_KE_CUA:
                    if (data.code == BACAY_CODE.SUCSSESS) {
                        for (var i = 0; i < this.listSlot.length; i++) {
                            if(this.listSlot[i].isAlive() && this.listSlot[i].getUId() == data.targetUserID){
                                ZLog.error("listSlot------" + JSON.stringify(this.listSlot[i].getUId()));
                                this.listSlot[i].setGoldKeCua(data.gold);
                                this.listSlot[i].btnKeCua.setVisible(false);
                            }
                        }
                    }
                break;

            case BACAY_ACTION_TYPE.BET_DANH_BIEN_OK:

                this.mySlot.setGuiDanhBien(true);
                this.mySlot.setGoldDanhBien(data.gold);
                // if (this.myDataInfo.uId == data.targetUserID) {
                //     var content = {title: "DANH BIEN", text: "BAN CO MUON DANH BIEN KO?"};
                //     var listButtons = [{
                //         btnName: 'ok', hide: true, callback: function () {
                //             var dataDanhBienOK = {};
                //             dataDanhBienOK.actionID = BACAY_ACTION_TYPE.BET_DANH_BIEN_OK;
                //             dataDanhBienOK.gold = data.gold;
                //             dataDanhBienOK.currUserID = data.currUserID;
                //             dataDanhBienOK.targetUserID = data.targetUserID;
                //             moduleMgr.getBaCayModule().sendActionBetting(dataDanhBienOK);
                //         }
                //     },
                //         {btnName: 'cancel', hide: true}];
                //     Popups.show(content, listButtons);
                // }
                break;
            default:
                break;
        }
    },


    onLeaveRoom:function (data) {
        ZLog.error("Player Out room");
        ZLog.error("_isRegOut????? khi nhan duoc respone" + this._isRegOut);
        if (data.code === BC_LEAVE_GAME.LEAVE_GAME) {
            this._isRegOut = true;
            if (this.gameStatus === BACAY_GAME_STATUS.PRE_START || this.gameStatus === BACAY_GAME_STATUS.CHUONG) {
                if(this._isRegOut == true){
                    sceneMgr.viewSceneById(GV.SCENE_IDS.LIST_TABLES);
                }
            }

        }
        else if(data.code === BC_LEAVE_GAME.REGISTER_LEAVE_GAME){ //đăng ký rời bàn
                CenterNotifications.show(languageMgr.getString("REG_OUT_TABLE"));
                this.isRegOut = true;
            }
        else if (data.code === BC_LEAVE_GAME.UN_REGISTER_LEAVE_GAME) { //click 1 lan nua thi huy dang ki roi ban
                CenterNotifications.show(languageMgr.getString("CANCEL_OUT_TABLE"));
                this.isRegOut = false;
        }
        else{
            if (data.userID === this.bossId) { // Rời bàn nếu đang làm chương thì huỷ chương để thằng khác làm!
                this.bossId = 0;
            }
            this.listPlayerOutGame.push(data.userID); // đẩy hết các userID rời bàn vào 1 list để xoá
            for(var i = 0 ; i < this.listSlot; i++){
                if(this.listSlot[i].isAlive() && this.listSlot.getUId() == data.userID){
                    this.listSlot[i].leaveTable();
                }
            }
        }
    },

    backToLobby: function(){
        // confirm to quiting game
        if (this.gameStatus === BACAY_GAME_STATUS.PRE_START || this.gameStatus === BACAY_GAME_STATUS.CHUONG ||this.gameStatus === BACAY_GAME_STATUS.BETTING ||
            this.gameStatus === BACAY_GAME_STATUS.BETCHICHKEN || this.gameStatus === BACAY_GAME_STATUS.LAT_BAI) {
            var content = {text: languageMgr.getString("CONFIRM_EXIT")};
            var listButtons = [
                {
                    btnName: 'ok', hide: true, callback: {
                    func: function () {
                        moduleMgr.getBaCayModule().sendLeaveRoomBaCay();
                    }.bind(this)
                }
                },
                {btnName: 'cancel', hide: true}
            ];
            Popups.show(content, listButtons);
        } else {
            moduleMgr.getBaCayModule().sendLeaveRoomBaCay();
            if(this._isRegOut == true){
                sceneMgr.viewSceneById(GV.SCENE_IDS.LIST_TABLES);
            }
        }
    },
    _actionChiaBai : function () {
        var configTable = resourceMgr.getConfigTableCashGame(this.dataTable.structureId);
        var time = 0;
        var scale = 0.5;
        //var dtPos = cc.p (0,0);
        var timeSlow = 3*8/3;
        var timeDealOne = 0.05*timeSlow;
        var count = 0;
        for (var i = 1; i <= 3; i++)  //Tổng số quân bài muốn chia
        {
            for (var j = 1; j <= this.listSlot.length; j++) {
                if (!this.listSlot[j - 1].isAlive() || this.listSlot[j - 1].getStatus() != 1 ) //Nếu không ngồi và xem thi bo qua
                    continue;
                //Check chia bai ban 6 hay 9
                if(configTable.maxPlayer == BACAY_MAX.PLAYER6){
                    var dtPos = this.slotPos6[j-1];
                }
                else{
                    var dtPos = this.slotPos9[j-1];
                }

                count++;

                time  = time + 0.05; // Tốc độ chia bài

                var card = new BaCayCard();
                card.setPosition(cc.winSize.width/2, cc.winSize.height/2);
                this.addChild(card,1);
                card.setScale(0.5);
                card.setLocalZOrder(-count);
                scale = 0.4;

                var x = dtPos.x; //  vị trí chiều ngang quân bài
                var y = dtPos.y; //  vị trí chiều ngang quân bài
                var dtx = 20; //  Khoảng cách ngang giữa 2 quân bài
                var dty = 20; //  Khoảng cách dọc giữa 2 quân bài
                var dtx1 = 30; //  Khoảng cách ngang theo contenSize cha
                var dty1 = 0; //  Khoảng cách dọc theo contenSize cha
                var anChorX =  card.getContentSize().width * 0.5 * scale;
                var anChorY =  card.getContentSize().height * 0.5 * scale;
               // card.addCards()

                this.listSlot[j-1].addCards(card);

                if(this.dataTable.maxPlayer == BACAY_MAX.PLAYER9){
                    ZLog.error("Chia bai 9 nguoi");
                    if(j == 1 ){        // Bộ bài của minh
                        x = dtPos.x - this.contenSizeAVT.height * 0.5 + 90 * (i - 1) + 150 + anChorX;
                        y= dtPos.y + this.contenSizeAVT.width * 0.5 - dty + anChorY;
                        scale = 1;
                    }
                    else if( j == 2 || j == 3 || j == 4){
                        // dtPos.x = 280;
                        // card.setAnchorPoint(0,0);
                        x = dtPos.x + this.contenSizeAVT.width * 0.5 + 5 + anChorX;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                        ZLog.error("dtPost " + JSON.stringify(dtPos));
                        // this.contenSizeAVT.height += i + 15;
                    }
                    else if( j == 5 || j ==6){
                        // card.setAnchorPoint(0,1);
                        x = dtPos.x - this.contenSizeAVT.height * 0.5 + dtx * (i - 1) + dtx1 + anChorX;
                        y= dtPos.y - this.contenSizeAVT.width * 0.5 - 50 - anChorY;

                    }
                    else if( j == 7 || j == 8 || j == 9){
                        // card.setAnchorPoint(1,0);
                        x = dtPos.x - this.contenSizeAVT.width * 0.5 - 5 - anChorX ;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                    }

                }
                else{
                    ZLog.error("Chia bai 6 nguoi");
                    if(j == 1 ){        // Bộ bài của minh
                        x = dtPos.x - this.contenSizeAVT.height * 0.5 + 90 * (i - 1) + 150 + anChorX;
                        y= dtPos.y + this.contenSizeAVT.width * 0.5 - dty + anChorY;
                        scale = 1;
                    }
                    else if(j == 2){    //left
                        x = dtPos.x + this.contenSizeAVT.width * 0.5 + 5 + anChorX;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                    }
                    else if(j == 3 || j == 4){ //top
                        // card.setAnchorPoint(0,1);
                        x = dtPos.x - this.contenSizeAVT.height * 0.5 + dtx * (i - 1) + dtx1 + anChorX;
                        y= dtPos.y - this.contenSizeAVT.width * 0.5 - 50 - anChorY;
                    }
                    else if( j == 5 || j == 6){ // right
                        x = dtPos.x - this.contenSizeAVT.width * 0.5 - 5 - anChorX ;
                        y = dtPos.y - this.contenSizeAVT.height * 0.5 + dty * (i - 1) + dty1 + anChorY ;
                    }

                }

                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cc.p(x,y)), cc.scaleTo(timeDealOne, scale), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(time), cc.delayTime(time), cc.show(),
                    acSpawn,cc.delayTime(0.25 * j),cc.callFunc(function () {
                      // this.btnLatBai.setVisible(true);
                    }.bind(this)));
                card.runAction(sequence);

            }

        }
        ZLog.error("finish chia bai", JSON.stringify(this.listMyCards));
        setTimeout(function(){
            this._showNanBai(this.listMyCards);
        }.bind(this), this.listPlayer.length * 500);
    },

    _createChipWhenBetChicken: function (slot, to, value) {
        var chip = new cc.Sprite("#" + res['phinh' + value]);
        chip.setPosition(slot.getPosition());
        this.getLayer(GV.LAYERS.EFFECT).addChild(chip);
        var action = cc.moveTo(0.5, to).easing(cc.easeIn(0.5));
        chip.runAction(action);
        this.listIconBet.push(chip);
    },

    _hienNodeDatCuoc: function () {
        this._showGUIDatCuoc(this.dataTable);
        this.nodeDatCuoc.setVisible(true);
        this.btnCuocLai.setVisible(false);
    },

    _anNodeDatCuoc: function () {
        this.nodeDatCuoc.setVisible(false);
        this.btnCuocLai.setVisible(true);
    },


    resetNewGame : function () {
        ZLog.error("listPlayer---------INFOOOO" + JSON.stringify(this.listPlayer.length));
        ZLog.error("_isRegOut????? khi endgame" + this._isRegOut);
        if(this._isRegOut == true){
            sceneMgr.viewSceneById(GV.SCENE_IDS.LIST_TABLES);
        }
        for (var i = 0; i < this.listSlot.length ; i++){
            this.listSlot[i].removeCards();  // Xoá bộ bài chia của tất cả player
            this.listSlot[i].cleanUP();
        }
        this.listMyCards = [];

        for(var i = 0 ; i < this.listPlayerOutGame.length;i++){
            for(var j = 0 ; j < this.listSlot.length; j++){
                if(this.listSlot[j].isAlive() && this.listSlot[j].getUId() == this.listPlayerOutGame[i]){
                    this.listSlot[j].leaveTable();
                    this.listPlayer.splice(j,1);
                }
            }
        }

        for (var i = 0 ; i < this.listIconBet.length; i++){
            this.listIconBet.removeFromParent(); // Xoá phỉnh khi vào gà
        }
        this.listIconBet = [];

        this.lbGoldGa.setString("");
        ZLog.error("listPlayer---------SAU KHI XOA ROI BAN" + JSON.stringify(this.listPlayer.length));
    },


    hideEndGame: function () {
        this.nodeStart.setVisible(false);
        this.nodeChicken.setVisible(false);
        this.nodeDatCuoc.setVisible(false);
        this.btnLatBai.setVisible(false);
        this.btnCuocLai.setVisible(false);
        //Xoa bo bai
        //hide effect
    },
    showGUIKeCuaDanhBien : function (type,uid) {
        ZLog.error("Typeee" , type);
        if(this._guiKeCuaDanhBien == null){
            this._guiKeCuaDanhBien = new GUIKeCuaDanhBien();
            this._guiKeCuaDanhBien.retain();
            this._guiKeCuaDanhBien.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        }
        this._guiKeCuaDanhBien.setData(this.dataTable,type,uid);
        this._guiKeCuaDanhBien.showAtCurrentScene();
    },
    _showGUIDatCuoc: function (data) {
        if(this._guiBetting == null){
            this._guiBetting  = new GUIDatCuoc();
            this.getLayer(GV.LAYERS.GAME).addChild(this._guiBetting,10);
            this.retain();
        }
        this._guiBetting.setData(data);
        this._guiBetting.showGui();
    },

    _showNanBai: function (listCards) {
        if(this._guiNanBai == null){
            this._guiNanBai  = new GUINanBai();
            this.getLayer(GV.LAYERS.GAME).addChild(this._guiNanBai,11);
            this.retain();
        }
        this._guiNanBai.initListCardHand(listCards);
        // this._guiNanBai.setCallBackNanBai(false);
        this._guiNanBai.showAtCurrentScene();

    },

    onTouchUIEndEvent: function (sender) {
         switch (sender) {
            case this.btn_setting:
                if(this._guiSetting === null){
                    this._guiSetting = new GUISetting();
                    this.getLayer(GV.LAYERS.GUI).addChild(this._guiSetting, 4);
                    this._guiSetting.btnConfirmSms.setVisible(false);
                }
                this._guiSetting.btnConfirmSms.setVisible(false);
                this._guiSetting.btnLogout.setVisible(false);
                this._guiSetting.btnSupport.setVisible(false);
                this._guiSetting.show();
                break;

            case this.btn_chat:
                break;

            case this.btn_quit:
                this.backToLobby();
                break;

            case this.btn_addGold:
                if(GV.sms === null){
                    this.getDataSms(pokerHostListSms +GV.playerId);
                }
                var data = {};
                data.uId = moduleMgr.getPlayerModule().getUId();
                moduleMgr.getPaymentModule().sendIdStore(data);
                moduleMgr.getPaymentModule().showGUIStoreMini();
                break;

            case this.btnVaoGa:
                 this.callBackActionBet(BACAY_ACTION_TYPE.BET_CHICKEN);
                 break;

            case this.btnDatCuoc:
                //this._guiBetting.getGoldBetting();
                this.callBackActionBet(BACAY_ACTION_TYPE.BETTING);
                this._anNodeDatCuoc();
                 break;

            case this.btnHuyBo:
                this._guiBetting.resetBetting();
                 break;

            case this.btnCuocLai:
                 this._hienNodeDatCuoc();
                 break;

            case this.btnLatBai:
                 this.callBackActionBet(BACAY_ACTION_TYPE.LAT_BAI);
                 break;

        }
    }
});
