/**
 * Created by bachbv on 2/23/2016.
 */


var ZLog = {
    isDebug: true,

    debug: function(){
        if(this.isDebug){
            cc.log.apply(cc, arguments);
        }
    },
    
    error: function () {
        if(this.isDebug){
            cc.error.apply(cc, arguments);
        }
    }
};