
var GUISlotBaCay = BaseSlot.extend({
    ctor: function () {
        this._super();
        this.lbGold = null;
        this.lbName = null;
        this.iconAvatar = null;
        this.imgAvatar = null;
        this.btnKeCua = null;
        this.btnDanhBien = null;
        this.nodeKeCuaDanhBien = null;
        this.nodeGoldBeting = null;
        this.lbGoldBetting = null;
        this._goldBetting = 0;
        this.listCards = [];
        this.spWinLose = null;
        this._lbDiem = null;
        this._lbGoldWin = null;
        this.diemCards = -1;
        this.goldWin = 0;
        this.nodeEndGame = null;
        this._spCardSpecial = null;
        this._lbGoldKeCua = null;
        this._lbGoldDanhBien = null;
        this._nodeKeCua = null;
        this._nodeDanhBien = null;
        this._spChicken = null;
        this.test  =0;
        this.init();
    },
    init: function () {
        var size = cc.winSize;
        this._super();

        ZLog.error("Finish Slots");
    },

    showLabelDiem : function (slotUIIdx) {          //dựng label điểm của bộ bài
        this.nodeEndGame = new ccui.Layout();
       // layout.setLayoutType(ccui.Layout.DIR_VERTICAL);
        this.nodeEndGame.setContentSize(80,60);
        this.nodeEndGame.setAnchorPoint(0.5,0.5);
        this.addChild(this.nodeEndGame, 1);

        switch(slotUIIdx) {
            case BACAY_POS.ISME:
                this.nodeEndGame.setPosition(0,110);
                break;
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
                this.nodeEndGame.setPosition(-100,10);
                break;
            case BACAY_POS.PLAYER4:
            case BACAY_POS.PLAYER5:
                this.nodeEndGame.setPosition(100,10);
                break;
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this.nodeEndGame.setPosition(100,10);
                break;
        }
        this._lbDiem = new cc.LabelTTF("", res.UTM_PenumbraBold, 20);
        this._lbDiem.setPosition(45,45);
        this.nodeEndGame.addChild(this._lbDiem,1);

        this._lbGoldWin = new cc.LabelBMFont("", res.font_tienvang_to);
        this._lbGoldWin.setPosition(45, 20);
        this.nodeEndGame.addChild(this._lbGoldWin, 2);
        this.nodeEndGame.setVisible(false);


    },

    showSpriteWinLose : function (slotUIIdx) { // dựng sprite thắng thua end game
        this.spWinLose= new cc.Sprite();
        this.spWinLose.setPosition(0, -68);
        this.spWinLose.setLocalZOrder(3);
        this.spWinLose.setVisible(false);
        this.addChild(this.spWinLose, 3);
    },

    setSpriteWinLose : function (gold) {            //set Sprite thắng thua lúc endgame
        this.spWinLose.setVisible(true);
        if(gold > 0){
            this.spWinLose.setSpriteFrame("textures/bacay/icon_thang.png");
        }
        else
            this.spWinLose.setSpriteFrame("textures/bacay/icon_thua.png");
    },

    showSpriteChicken : function (slotUIIdx) {
        this._spChicken = new cc.Sprite("#textures/bacay/icon_chicken.png");
        switch (slotUIIdx){
            case BACAY_POS.ISME:
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
            case BACAY_POS.PLAYER4:
                this._spChicken.setPosition(-42,20);
                break;
            case BACAY_POS.PLAYER5:
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this._spChicken.setPosition(42,20);
                break;
        }
        this._spChicken.setLocalZOrder(3);
        this._spChicken.setVisible(false);
        this.addChild(this._spChicken, 3);
    },

    setSpriteChicken: function (b) {
        this._spChicken.setVisible(b);   // Ẩn hiện  icon Ga`
    },


    showGoldBetting: function (slotUIIdx) {         // dựng icon và gold đánh đặt cược
        this.nodeGoldBeting = new ccui.Layout();
        this.nodeGoldBeting.setContentSize(100,30);
        this.nodeGoldBeting.setAnchorPoint(0.5,0.5);
        this.addChild(this.nodeGoldBeting, 1);

        switch(slotUIIdx) {
            case BACAY_POS.ISME:
                this.nodeGoldBeting.setPosition(0,80);
                break;
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
                this.nodeGoldBeting.setPosition(85,50);
                break;
            case BACAY_POS.PLAYER4:
            case BACAY_POS.PLAYER5:
                this.nodeGoldBeting.setPosition(-40,-80);
                break;
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this.nodeGoldBeting.setPosition(-90,50);
                break;
        }
        var iconCoin = new cc.Sprite("#" + res.phinh5);
        iconCoin.setAnchorPoint(0.5,0.5);
        iconCoin.setScale(0.2);
        iconCoin.setPosition(this.nodeGoldBeting.getContentSize().width/2 - 30, this.nodeGoldBeting.getContentSize().height/2);
        this.nodeGoldBeting.addChild(iconCoin,1);

        this.lbGoldBetting = new cc.LabelTTF("", res.FONT_UTM_PENUMBRA, 15,cc.size(84,21),cc.TEXT_ALIGNMENT_CENTER);
        this.lbGoldBetting.setPosition(iconCoin.getPositionX()+ 30, iconCoin.getPositionY());

        this.nodeGoldBeting.addChild(this.lbGoldBetting, 2);
        this.nodeGoldBeting.setVisible(false);
    },

    showKeCuaDanhBien: function (slotUIIdx) {  // dựng 2 button ke cua danh bien
        this.test = slotUIIdx;
        ZLog.error("SLOT KE CUA DANH BIEN" + JSON.stringify(slotUIIdx));
        this.nodeKeCuaDanhBien = new ccui.Layout();
        this.nodeKeCuaDanhBien.setContentSize(100,60);
        this.nodeKeCuaDanhBien.setAnchorPoint(0.5,0.5);
        this.addChild(this.nodeKeCuaDanhBien, 1);



        this.btnKeCua = new ccui.Button("textures/bacay/btn_ke_cua.png", "", "",ccui.Widget.PLIST_TEXTURE);
        this.btnKeCua.setPosition(this.nodeKeCuaDanhBien.getContentSize().width/2 , this.nodeKeCuaDanhBien.getContentSize().height/2 + 20);
        this.btnKeCua.setTitleText("KÉ CỬA");
        this.btnKeCua.setTitleFontSize("10");
        this.btnKeCua.setTitleFontName(res.UTM_PenumbraBold);
        this.btnKeCua.addTouchEventListener(this._onTouchUIEvent, this);
        this.btnKeCua.setPressedActionEnabled(true);
        this.nodeKeCuaDanhBien.addChild(this.btnKeCua,1);

        this.btnDanhBien = new ccui.Button("textures/bacay/btn_ke_cua.png", "", "",ccui.Widget.PLIST_TEXTURE);
        this.btnDanhBien.setPosition(this.btnKeCua.getPositionX(), this.btnKeCua.getPositionY() - 30);
        this.btnDanhBien.setTitleText("ĐÁNH BIÊN");
        this.btnDanhBien.setTitleFontSize("10");
        this.btnDanhBien.setTitleFontName(res.UTM_PenumbraBold);
        this.btnDanhBien.addTouchEventListener(this._onTouchUIEvent, this);
        this.btnDanhBien.setPressedActionEnabled(true);
        this.nodeKeCuaDanhBien.addChild(this.btnDanhBien,1);
        this.nodeKeCuaDanhBien.setVisible(false);

        switch(slotUIIdx) {
            case BACAY_POS.ISME:
                this.nodeKeCuaDanhBien.setVisible(false);
                break;
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
                this.nodeKeCuaDanhBien.setPosition(-100,30);
                break;
            case BACAY_POS.PLAYER4:
            case BACAY_POS.PLAYER5:
                this.nodeKeCuaDanhBien.setPosition(100,30);
                break;
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this.nodeKeCuaDanhBien.setPosition(100,30);
                break;
        }

    },

    showGoldKeCua: function (slotUIIdx) {   // dựng icon và gold ké cửa
        this._nodeKeCua = new ccui.Layout();
        this._nodeKeCua.setContentSize(100,30);
        this._nodeKeCua.setAnchorPoint(0.5,0.5);
        this.addChild(this._nodeKeCua, 1);

        switch(slotUIIdx) {
            case BACAY_POS.ISME:
                this._nodeKeCua.setPosition(0,100);
                break;
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
                this._nodeKeCua.setPosition(85,70);
                break;
            case BACAY_POS.PLAYER4:
            case BACAY_POS.PLAYER5:
                this._nodeKeCua.setPosition(40,-80);
                break;
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this._nodeKeCua.setPosition(-90,70);
                break;
        }
        var iconCoin = new cc.Sprite("#" + res.phinh3);
        iconCoin.setAnchorPoint(0.5,0.5);
        iconCoin.setScale(0.2);
        iconCoin.setPosition(this._nodeKeCua.getContentSize().width/2 - 30, this._nodeKeCua.getContentSize().height/2);
        this._nodeKeCua.addChild(iconCoin,1);

        this._lbGoldKeCua = new cc.LabelTTF("0", res.FONT_UTM_PENUMBRA, 15,cc.size(84,21),cc.TEXT_ALIGNMENT_CENTER);
        this._lbGoldKeCua.setPosition(iconCoin.getPositionX()+ 40, iconCoin.getPositionY());
        this._lbGoldKeCua.setColor(cc.color(0,128,0));
        this._nodeKeCua.addChild(this._lbGoldKeCua, 2);
        this._nodeKeCua.setVisible(false);

    },

    showGoldDanhBien: function (slotUIIdx) {            // dựng icon và gold đánh biên
        this._nodeDanhBien = new ccui.Layout();
        this._nodeDanhBien.setContentSize(100,30);
        this._nodeDanhBien.setAnchorPoint(0.5,0.5);
        this.addChild( this._nodeDanhBien, 1);

        switch(slotUIIdx) {
            case BACAY_POS.ISME:
                this._nodeDanhBien.setPosition(-100,-20);
                break;
            case BACAY_POS.PLAYER1:
            case BACAY_POS.PLAYER2:
            case BACAY_POS.PLAYER3:
                this._nodeDanhBien.setPosition(-100,-20);
                break;
            case BACAY_POS.PLAYER4:
                this._nodeDanhBien.setPosition(100,-20);
                break;
            case BACAY_POS.PLAYER5:
                this._nodeDanhBien.setPosition(-100,-20);
                break;
            case BACAY_POS.PLAYER6:
            case BACAY_POS.PLAYER7:
            case BACAY_POS.PLAYER8:
                this._nodeDanhBien.setPosition(100,-20);
                break;
        }
        var iconCoin = new cc.Sprite("#" + res.phinh4);
        iconCoin.setAnchorPoint(0.5,0.5);
        iconCoin.setScale(0.2);
        iconCoin.setPosition(this._nodeDanhBien.getContentSize().width/2 - 30, this._nodeDanhBien.getContentSize().height/2);
        this._nodeDanhBien.addChild(iconCoin,1);

        this._lbGoldDanhBien = new cc.LabelTTF("0", res.FONT_UTM_PENUMBRA, 15,cc.size(84,21),cc.TEXT_ALIGNMENT_CENTER);
        this._lbGoldDanhBien.setPosition(iconCoin.getPositionX()+ 40, iconCoin.getPositionY());
        this._lbGoldDanhBien.setColor(cc.color(255,165,0));
        this._nodeDanhBien.addChild(this._lbGoldDanhBien, 2);
        this._nodeDanhBien.setVisible(false);
    },

    showCardSpecial: function (slotUIIdx) {         // dựng sprite bộ bài đặc biệt
        this._spCardSpecial= new cc.Sprite();
        this._spCardSpecial.setPosition(0, 0);
        this._spCardSpecial.setLocalZOrder(3);
        this._spCardSpecial.setVisible(false);
        this.addChild(this._spCardSpecial, 3);
    },

    setCardSpecial: function (type) {   //set bộ bài đặc biệt
        this._spCardSpecial.setVisible(true);
        switch (type){
            case BACAY_BOBAI_TYPE.VAY:
                this._spCardSpecial.setSpriteFrame("textures/bacay/lieng.png");
                break;
            case BACAY_BOBAI_TYPE.SAP:
                this._spCardSpecial.setSpriteFrame("textures/bacay/sap_at_cu.png");
                break;
            case BACAY_BOBAI_TYPE.AT_CU:
                this._spCardSpecial.setSpriteFrame("textures/bacay/muoiAtCu.png");
                break;
            case BACAY_BOBAI_TYPE.MUOI:
                this._lbDiem.setVisible(false);
                this._spCardSpecial.setSpriteFrame("textures/bacay/10Diem.png");
                break;
            case BACAY_BOBAI_TYPE.THUONG:
                this._spCardSpecial.setVisible(false);
                this._lbDiem.setVisible(true);
                break;
            default:
                this._lbDiem.setVisible(false);
                break;
        }
    },

    setGoldBetting: function (gold) { //set gold đặt cược
        this._goldBetting = gold;

        var anim = fr.playAnimationOnce(res.anim_betting_1);
        anim.setAnchorPoint(0,0.5);
        anim.setPosition(8,30);
        this.nodeGoldBeting.addChild(anim);
        this.lbGoldBetting.setString(Utility.formatMoney(gold));
    },

    setGoldKeCua: function (gold) { //set gold Ke Cua
        this._lbGoldKeCua.setString(Utility.formatMoney(gold));
    },

    setGoldDanhBien: function (gold) { //set gold Danh Bien
        this._lbGoldDanhBien.setString(Utility.formatMoney(gold));
    },

    getGoldBetting: function () {
        return this._goldBetting;
    },

    setDiemCards: function (diem) {                 //set điểm bộ bài
        this.diemCards = diem;
        if(this.diemCards == 0){
            this._lbDiem.setString("10" + "điểm");
        }
        else
            this._lbDiem.setString(diem + "điểm");
    },

    setGoldWinEndGame: function (goldEndGame) {
        this.goldWin = goldEndGame;
        this._lbGoldWin.setString(Utility.formatMoney(goldEndGame)); // set gold total win end game
    },

    setGuiBetting: function (b) {
        this.nodeGoldBeting.setVisible(b);  // Ẩn hiện  showGoldBetting
    },

    setGuiEndGame: function (b) {
        this.nodeEndGame.setVisible(b);   // Ẩn hiện  showLabelDiem (điểm và gold end game);
    },

    setGuiKeCua: function (b) {
        this._nodeKeCua.setVisible(b);   // Ẩn hiện  icon va gold ke cua
    },

    setGuiDanhBien: function (b) {
        this._nodeDanhBien.setVisible(b);    // Ẩn hiện  icon va gold danh bien
    },

    setButtonKeCuaDanhBien: function (b) {
        this.nodeKeCuaDanhBien.setVisible(b);   // Ẩn hiện  show 2 button ké cửa đánh biên

    },

    addCards: function (data) {
        this.listCards.push(data);             //Add bộ bài uid vào list
    },

    getCards: function () {
        return this.listCards;              //lấy list bộ bài uid
    },

    removeCards: function () {
        for (var i = 0; i < this.listCards.length; i++) {
            this.listCards[i].removeFromParent();          //Xoá bộ bài
        }
        this.listCards = [];

    },

    cleanUP: function () {
        this._lbDiem.setString("");
        this._lbGoldWin.setString("");
        this.lbGoldBetting.setString("");
        this._lbGoldKeCua.setString("0");i
        this._lbGoldDanhBien.setString("0");
        this.spWinLose.setVisible(false);
        this._spCardSpecial.setVisible(false);
        this.setGuiEndGame(false);
        this.setGuiDanhBien(false);
        this.setGuiKeCua(false);
        this.setButtonKeCuaDanhBien(false);
        this.setGuiBetting(false);
        this.setSpriteChicken(false);
    },


    leaveTable:function () {
        this._super();
        this.cleanUP();
        for (var i = 0; i < this.listCards.length; i++) {
            this.listCards[i].removeFromParent();          //Xoá bộ bài
        }
        this.listCards = [];
    },

    onTouchUIEndEvent: function (sender) {
        ZLog.error("dasdsd", this.test);
        switch (sender) {
            case this.btnInvite:
                // gui loi moi game truyen thong
                var data = {};
                data.uId = moduleMgr.getPlayerModule().getPlayerInfo().uId;
                data.tableId = this.tableId;
                data.goldMin = this.blindLevel;
                data.goldMax = this.blindLevel * 2;
                data.structureId = this.structureId;
                moduleMgr.getLobbyModule().sendInvitingCashGame(data);
                Notifications.show(languageMgr.getString("TOURNAMENT_INVITING_SUCCESS"));
                break;
            case this.btnKeCua:
                if(sceneMgr.isScene(GV.SCENE_IDS.GAME_BACAY)){
                    ZLog.error("Ke cua");
                    var _sceneBacay = sceneMgr.getCurrentScene();
                    _sceneBacay.showGUIKeCuaDanhBien(BACAY_TYPE.KECUA,this.getUId());
                }
                break;
            case this.btnDanhBien:
                if(sceneMgr.isScene(GV.SCENE_IDS.GAME_BACAY)){
                    ZLog.error("Danh bien");
                    var _sceneBacay = sceneMgr.getCurrentScene();
                    _sceneBacay.showGUIKeCuaDanhBien(BACAY_TYPE.DANHBIEN,this.getUId());
                }
                break;

        }
    },
});