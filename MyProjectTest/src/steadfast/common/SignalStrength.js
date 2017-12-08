/**
 * Created by bachbv on 12/29/2015.
 */

StripPing = [200, 400, 800, 1500];
SignalNetwork = {
    VERY_STRONG: 0,
    STRONG: 1,
    MEDIUM: 2,
    WEAK: 3,
    VERY_WEAK: 4,
};

var SignalStrength = cc.Sprite.extend({

    ctor: function(){
        this._super("#" + res.bg_signal_strength);

        this._curStatus = -1;

        this.imgStatus = new cc.Sprite("#" + res.bg_signal_strength);
        this.imgStatus.setPosition(this.width >> 1, this.height >> 1);
        this.addChild(this.imgStatus);
    },

    updateStatus: function(pingValue){
        var newSignal = -1;
        if(pingValue <= StripPing[SignalNetwork.VERY_STRONG]){
            newSignal = SignalNetwork.VERY_STRONG;
        }
        else if(StripPing[SignalNetwork.VERY_STRONG] < pingValue && pingValue <= StripPing[SignalNetwork.STRONG]){
            newSignal = SignalNetwork.STRONG;
        }
        else if(StripPing[SignalNetwork.STRONG] < pingValue && pingValue <= StripPing[SignalNetwork.MEDIUM]){
            newSignal = SignalNetwork.MEDIUM;
        }
        else if(StripPing[SignalNetwork.MEDIUM] < pingValue && pingValue <= StripPing[SignalNetwork.WEAK]){
            newSignal = SignalNetwork.WEAK;
        }
        else{
            newSignal = SignalNetwork.VERY_WEAK;
        }

        if(newSignal >= 0 && newSignal !== this._curStatus){
            this._showStatus(newSignal);
        }
    },

    _showStatus: function(idx){
        if(idx === "" || idx === undefined)
            return;
        if(this._curStatus !== idx){
            this._curStatus = idx;
            var im = 5 - idx;
            if(im > 0 && im < 6)
            this.imgStatus.setSpriteFrame(res["signal_strength_" + im]);
        }
    },

    cleanUp: function(){
        this.removeAllChildrenWithCleanup(true);
        this.removeFromParent();
    }
});