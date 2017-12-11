/**
 * Created by  on MinNguyen 12/11/2017.
 */

var Slot = AdminGUI.extend({
    _className: "BaseSlot",

    ctor: function () {
        this._super();
        // logic
        this.blindLevel = 0; //khởi tạo mức tiền chơi
        this.structureId = ""; // cấu trúc phòng
        this.tableId = 0; //tên phòng
        this.playerInfo = new DataPlayer(); //dữ liệu player
        this._isBoss = false;    //làm chương or chủ phòng
        this._isMe = false;      // mình
        this._status = SLOT_STATUS.NONE;
        this.index = -1;

        // UI
        this._nodeUI = null;
        this.imgVIP = null;
        this.img_bg = null;
        this.lbPlayerName = null;
        this.btnInvite = null;
        this.lbMoney = null;
        this.node_avatar = null;
        this.avatar = null;
        this.img_chuong = null;
        this.lb_status = null;

    },

    init:function () {
        this._super();
        this.setDeepSyncChildren(3);
        this.syncAllChildren(res.node_table_slot, this);

        // this.avatar = new fr.Avatar("avatar_default", cc.size(84, 80));
        // var self = this;
        // this.avatar.addTouchAvatarListener(function(){
        //     if(self.playerInfo && self.isAlive()){
        //         moduleMgr.getPlayerModule().showGUIPlayerInfoDetail(self.playerInfo.uId, self.playerInfo.uName, self.playerInfo.defaultAvatar, self.playerInfo.level);
        //     }
        // });
        // this.node_avatar.addChild(this.avatar);

        this._nodeUI.setVisible(false);
        this.btnInvite.setVisible(true);


        this.setIsMe(false); //Không Phải mình
        this.setIsBoss(false); //Không phải chương
        this.setVip(0);
        this.setStatus(SLOT_STATUS.NONE);
        this.lb_status.setVisible(false);

    },

    setTableInfo: function (tableId,blindLevel,structureId) { //set dữ liệu phòng chơi
        this.blindLevel = blindLevel;
        this.tableId = tableId;
        this.structureId = structureId;
    },

    setIsMe: function (b) { //set thong tin cua minh
        this._isMe = b;
        if(b){
            this.img_bg.setSpriteFrame(res.box_avatar2);
            this.lbMoney.setColor(cc.color(136,62,23));
            this.lbPlayerName.setColor(cc.color(136,62,23));
        }
        else{
            this.lbMoney.setColor(cc.color.YELLOW);
            this.lbPlayerName.setColor(cc.color.WHITE);
            this.img_bg.setSpriteFrame(res.box_avatar1);
        }
    },

    isMe: function () { //lay du lieu thong tin cua minh
        return this._isMe;
    },

    setDisplayName : function (value) { //set ten hien thi
        this.playerInfo.displayName = value;
        this.lbPlayerName.setString(Utility.displayName(value, 7));
    },

    getDisplayName : function () {
        return this.playerInfo.displayName;

    },


    isAlive: function () { // lay du lieu xem dang ngoi hay chua, mac dinh la cho`
        return this._status !== SLOT_STATUS.NONE;
    },

    subGold : function (value) { // tru tien
        var gold = this.playerInfo.gold - value;
        this.setGold(gold);
    },

    addGold : function (value) { // cong tien
        var gold = this.playerInfo.gold + value;
        this.setGold( gold);
    },

    setGold :function (b) {
        GameUtils.runEffectUpdateGold(this.lbMoney,this.playerInfo.gold,b);
        this.playerInfo.gold = b;
    },

    getGold :function () {
        return  this.playerInfo.gold;
    },

    setVip: function (b) {
        this.playerInfo.vipLevel = b;
        if(b < 1){
            this.imgVIP.setVisible(false);
        }
        else{
            this.imgVIP.setVisible(true);
            this.imgVIP.setSpriteFrame(res["vip_ingame_" + b]);
        }

    },

    getVip: function () {
        return  this.playerInfo.vipLevel;
    },

    setIsBoss: function (b) {
        this._isBoss = b;
        this.img_chuong.setVisible(b);
    },

    isBoss: function () {
        return this._isBoss;
    },

    setUId: function (value) {
        this.playerInfo.uId = value;
    },

    getUId :function () {
        return this.playerInfo.uId;
    },

    setSlotIndex: function (idx){
        this.index = idx;
    },

    getSlotIndex: function () {
        return this.index;
    },

    setPlayerInfo: function (dataPlayer) {
        this.playerInfo = dataPlayer;
        this.setUId(dataPlayer.uId);
        this.setDisplayName(dataPlayer.displayName);
        //this.setStatus(dataPlayer.status);
        this.setVip(dataPlayer.vipLevel);
        this.setGold(dataPlayer.gold);
        this.avatar.setSprite(dataPlayer.defaultAvatar);
    },

    getPlayerInfo: function () {
        return this.playerInfo;
    },

    setStatus: function (s) {
        this._status = s;
        switch (s){
            case SLOT_STATUS.NONE:
                this._nodeUI.setVisible(false);
                this.btnInvite.setVisible(true);
                this.lb_status.setVisible(false);
                break;
            case SLOT_STATUS.PLAYER:
                this._nodeUI.setVisible(true);
                this.btnInvite.setVisible(false);
                this._nodeUI.runAction(cc.fadeTo(0.3, 255));
                this.lb_status.setVisible(false);
                break;
            default:
                this._nodeUI.setVisible(true);
                this.btnInvite.setVisible(false);
                this._nodeUI.runAction(cc.fadeTo(0.3, 150));
                this.lb_status.setVisible(true);
                break;
        }

    },

    getStatus: function () {
        return this._status;
    },

    leaveTable: function () {

        this.setStatus(SLOT_STATUS.NONE);
        this._nodeUI.setVisible(false);
        this.btnInvite.setVisible(true);
        this.playerInfo.vipLevel = 0;
        this.playerInfo.gold = 0;
        this.playerInfo = {};
        this.setIsMe(false);
        this.setIsBoss(false);
        this.blindLevel = 0;
        this.structureId = "";
        this.tableId = 0;
        this.lb_status.setVisible(false);
    },

    isPlaying: function () { // lay thong tin dang choi
        return this._status === SLOT_STATUS.PLAYER;
    },
    actionChat: function (data) {
        var thePos = this.getPosition();
        var sp_chat = new cc.Scale9Sprite("textures/chat/bg_textChat.png", cc.rect(0, 0, 220, 58), cc.rect(0, 0, 220, 100));
        sp_chat.setCascadeOpacityEnabled(true);
        sp_chat.setPosition(0, 100);
        this._nodeUI.addChild(sp_chat);
        var actionSpchat = cc.sequence(cc.delayTime(2), cc.fadeOut(1.0), cc.removeSelf());
        if (data.type == 0){
            var text_chat = CustomRichText.create("", cc.size(220, 58), res.ROBOTO_BOLD, 18, cc.color('#ffffff'), RichTextAlignment.CENTER, RichTextAlignment.MIDDLE);
            text_chat.setPosition(sp_chat.width >> 1, 2 + sp_chat.height >> 1);
            text_chat.setString(data.disPlayName+ " : " + data.msg);

            // var numLine = Math.floor(text_chat.getContentSize().width / 220);
            // sp_chat.setContentSize(cc.size(220,45 * numLine));
            // sp_chat.setCapInsets(cc.rect(0,0,20,40));

            sp_chat.addChild(text_chat);
            var actionSpText = cc.sequence(cc.delayTime(2), cc.fadeOut(1.0), cc.removeSelf());
            text_chat.runAction(actionSpText);
            sp_chat.runAction(actionSpchat);
        }
        else {
            var sp_emotion = new cc.Sprite("#textures/chat/emo/" + data.msg + ".png");
            sp_emotion.setScale(0.8);
            this._nodeUI.addChild(sp_emotion);
            var actionEmo = cc.sequence(cc.jumpBy(2, cc.p(0, 0), 40, 4),cc.delayTime(2), cc.fadeOut(1.0), cc.removeSelf());
            sp_emotion.runAction(actionEmo);
        }
    }


});
var SLOT_INDEX = {
    ME:0,
    LEFT:1,
    TOP_LEFT:2,
    TOP:3,
    TOP_RIGHT:4,
    RIGHT:5
};
SLOT_STATUS = {
    NONE:-1, //Chờ
    SPECTATOR: 0, //dang xem
    PLAYER:1  // Chơi
};
