/**
 * Created by Admin on 26/10/2017.
 */
var CardGame = cc.Class.extend({
    ctor: function (id) {
        this.id = id;
        // this.so = this.getSoById(id);
        // this.chat = this.getChatById(id);
        // this.diem = this.getDiemById(id);
    },

    getSoById: function(){
        return Math.floor(this.id/4);
    },

    getDiemById: function(){
        return Math.floor(this.id/4) + 1; //-- Rô - Cơ  - Bích - Tép
    },

    getChatById: function(){
        return this.id % 4;
    },


    getNormalId: function(){
        var realSo;
        if(this.id < 4){
            realSo = 11;
        }else if(this.id < 8){
            realSo = 12
        }
        else{
            realSo = Math.floor(this.id/4) - 2;
        }

        var chat = Math.floor(this.id%4);
        if(chat == 3){
            chat = 2;
        }
        else if(chat == 2){
            chat = 3;
        }
        return realSo*4 + chat;
    }

});
