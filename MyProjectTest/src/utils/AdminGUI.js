/**
 * Created by Admin on 17/9/2017.
 */
var _localZOder = 99;
var AdminGUI = AdminGUI || {};

AdminGUI.createSprite = function (nameSprite, nodeAdd, res) {
    nameSprite = new cc.Sprite(res);
    nodeAdd.addChild(nameSprite,_localZOder );
    nameSprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    nameSprite.setAnchorPoint(0.5, 0.5);
    nameSprite.setScale(1);
};