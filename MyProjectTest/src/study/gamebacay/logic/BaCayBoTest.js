var BaCayBoTest = cc.Class.extend({
    ctor: function (cards) {
        this.cards = cards;
    },

    getDiem: function(){
        var sum = 0;
        var i = 0;
        for(i =0; i < this.cards.length; i++){
            sum += this.cards[i].diem;
            ZLog.error("diem - ",this.cards[i].id);
        }
        sum = sum %10;
        if(sum == 0)
            sum = 10;
        return sum;
    },

});