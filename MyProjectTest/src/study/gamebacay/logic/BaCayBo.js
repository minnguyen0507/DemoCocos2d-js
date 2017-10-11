//
BaCayBo = cc.Class.extend({
    ctor: function(cards){
        this.cards = cards;
    },

    getDiem: function(){
        var sum = 0;
        var i = 0;
        for(i =0; i < this.cards.length; i++){
            sum += this.cards[i].diem;
        }
        sum = sum %10;
        if(sum == 0)
            sum = 10;
        return sum;
    },

    isSap: function(){
        var count = 0;
        var so = this.cards[0].so;
        for(var i = 1; i < this.cards.length; i++){
            if(so == this.cards[i].so)
                count++;
        }
        return (count == 2);
    },

    getSo: function() {
        return this.cards[0].diem;
    },

    hasAtCu: function(){
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].id == 3){
                return true;
            }

        }
    },

    isMuoiCu: function(){
        return ((this.getDiem() == 10) && this.hasAtCu());
    },

    isSapAtCu: function(){
        return this.isSap() && this.hasAtCu();
    },

    isSapAt: function(){
        return this.isSap() && this.cards[0].so == 0;
    },

    isLiengDongChat: function(){
        this.cards.sort(function(a, b){ return a.id - b.id});
        var isLieng = true;
        for(var i = 1 ; i < 3; i ++){
            if(this.cards[i].id - this.cards[i-1].id != 4){
                isLieng = false;
                break;
            }
        }
        return isLieng;
    },


    getNameImage: function(){
        if(this.isSapAtCu()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_at_cu.png";
        }
        else if(this.isSapAt()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_at.png";
        }
        else if(this.isSap()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/sap_" + this.getSo()+".png";
        }

        else if(this.isLiengDongChat()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/liengDongChat.png";
        }
        else if(this.isMuoiCu()){
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/muoiAtCu.png";
        }
        else{
            return "res/CardGame/CommonResource/DiemBoBai/diem3Cay/"+this.getDiem() +"Diem.png";
        }
    },


    needShadown: function(){
        var flag = true;
        if(this.isSapAtCu()){
            flag = false;
        }
        else if(this.isSapAt()){
            flag = false;
        }
        else if(this.isSap()){
            flag = false;
        }

        else if(this.isLiengDongChat()){
            flag = false;
        }
        return flag;
    }
});
