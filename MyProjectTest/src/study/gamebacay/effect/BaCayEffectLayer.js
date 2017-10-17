BaCayEffectLayer = cc.Layer.extend({
    ctor: function(){
        this._super();
        this.recentEffectCards = [];
        this.cardChiaBai = [];
        this.effectList = [];
        this.chatImage = [];
        this.demLui = null;
        for (var i=0; i< 8; i++){
            this.chatImage[i] = null;
        }
    },

    clearEffect: function(){
        for(var i = 0; i < 8; i++) {
            if (this.chatImage[i]){
                this.chatImage[i].removeFromParent();
                this.chatImage[i] = null;
            }
        }
        this.hideAllEffect();
    },

    hideAllEffect: function(){
        for(var i = 0; i < this.effectList.length; i++){
            if(this.effectList[i] && this.effectList[i].callBack){
                this.effectList[i].removeFromParent();
                this.effectList[i].callBack();
            }
        }

        this.effectList = [];
        this.hideChiaBai();
        this.removeAllChildren();
        this.demLui = null;
    },

    hideDemLui: function(){
        if(this.demLui) {
            this.demLui.stopAllActions();
            this.demLui.setVisible(false);
            this.demLui.removeAllChildren(true);
        }
    },

    addDemLuiSimple: function(time, timeRemain){
        // xu thang cu neu ton tai;
        cc.log("addDemLuiSimple");
        if(time == null || time == undefined){
            cc.log("time Undifined");
            return;
        }

        time = Math.floor(time);
        if(time <= 0)
            return;
        if(this.demLui == null || this.demLui == undefined) {
            var winSize = GameScene.getMainContentSize();
            this.demLui = new cc.Sprite();
            this.demLui.setPosition(winSize.width / 2, winSize.height * 0.55);
            this.addChild(this.demLui);
        }

        if(!this.demLui.isVisible()){
            this.demLui.setVisible(true);
        }
        var size = this.demLui.getContentSize();
        var so = "" + Math.floor(time);
        var node = gameUtility.createSo2(so);
        this.demLui.setScale(2);
        node.setPosition(size.width/2, size.height/2);
        this.demLui.addChild(node);
        this.demLui.time = time;
        cc.log("time: " + time);

        var callBackStartAuto = function() {
            cc.log("this.demLui")
            this.demLui.time--;

            so = "" + Math.floor(this.demLui.time);
            this.demLui.removeAllChildren();
            if(this.demLui.time < 0)
                return;
            cc.log("so: " + so);
            node = gameUtility.createSo2(so);
            node.setPosition(size.width/2, size.height/2);
            this.demLui.addChild(node);
        }
        var action = cc.sequence(cc.delayTime(1), cc.callFunc(callBackStartAuto.bind(this)));
        this.demLui.runAction(cc.sequence(action.repeat(Math.floor(time)), cc.callFunc(this.hideDemLui.bind(this))));
    },

    chiaBai: function(player, num, stt){
        //this.hideChiaBai();
        var winSizeW = cc.winSize.width;
        var winSizeH = cc.winSize.height;
        var cardImg = new cc.Sprite(res.card_black);
        //tao dealer
        var timeSlow = 3*8/num;
        var offset = 2;
        var timeDealOne = 0.05*timeSlow;
        var timeDif =  0.03*timeSlow;
        var timeOffsetAppear = 0.003*timeSlow;
        {
            if(player.index == 0) {
                for ( var i = 0; i < num * 3; i++) {
                    var card = new cc.Sprite(res.card_black);
                    card.setScale(0.75);
                    card.setPosition(winSizeW / 2, winSizeH / 2 + cardImg.getContentSize().height / 2 + offset * i);
                    card.setRotation(-90);
                    card.setVisible(false);
                    this.addChild(card);
                    this.cardChiaBai.push(card);
                    cc.log("chiaBai 1: " + i);
                    var action = cc.sequence(cc.delayTime(timeOffsetAppear * i), cc.show(), cc.delayTime(timeOffsetAppear * (num *
                        3 - 1 - i)), cc.delayTime(timeDif* (num*3 - 1 - i)), cc.hide());
                    card.runAction(action);
                }
            }
            //var scaleFactor = player.handOnCards[0].getContentSize().height/cardImg.getContentSize().height;
            var scaleFactor;
            if(player.index == 0) {
                scaleFactor = 0.75;
            }
            else {
                scaleFactor = 0.66;
            }
            for(var i = 0; i < 3; i++){
                var mycard  = new cc.Sprite(res.card_black);
                mycard.setScale(0.75);
                this.addChild(mycard);
                this.cardChiaBai.push(mycard);
                cc.log("chiaBai 2: " + i + " index:  " + player.index);
                mycard.setPosition(winSizeW/2, winSizeH/2 + cardImg.getContentSize().height/2 + offset*(3*num -1 - i*num - stt));
                mycard.setRotation(-90);
                mycard.setVisible(false);
               // var cardPos = player.cardList[i].convertToWorldSpaceAR(cc.p(0,0));
                var cardPos = cc.p(100,100);
                cardPos = this.convertToNodeSpace(cardPos);
                var acSpawn =  cc.spawn(cc.moveTo(timeDealOne,cardPos), cc.scaleTo(timeDealOne, scaleFactor), cc.rotateTo(timeDealOne,0));
                var sequence =  cc.sequence(cc.delayTime(timeOffsetAppear*(3*num-1)), cc.delayTime(timeDif*(i*num + stt)), cc.show(),
                    acSpawn);
                mycard.runAction(sequence);
            }
            for(var i = 0; i< 3; i++){
                // player.cardList[i].runAction(cc.sequence(cc.delayTime(timeOffsetAppear*(3*num -1)),
                //     cc.delayTime(timeDif*(i*num+stt) + timeDealOne),
                //     cc.show()
                // ));
            }
        }
    },

    hideChiaBai: function () {
        if(this.cardChiaBai != null && this.cardChiaBai != undefined){
            for(var i = 0; i < this.cardChiaBai.length; i++){
                if(this.cardChiaBai[i] != null && this.cardChiaBai[i] != undefined){
                    this.cardChiaBai[i].removeFromParent();
                    cc.log("hideChiaBai 1: " + i);
                }
            }
            this.cardChiaBai = [];
        }
    },


    //chuyenTien
    chuyenTienCuoc: function(player1, player2, money){
        var startPos = player1.uiAvatar.convertToWorldSpaceAR(cc.p(0, 0));
        startPos = this.convertToNodeSpace(startPos);
        var desPos = player2.moneyBet.convertToWorldSpaceAR(cc.p(0,0));
        desPos = this.convertToNodeSpace(desPos);
        //var so = "" + StringUtility.standartNumber(money);
        var node = gameUtility.createSo2(money);
        node.setScale(0.5);
        this.addChild(node);
        node.setPosition(startPos);
        var effect = node;
        effect.callBack = player2.updateTienCuoc.bind(player2);
        this.effectList.push(effect);

        node.runAction(cc.sequence(cc.EaseBackOut.create(cc.moveTo(0.5, desPos)), cc.callFunc(player2.updateTienCuoc, player2),
            cc.callFunc(function(){
                this.removeFromParent();
                this.callBack = null}.bind(effect))
        ));
    },

    addPhatLuong: function(){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var effect = new cc.Sprite(BaCay.res.phatLuongPng);
        effect.setPosition(winSize.width/2, winSize.height/2 + 100);
        this.addChild(effect);

        effect.callBack = function(){
            cc.log("effect callBack: Toi la so 1");
        }

        this.effectList.push(effect);
        effect.runAction(cc.sequence(cc.EaseBackIn.create(cc.fadeIn(0.2)), cc.delayTime(3.2), cc.EaseBackOut.create(cc.fadeOut(0.5)),
            cc.callFunc(function(){
                this.removeFromParent();
                this.callBack = null}.bind(effect))));

    },


    addCaLangSangTien: function(){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var effect = new cc.Sprite(BaCay.res.caLangSangTienPng);
        effect.setPosition(winSize.width/2, winSize.height/2 + 100);
        this.addChild(effect);

        effect.callBack = function(){
            cc.log("effect callBack: Toi la so 1");
        }

        this.effectList.push(effect);
        effect.runAction(cc.sequence(cc.EaseBackIn.create(cc.fadeIn(0.2)), cc.delayTime(3.2), cc.EaseBackOut.create(cc.fadeOut(0.5)),
            cc.callFunc(function(){
                this.removeFromParent();
                this.callBack = null}.bind(effect))));
    },

    firstTurn: function(player){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        var layerCard = new cc.Sprite(BaCay.res.cardFirstTurnPng);
        layerCard.setPosition(winSize.width/2, winSize.height/2);
        var pos = player.cardFirstTurn.convertToWorldSpaceAR(cc.p(0,0));
        pos = this.convertToNodeSpace(pos);
        this.addChild(layerCard);
        layerCard.setVisible(false);

        var scaleFactor = player.cardFirstTurn.getContentSize().height/ layerCard.getContentSize().height;
        var spawn = cc.spawn(cc.moveTo(0.25, pos), cc.scaleTo(0.25, scaleFactor));
        var sequence = cc.sequence(cc.show(), spawn, cc.scaleTo(0.1, 0, 1));
        layerCard.runAction(sequence);

        player.cardFirstTurn.setVisible(false);
        player.cardFirstTurn.setScaleX(0.0);
        player.cardFirstTurn.runAction(cc.sequence(cc.delayTime(0.25), cc.show(), cc.scaleTo(0.1, 1, 1), cc.delayTime(2.0), cc.hide()));
    },

    moneyFly: function(posSrc,posDst,time,delay,visible)
    {
        var rdChip = Math.floor(Math.random() * 6 + 1);
        if(rdChip > 6)
            rdChip = 6;
        var chip = new cc.Sprite("res/common/" + "chip/chip"+rdChip+".png");

        var rdX = Math.random() * 200;
        var rdY = Math.random() * 200;

        this.addChild(chip,3);
        chip.setPosition(posSrc);
        var config = [posSrc, cc.pAdd(cc.pSub(posSrc,cc.p(-100,-100)),cc.p(rdX,rdY)),posDst];

        this.bezierEffect(chip,time,delay,config,visible);
    },

    chuyenTienCuoiVan: function(player1, player2, money){
        var startPos = player1.uiAvatar.convertToWorldSpaceAR(cc.p(0, 0));
        startPos = this.convertToNodeSpace(startPos);
        var desPos = player2.uiGold.convertToWorldSpaceAR(cc.p(0,0));
        desPos = this.convertToNodeSpace(desPos);
        money = Math.floor(money);
        var so = "" + money;
        var node = gameUtility.createSo(so);
        this.addChild(node);
        node.setPosition(startPos);
        var effect = node;

        effect.callBack = function(){
            cc.log("effect callBack: Toi la so 1");
            player1.updateTienCuoc();
            player2.updateTienCuoc();
        }

        this.effectList.push(effect);
        effect.runAction(cc.sequence(cc.EaseBackOut.create(cc.moveTo(1.0, desPos)), cc.callFunc(player2.updateTienCuoc, player2), cc.callFunc(player1.updateTienCuoc, player1),   cc.callFunc(function(){
            this.removeFromParent();
            this.callBack = null}.bind(effect))
        ));
    },


    anGa: function(from, to){
        from = from.convertToWorldSpaceAR(cc.p(0, 0));
        from = this.convertToNodeSpace(from);
        to = to.convertToWorldSpaceAR(cc.p(0, 0));
        to = this.convertToNodeSpace(to);
        var anGaImg = new cc.Sprite("res/CardGame/BaCay/an_ga.png");
        var size = anGaImg.getContentSize();
        this.addChild(anGaImg);
        // var tienGa = gameUtility.createSo(money);
        // tienGa.setScale(0.5);
        // anGaImg.addChild(tienGa);
        // tienGa.setPosition(size.width * 0.6, size.height*0.6);
        anGaImg.setPosition(from);
        for(var i = 0; i < 4; i++){
            var fadeInStar = new cc.FadeIn(1.2);
            var fadeOutStar = new cc.FadeOut(1.2);
            var spawnIn = cc.spawn(fadeOutStar,cc.scaleTo(1.2,0));
            var spawnOut = cc.spawn(fadeInStar,cc.scaleTo(1.2,1));
            var sequence = cc.sequence(spawnIn,cc.delayTime(0.3),spawnOut);
            sequence = cc.repeatForever(sequence);
            var star = new cc.Sprite("res/CardGame/BaCay/star.png");
            anGaImg.addChild(star);
            if(i == 0) {
                star.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
            }
            if(i == 1) {
                star.setPosition(cc.p(size.width * 0.2, size.height * 0.2));
            }
            if(i == 2) {
                star.setPosition(cc.p(size.width * 0.1, size.height * 0.4));
            }
            if(i == 3) {
                star.setPosition(cc.p(size.width * 0.3, size.height * 0.4));
            }
            star.runAction(sequence);
        }

        //anGaImg.runAction(cc.sequence(cc.EaseBackOut.create(cc.moveTo(1.0, to)), cc.delayTime(8.0), cc.removeSelf()));
        anGaImg.runAction(cc.sequence(cc.EaseBackOut.create(cc.moveTo(1.0, to)), cc.delayTime(8.0), cc.removeSelf()));
    },

    bezierEffect: function(target,time,delay,config,visible)
    {
        target.setVisible(visible);
        target.runAction(cc.sequence(cc.delayTime(delay),cc.show(),new cc.EaseExponentialOut(cc.bezierTo(time,config)),cc.delayTime(1),cc.removeSelf()));
    },

    addEffectSanhToiCot: function(){
        var winSize = SceneMgr.getInstance().getRunningScene().getMainContentSize();
        effect = new cc.Sprite(Sam.res.nenSanhToiCotPng);
        effect1 = new cc.Sprite(Sam.res.effectSanhToiCotPng);
        effect1.setPosition(effect.getContentSize().width/2, effect.getContentSize().height/2);
        effect.addChild(effect1);
        effect.setPosition(winSize.width/2, winSize.height - 100);
        this.addChild(effect);
        effect.runAction(cc.sequence(cc.fadeIn(0.2), cc.delayTime(.5), cc.fadeOut(0.2), cc.removeSelf()));
    },

    updateChatRoom: function(localChair, pos, image){
        var position = this.convertToNodeSpace(pos);

        if (this.chatImage[localChair]){
            this.chatImage[localChair].removeFromParent();
            this.chatImage[localChair] = null;
        }

        this.chatImage[localChair] = image;
        this.chatImage[localChair].setPosition(position);
        this.addChild(this.chatImage[localChair]);
        this.chatImage[localChair].setLocalZOrder(2);

        var actionArr = [];
        for (var i=0; i<4; i++){
            actionArr.push(cc.moveBy(0.3, 0, 10));
            actionArr.push(cc.moveBy(0.3, 0, -10));
        }
        actionArr.push(cc.callFunc(function(){
            if (this.chatImage[localChair]){
                this.chatImage[localChair].removeFromParent();
                this.chatImage[localChair] = null;
            }
        }.bind(this)));

        this.chatImage[localChair].runAction(cc.sequence(actionArr));
    },
});
