/**
 * Created by Admin on 17/9/2017.
 */
var _localZOder = 99;
var AdminGUI = AdminGUI || {};
/**
 * @author ...
 * @param nameSprite : #string
 * @param nodeAdd   : #parent
 * @param res       : #string or res.
 */

AdminGUI.createSprite = function (nameSprite, parent, res) {
    nameSprite = new cc.Sprite(res);
    nodeAdd.addChild(nameSprite,_localZOder );
    nameSprite.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    nameSprite.setAnchorPoint(0.5, 0.5);
    nameSprite.setScale(1);
};

/**
 * @author ...
 * @param nameLabel : #string
 * @param parent   : #parent
 * @param textLabel: #string
 * @param fontSize : #int
 * @param fontLabel : #string or res.
 */
AdminGUI.createLabelTTF = function (nameLabel, parent, textLabel, fontSize, fontLabel) {
    nameLabel = new cc.LabelTTF(textLabel, fontLabel, fontSize);
    parent.addChild(nameLabel, _localZOder);
    nameLabel.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    nameLabel.setAnchorPoint(0.5, 0.5);
    nameLabel.setScale(1);
};