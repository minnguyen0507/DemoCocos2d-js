

var AdminSprite = cc.Sprite.extend({
    ctor:function(filename,rect){
        this._super(filename,rect);
        // Custom initialization
    }

});

var AdminLabelTTF = cc.LabelTTF.extend({
   ctor: function(text, font, size){
       this._super(text, font, size);
   },
    update :function (dt) {
        ZLog.error("update.dt:" + dt);
    }
});