/**
 * Created by TuanND on 11/20/2017.
 */

var FloatingString = cc.LayerColor.extend({

    showingSpecialType: false,
    clip: null,
    messagesToBeShowed: [],
    ctor: function () {
        this._super(cc.color(0, 0, 0, 100), 580, 40);
        this.init();
    },
    init: function () {

        this.clip = new cc.ClippingNode();
        this.clip.stencil = new cc.LayerColor(cc.color(0, 0, 0, 255), 580, 40);
        this.clip.setPosition(0, 0);
        this.clip.setAnchorPoint(0, 0);
        this.addChild(this.clip);
        this.ignoreAnchorPointForPosition(false);

    },
    runFloatingTextAction: function () {
        var  messageText = new FloatingText(this.messagesToBeShowed[this.messagesToBeShowed.length - 1].text, 580, 110, this.messagesToBeShowed[this.messagesToBeShowed.length - 1].specialType);
        var delayTime = messageText.calculateTime() - 2;
        messageText.setPosition(580,  20);
         this.clip.addChild(messageText);
        this.showingSpecialType = this.messagesToBeShowed[this.messagesToBeShowed.length - 1].specialType;
            var act = cc.sequence(cc.callFunc(function(){
                if(this.messagesToBeShowed.length > 1)
                    this.messagesToBeShowed.pop();

            },this), cc.delayTime(delayTime),cc.callFunc(function(){

                this.runFloatingTextAction();

            },this));

            this.clip.runAction(act);

    },
    showMessages: function (mes, special) {
        if(special === undefined ) special = false;
        this.stopAllActions();
        this.clip.stopAllActions();
        this.clip.removeAllChildren();
        for (var i = 0; i < mes.length; i++) {
            var newString = {};
            newString.text = mes[i];
            newString.specialType = special;
            this.messagesToBeShowed.push(newString);
        }
        this.runFloatingTextAction();
    }
});
var FloatingText = cc.Node.extend({
    velocity: 0,
    lbText: null,
    ctor: function (string, size, velocity, special) {
        this._super();
        this.init(string,size,velocity,special);
    },
    init: function (str, size, velocity, special) {
        this.velocity = velocity;
        var tx = new cc.LabelTTF(str,res.ROBOTO_BOLD,20);

        this.lbText = CustomRichText.create(str,tx.getContentSize(), res.ROBOTO_BOLD, 18, cc.color('#ffffff'), RichTextAlignment.LEFT, RichTextAlignment.MIDDLE);
        this.lbText.setAnchorPoint(cc.p(0, 0.5));
        this.lbText.setPositionX(size);
        if (special) {
            this.lbText.setColor(cc.YELLOW);
        }
        this.setContentSize(cc.size(tx.getContentSize().width, 40));
        this.lbText.runAction(cc.moveBy(this.calculateTime(), cc.p(-(this.lbText.getContentSize().width * this.lbText.getScale() + size), 0)));
        this.addChild(this.lbText);

        this.runAction(cc.sequence(cc.delayTime(this.calculateTime()),cc.removeSelf()));

        this.ignoreAnchorPointForPosition(false);
        return true;
    },
    calculateTime: function () {
       var width = this.getContentSize().width;
        return ( this.lbText.getContentSize().width * this.lbText.getScale())  / this.velocity;
    }

});