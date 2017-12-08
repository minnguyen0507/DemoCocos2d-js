/**
 * Created by Tomorow on 7/15/2016.
 */

var Emoticon = BaseTableCell.extend({

    ctor: function(emoName, size, rect, rotated){
        if(size === undefined){
            size = 128;
        }
        this.emoName = emoName;
        this.size = size;
        this._super("#" + this.getFileName(), rect, rotated);

        this.originalPosition = cc.p(0, 0);
        this.originalScale = cc.p(1, 1);
    },

    getFileName: function(){
        //ZLog.debug(this.emoName + "_" + this.size + "x" + this.size + ".png");
        // return this.emoName + "_" + (GameUtils.isQuickChat(this.emoName) ? (languageMgr.getCurrentLanguage() + "_") : "") + this.size + "x" + this.size + ".png";
        return this.emoName + "_"  + this.size + "x" + this.size + ".png";
    },

    changeSize: function(size){
        this.size = size;
    },

    changeEmo: function(emoName){
        this.emoName = emoName;

        this.setSpriteFrame(this.getFileName());
    },

    getEmoName: function(){
        return this.emoName;
    },

    setPosition: function(x, y){
        this._super(x, y);
        this.originalPosition.x = this.getPositionX();
        this.originalPosition.y = this.getPositionY();
    },

    setScale: function (x, y) {
        if(y === undefined){
            this._super(x, x);
        }
        else{
            this._super(x, y);
        }
        this.originalScale.x = this.getScaleX();
        this.originalScale.y = this.getScaleY();
    },

    start: function(){
        switch (this.emoName){
            case EmoticonName.EMO_1:
            case EmoticonName.EMO_2:
            case EmoticonName.EMO_3:
            case EmoticonName.EMO_4:
            case EmoticonName.EMO_5:
            case EmoticonName.EMO_6:
            case EmoticonName.EMO_7:
            case EmoticonName.EMO_8:
            case EmoticonName.EMO_9:
            case EmoticonName.EMO_10:
            case EmoticonName.EMO_11:
            case EmoticonName.EMO_12:
            case EmoticonName.EMO_13:
            case EmoticonName.EMO_14:
            case EmoticonName.EMO_15:
            case EmoticonName.EMO_16:
            case EmoticonName.EMO_17:
            case EmoticonName.EMO_18:
            case EmoticonName.EMO_19:
            case EmoticonName.EMO_20:
            case EmoticonName.EMO_21:
            case EmoticonName.EMO_22:
            case EmoticonName.EMO_23:
            case EmoticonName.EMO_24:
            case EmoticonName.EMO_25:
            case EmoticonName.EMO_26:
            case EmoticonName.EMO_27:
            case EmoticonName.EMO_28:
            case EmoticonName.EMO_29:
            case EmoticonName.EMO_30:
            case EmoticonName.EMO_31:
            case EmoticonName.EMO_32:
            case EmoticonName.EMO_33:
            case EmoticonName.EMO_34:
            case EmoticonName.EMO_35:
            case EmoticonName.EMO_36:
            case EmoticonName.EMO_37:
            case EmoticonName.EMO_38:
            case EmoticonName.EMO_39:
            // case EmoticonName.Q_CHAT_1:
            // case EmoticonName.Q_CHAT_3:
                var deltaY = 3;
                var time = 0.25;

                this.runAction(cc.sequence(
                    cc.moveBy(time / 2, this.x, this.y + deltaY),
                    cc.repeat(
                        cc.sequence(
                            //cc.delayTime(0.05),
                            cc.moveTo(time, this.x, this.y - deltaY * 2),
                            cc.moveTo(time, this.x, this.y + deltaY * 2)
                        ),
                        10
                    ),
                    cc.moveBy(time / 2, this.x, this.y - deltaY),
                    cc.fadeOut(1),
                    cc.callFunc(function(sender){
                        sender.setVisible(false);
                    })
                ));
                break;

            // case EmoticonName.Q_CHAT_2:
            // case EmoticonName.Q_CHAT_6:
            // case EmoticonName.Q_CHAT_8:
            // case EmoticonName.Q_CHAT_9:
            // case EmoticonName.Q_CHAT_11:
            //     deltaY = 3;
            //     time = 0.1;
            //     var rotation = 4;
            //
            //     this.runAction(cc.sequence(
            //         cc.rotateTo(time, rotation).easing(cc.easeOut(0.6)),
            //         cc.repeat(
            //             cc.sequence(
            //                 //cc.delayTime(0.05),
            //                 cc.rotateTo(time * 2, -rotation).easing(cc.easeOut(0.6)),
            //                 cc.rotateTo(time * 2, rotation).easing(cc.easeOut(0.6))
            //             ),
            //             10
            //         ),
            //         cc.rotateTo(time, 0).easing(cc.easeOut(0.6)),
            //         cc.fadeOut(1),
            //         cc.callFunc(function(sender){
            //             sender.setVisible(false);
            //         })
            //     ));
            //     break;
            //
            // case EmoticonName.Q_CHAT_4:
            // case EmoticonName.Q_CHAT_5:
            // case EmoticonName.Q_CHAT_7:
            // case EmoticonName.Q_CHAT_10:
            // case EmoticonName.Q_CHAT_12:
            //     deltaY = 3;
            //     time = 0.1;
            //     var scaleIn = 1.1;
            //     var scaleOut = 0.9;
            //
            //     this.runAction(cc.sequence(
            //         cc.scaleTo(time, scaleIn, scaleIn).easing(cc.easeOut(0.6)),
            //         cc.repeat(
            //             cc.sequence(
            //                 //cc.delayTime(0.05),
            //                 cc.scaleTo(time * 2, scaleOut, scaleOut).easing(cc.easeOut(0.6)),
            //                 cc.scaleTo(time * 2, scaleIn, scaleIn).easing(cc.easeOut(0.6))
            //             ),
            //             10
            //         ),
            //         cc.scaleTo(time, 1, 1).easing(cc.easeOut(0.6)),
            //         cc.fadeOut(1),
            //         cc.callFunc(function(sender){
            //             sender.setVisible(false);
            //         })
            //     ));
            //     break;
        }
    },

    stop: function(){
        this.setPosition(this.originalPosition.x, this.originalPosition.y);
        this.setScale(this.originalScale.x, this.originalScale.y);
        this.setRotation(0);
        this.stopAllActions();
    },
});

isEmoticon = function(name){
    for(var key in EmoticonName){
        if(EmoticonName[key] == name){
            return true;
        }
    }

    return false;
};

EmoticonName = {
    EMO_1: "emo_1",
    EMO_2: "emo_2",
    EMO_3: "emo_3",
    EMO_4: "emo_4",
    EMO_5: "emo_5",
    EMO_6: "emo_6",
    EMO_7: "emo_7",
    EMO_8: "emo_8",
    EMO_9: "emo_9",
    EMO_10: "emo_10",
    EMO_11: "emo_11",
    EMO_12: "emo_12",
    EMO_13: "emo_13",
    EMO_14: "emo_14",
    EMO_15: "emo_15",
    EMO_16: "emo_16",
    EMO_17: "emo_17",
    EMO_18: "emo_18",
    EMO_19: "emo_19",
    EMO_20: "emo_20",
    EMO_21: "emo_21",
    EMO_22: "emo_22",
    EMO_23: "emo_23",
    EMO_24: "emo_24",
    EMO_25: "emo_25",
    EMO_26: "emo_26",
    EMO_27: "emo_27",
    EMO_28: "emo_28",
    EMO_29: "emo_29",
    EMO_30: "emo_30",
    EMO_31: "emo_31",
    EMO_32: "emo_32",
    EMO_33: "emo_33",
    EMO_34: "emo_34",
    EMO_35: "emo_35",
    EMO_36: "emo_36",
    EMO_37: "emo_37",
    EMO_38: "emo_38",
    EMO_99: "emo_39",
    // Q_CHAT_1: "quick_chat_1",
    // Q_CHAT_2: "quick_chat_2",
    // Q_CHAT_3: "quick_chat_3",
    // Q_CHAT_4: "quick_chat_4",
    // Q_CHAT_5: "quick_chat_5",
    // Q_CHAT_6: "quick_chat_6",
    // Q_CHAT_7: "quick_chat_7",
    // Q_CHAT_8: "quick_chat_8",
    // Q_CHAT_9: "quick_chat_9",
    // Q_CHAT_10: "quick_chat_10",
    // Q_CHAT_11: "quick_chat_11",
    // Q_CHAT_12: "quick_chat_12",
};