/**
 * Created by bachbv on 11/11/2015.
 */

var GameUtils = {
    cached: [],

    isQuickChat: function(name){
        return name && name.indexOf("quick_chat") > -1;
    },

    isCashGame: function(structureId){
        if(structureId && structureId.length > 0){
            return structureId.indexOf("CG") >= 0;
        }
        else{
            ZLog.error("structureId invalid", JSON.stringify(structureId));
            return false;
        }
    },

    isTournamentGame: function(structureId){
        if(structureId && structureId.length > 0){
            return structureId.indexOf("TOUR") >= 0 || structureId.indexOf("MTT") >= 0;
        }
        else{
            ZLog.error("structureId invalid", JSON.stringify(structureId));
            return false;
        }
    },

    isMTTTourId: function(tourId){
        try{
            tourId = parseInt(tourId);
            return tourId > 3000;
        }
        catch(err){
            ZLog.error("isMTTTourId parse int error " + tourId);
            return false;
        }
    },

    isMTTGame: function(structureId){
        if(structureId && structureId.length > 0){
            return structureId.indexOf("MTT") >= 0;
        }
        else{
            ZLog.error("structureId invalid", JSON.stringify(structureId));
            return false;
        }
    },

    isFinalRound: function(roundId, tourId){
        var configTour = resourceMgr.getConfigTournamentById(tourId);
        if(configTour){
            return roundId == configTour["round"][configTour["round"].length - 1];
        }

        return false;
    },

    getRoundIndex: function(tourId, roundId){
        var configTour = resourceMgr.getConfigTournamentById(tourId);
        if(configTour){
            for(var i = 0; i < configTour["round"].length; ++i){
                if(roundId == configTour["round"][i]){
                    return i;
                }
            }
        }

        return -1;
    },

    /**
     * type from 5 -> 10
     * @param typeGroup
     */
    createRandomCardGroup: function(typeGroup){
        var cardIdList = [];
        var deck = new Deck();
        //cardIdList.push(deck.deal(1)[0]);
        //cardIdList.push(deck.deal(1)[0]);

        var random = function(from, to){
            if(from === undefined || to === undefined) return 0;
            if(from > to){
                var tmp = from;
                from = to;
                to = tmp;
            }

            var delta = to - from;
            return Math.floor(Math.random() * delta + from);
        };

        switch (typeGroup){
            case CardGroupType.ROYAL_FLUSH:
                var typeFlush = random(0, 3);
                cardIdList.push(33 + typeFlush);
                cardIdList.push(37 + typeFlush);
                cardIdList.push(41 + typeFlush);
                cardIdList.push(45 + typeFlush);
                cardIdList.push(49 + typeFlush);
                break;

            case CardGroupType.STRAIGHT_FLUSH:
                var startCard = random(1, 36); // random from 1 -> 10
                cardIdList.push(startCard);
                cardIdList.push(4 + startCard);
                cardIdList.push(8 + startCard);
                cardIdList.push(12 + startCard);
                cardIdList.push(16 + startCard);
                break;

            case CardGroupType.FOUR_OF_A_KIND:
                startCard = random(0, 12);
                cardIdList.push(1 + startCard * 4);
                cardIdList.push(2 + startCard * 4);
                cardIdList.push(3 + startCard * 4);
                cardIdList.push(4 +startCard * 4);

                deck.removeCards(cardIdList);

                // random 3 cards
                cardIdList.push(deck.deal(1)[0]);
                cardIdList.push(deck.deal(1)[0]);
                cardIdList.push(deck.deal(1)[0]);
                break;

            case CardGroupType.FULL_HOUSE:
                var card1 = random(6, 12);
                var card2 = random(0, 5);

                cardIdList.push(1 + card1 * 4);
                cardIdList.push(2 + card1 * 4);
                cardIdList.push(3 + card1 * 4);
                cardIdList.push(1 + card2 * 4);
                cardIdList.push(4 + card2 * 4);

                deck.removeCards(cardIdList);
                deck.removeCards([4 + card1 * 4]);

                // random 2 cards
                cardIdList.push(deck.deal(1)[0]);
                cardIdList.push(deck.deal(1)[0]);
                break;

            case CardGroupType.FLUSH:
                typeFlush = random(1, 4);
                card1 = random(0, 1);
                card2 = random(2, 3);
                var card3 = random(4, 5);
                var card4 = random(6, 8);
                var card5 = random(9, 12);

                cardIdList.push(typeFlush + card1 * 4);
                cardIdList.push(typeFlush + card2 * 4);
                cardIdList.push(typeFlush + card3 * 4);
                cardIdList.push(typeFlush + card4 * 4);
                cardIdList.push(typeFlush + card5 * 4);

                deck.removeCards(cardIdList);

                // random 2 cards
                cardIdList.push(deck.deal(1)[0]);
                cardIdList.push(deck.deal(1)[0]);

                break;

            case CardGroupType.STRAIGHT:
                startCard = random(0, 10); // random from 1 -> 10
                startCard *= 4;
                cardIdList.push(startCard + random(1, 4));
                startCard += 4;
                cardIdList.push(startCard + random(1, 4));
                startCard += 4;
                cardIdList.push(startCard + random(1, 4));
                startCard += 4;
                cardIdList.push(startCard + random(1, 4));
                startCard += 4;
                cardIdList.push(startCard + random(1, 4));

                deck.removeCards(cardIdList);

                // random 2 cards
                cardIdList.push(deck.deal(1)[0]);
                cardIdList.push(deck.deal(1)[0]);

                break;

            case CardGroupType.THREE_OF_A_KIND:

                break;

            case CardGroupType.TWO_PAIR:
                break;

            case CardGroupType.PAIR:
                break;

            case CardGroupType.HIGH_CARD:
                break;
        }

        deck = null;

        return cardIdList;
    },

    /**
     *
     * @param uId
     * @param displayName
     * @param defaultAvatar
     * @returns {*}
     */
    getFakePlayerInfoDetail: function(uId, displayName, defaultAvatar, level){
        if(this.getFakePlayerInfoDetail.cache === undefined){
            this.getFakePlayerInfoDetail.cache = {};
        }

        var cache = this.getFakePlayerInfoDetail.cache;
        if(!cache.hasOwnProperty(uId)){
            // create fake player info, same my info
            var data = new DataPlayerDetail();
            var myInfoDetail = this.getFakePlayerInfoDetail.myInfoDetail;

            if(myInfoDetail == null) return;

            var random = function(from, to){
                if(from === undefined || to === undefined) return 0;
                if(from > to){
                    var tmp = from;
                    from = to;
                    to = tmp;
                }

                var delta = to - from;
                return Math.random() * delta + from;
            };
            cache[uId] = data;

            data.uId = uId;
            data.uName = displayName;
            data.displayName = displayName;
            data.defaultAvatar = defaultAvatar;
            data.avatarURL = defaultAvatar;
            data.gold = Math.ceil(random(100000 + myInfoDetail.gold, 100000 + myInfoDetail.gold * 10) / 1000) * 1000;
            data.level = level;
            data.exp = myInfoDetail.exp;
            data.vipLevel = myInfoDetail.vipLevel;
            data.vipPoint = myInfoDetail.vipPoint;
            data.vipExpireTime = myInfoDetail.vipExpireTime;

            data.foldRatePreFlop = random(myInfoDetail.foldRatePreFlop, 0.6);
            data.foldRateFlop = random(myInfoDetail.foldRateFlop, 0.6);
            data.foldRateTurn = random(myInfoDetail.foldRateTurn, 0.6);
            data.foldRateRiver = random(myInfoDetail.foldRateRiver, 0.6);
            data.raiseFrequency = random(myInfoDetail.raiseFrequency, 0.6);

            data.totalHandPlayed = random(myInfoDetail.totalHandPlayed, myInfoDetail.totalHandPlayed * 3);
            data.averageWinningPerHand = Math.floor(random(myInfoDetail.averageWinningPerHand, myInfoDetail.averageWinningPerHand * 3));
            data.biggestPotWonSingleHand = random(myInfoDetail.biggestPotWonSingleHand, myInfoDetail.biggestPotWonSingleHand * 4);
            data.averageTimePerHand = Math.floor(random(1, 5));
            data.highestStakeTablePlayed = myInfoDetail.mostPlayedStakeTable;
            data.mostPlayedStakeTable = myInfoDetail.mostPlayedStakeTable;

            data.bestHand = this.createRandomCardGroup(Math.floor(random(5, 10)));

            for(i = 0; i < myInfoDetail.tourAchievements.length; ++i){
                var obj = {
                    tourId: myInfoDetail.tourAchievements[i].tourId,
                    totalBracelets: 0,
                    totalWinnings: Math.floor(random(1, 4))
                };
                data.tourAchievements.push(obj);
            }
        }

        return cache[uId];
    },

    findSlotIndexByUid: function(uid, playerList){
        if(playerList && uid > 0){
            for(var i = 0; i < playerList.length; ++i){
                if(playerList[i].uId === uid) return playerList[i].slotIdx;
            }
        }

        return -1;
    },

    convertToCardsId: function(arr){
        if(arr == null) return null;

        var oldLength = arr.length;
        for(var i = 0; i < oldLength; ++i){
            arr.push(Card.getIdFromName(arr[i]));
        }
        arr.splice(0, oldLength);

        return arr;
    },

    calculateCurrentWinningsToAcquireNewBracelet: function(curTotalWinnings, baseWinningsRequire, step){
        step = step || 0;
        baseWinningsRequire = baseWinningsRequire || 1;
        curTotalWinnings = curTotalWinnings || 0;

        if(curTotalWinnings <= 0) return 0;

        while(1){
            if(curTotalWinnings < baseWinningsRequire){
                return curTotalWinnings;
            }

            curTotalWinnings -= baseWinningsRequire;
            baseWinningsRequire += step;
        }
    },

    canAcquireNewBracelet: function(curTotalWinnings, baseWinningsRequire, step){
        step = step || 0;
        baseWinningsRequire = baseWinningsRequire || 1;
        curTotalWinnings = curTotalWinnings || 0;

        var sum = 0;
        while(1){
            sum += baseWinningsRequire;
            if(sum == curTotalWinnings){
                return true;
            }
            else if(sum > curTotalWinnings){
                return false;
            }

            baseWinningsRequire += step;
        }
    },

    /**
     *
     * @param curTotalWinnings
     * @param baseWinningsRequire
     * @param step
     * @returns {number}
     */
    calculateWinningsRemainToAcquireNewBracelet: function(curTotalWinnings, baseWinningsRequire, step){
        step = step || 0;
        baseWinningsRequire = baseWinningsRequire || 1;
        curTotalWinnings = curTotalWinnings || 0;

        var sum = 0;
        while(1){
            sum += baseWinningsRequire;
            if(sum > curTotalWinnings){
                return sum - curTotalWinnings;
            }

            baseWinningsRequire += step;
        }
    },

    /**
     *
     * @param curTotalBracelets
     * @param baseWinningsRequire
     * @param step
     * @returns {*}
     */
    calculateWinningsToAcquireNewBracelet: function(curTotalBracelets, baseWinningsRequire, step){
        step = step || 0;
        baseWinningsRequire = baseWinningsRequire || 1;
        curTotalBracelets = curTotalBracelets || 0;

        var sum = 0;
        for(var i = 0; i < curTotalBracelets; ++i){
            sum += step;
        }

        return baseWinningsRequire + sum;
    },

    getLevelName: function(level){

    },

    /**
     *
     * @returns {string}
     */
    getStandardGameFont: function(){
        return res.ROBOTO_BOLD;
    },

    getPerfectText: function(text, font, size, chatFieldWidth, hAlign, vAlign, padding, scale) {
        if(cc.sys.isNative) {
            return text;
        }

        if(padding === undefined)
            padding = 0;
        if(scale === undefined)
            scale = 1;
        if(vAlign === undefined)
            vAlign = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
        if(hAlign === undefined)
            hAlign = cc.TEXT_ALIGNMENT_LEFT;
        var wordArr = text.replace("\n", " ").replace("  ", " ").split(" ");
        var labelText = new ccui.Text("", font, size);
        labelText.setTextHorizontalAlignment(hAlign);
        labelText.setTextVerticalAlignment(vAlign);
        labelText.setAnchorPoint(0, 0.5);
        var oneLine = "";
        var reText = "";
        var wordArrLength = wordArr.length;
        for(var i=0; i<wordArrLength; i++) {
            if(oneLine == "") {
                oneLine += wordArr[i];
                reText += wordArr[i];
            }
            else {
                oneLine += " " + wordArr[i];
                reText += " " + wordArr[i];
            }

            labelText.setString(oneLine);
            var isBreak = false;
            if(labelText.getBoundingBox().width*scale > chatFieldWidth-padding) {
                isBreak = true;
            }
            else {
                if(i+1 < wordArrLength) {
                    var template = oneLine + " " + wordArr[i+1];
                    labelText.setString(template);
                    if(labelText.getBoundingBox().width*scale > chatFieldWidth-padding) {
                        isBreak = true;
                    }
                }
            }

            if(isBreak) {
                reText += "\n";
                oneLine = "";
            }
        }

        return reText.replace("\n\n", "\n");
    },

    getTotalTournamentPrize: function(originalGold){
        var rate = parseFloat(resourceMgr.getConfigVIP(moduleMgr.getPlayerModule().getPlayerInfo().vipLevel)["tournamentPrizeBonusRate"]);
        if(rate <= 0) rate = 1;

        return Math.floor(originalGold * rate);
    },

    getTotalGoldByIAP: function(productId){
        var configIAP = resourceMgr.getConfigIAPPackByProductId(productId);

        return configIAP.gold * (1 + resourceMgr.getConfigVIP(moduleMgr.getPlayerModule().getPlayerInfo().vipLevel)["buyGoldBonusRate"]);
    },

    runEffectFireworkAt: function(parent, position){
        var height = 40;
        var numOfPart = 7;
        var width = height * 2 / numOfPart;

        var _runFirework = function(sender, idx){
            var anim = fr.playAnimationOnce(res.anim_firework);

            var dx = idx * width;
            var dy = height - Math.abs(dx) * 0.6;
            anim.setPosition(position.x + dx + (6 - Math.random() * 12), position.y + dy + (5 - Math.random() * 10));
            sender.addChild(anim);
        };

        var sequence = cc.sequence(
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -2.8)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 0)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 3.1)
            ),
            cc.delayTime(0.2 + Math.random() * 0.4),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -6.8)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -4.1)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 3.7)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 6.9)
            ),
            cc.delayTime(0.1 + Math.random() * 0.3),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -3.2)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 0)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 2.9)
            ),
            cc.delayTime(0.1 + Math.random() * 0.5),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -4.1)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 4.1)
            ),
            cc.delayTime(0.1 + Math.random() * 0.2),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -5.8)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, -2)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 6.1)
            ),
            cc.spawn(
                cc.delayTime(Math.random() * 0.2),
                cc.callFunc(_runFirework, this, 2.2)
            )
        );

        parent.runAction(sequence);
    },

    /**
     *
     * @param from
     * @param to
     * @returns {number}
     */
    runEffectTipsChips: function(from, to){
        var layerEffect = sceneMgr.getCurrentScene().getLayer(GV.LAYERS.EFFECT);
        var movingTime = 0.35 * cc.pDistance(from, to) / 360;
        var totalTime = movingTime;

        var chip1 = new Chip();
        var chip2 = new Chip();
        var chip3 = new Chip();

        layerEffect.addChild(chip1);
        layerEffect.addChild(chip2);
        layerEffect.addChild(chip3);

        chip1.setPosition(from.x + 7, from.y + 7);
        chip2.setPosition(from.x - 5, from.y);
        chip3.setPosition(from.x + 2, from.y - 5);

        var startIndex = this.cached.length;
        chip1.setUserData({id: startIndex, isComplete: false});
        chip2.setUserData({id: startIndex + 1, isComplete: false});
        chip3.setUserData({id: startIndex + 2, isComplete: false});
        this.cached.push(chip1);
        this.cached.push(chip2);
        this.cached.push(chip3);

        var self = this;
        totalTime += 0.4 + 0.4 + 0.2 + 0.2;
        chip1.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(0.4, 0, 15),
                    cc.fadeIn(0.4)
                ),
                cc.moveBy(0.4, 0, -15),
                cc.delayTime(0.2),
                cc.moveTo(movingTime, cc.p(to.x + 7, to.y + 7)).easing(cc.easeOut(0.6)),
                cc.delayTime(1.1),
                cc.fadeOut(0.4),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    data.isComplete = true;

                    sender.removeFromParent(true);
                    self.cached[data.id] = null;
                })
            )
        );

        chip2.runAction(
            cc.sequence(
                cc.delayTime(0.15),
                cc.spawn(
                    cc.moveBy(0.4, 0, 15),
                    cc.fadeIn(0.4)
                ),
                cc.moveBy(0.4, 0, -15),
                cc.delayTime(0.1),
                cc.moveTo(movingTime, cc.p(to.x - 5, to.y)).easing(cc.easeOut(0.6)),
                cc.delayTime(1.05),
                cc.fadeOut(0.4),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    data.isComplete = true;

                    sender.removeFromParent(true);
                    self.cached[data.id] = null;
                })
            )
        );

        chip3.runAction(
            cc.sequence(
                cc.delayTime(0.3),
                cc.spawn(
                    cc.moveBy(0.4, 0, 15),
                    cc.fadeIn(0.4)
                ),
                cc.moveBy(0.4, 0, -15),
                cc.moveTo(movingTime, cc.p(to.x + 2, to.y - 5)).easing(cc.easeOut(0.6)),
                cc.delayTime(1),
                cc.fadeOut(0.4),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    data.isComplete = true;

                    sender.removeFromParent(true);
                    self.cached[data.id] = null;
                })
            )
        );

        return totalTime;
    },

    /**
     *
     * @param {cc.Point} from
     * @param {cc.Point} to
     * @param startDelay
     */
    runEffectWinnerChips: function(from, to, startDelay){
        var numOfChips = 20;
        var layerEffect = sceneMgr.getCurrentScene().getLayer(GV.LAYERS.EFFECT);
        var movingTime = 0.9;
        var delayBase = movingTime / 10;

        var distance = cc.pDistance(from, to);
        var normalize = cc.pNormalize(cc.pSub(to, from));

        var angle = cc.pToAngle(normalize) * cc.DEG;
        if(-90 < angle && angle <= 90){
            var perpendicular = cc.pPerp(normalize);
        }
        else{
            perpendicular = cc.pRPerp(normalize);
        }

        var middle = cc.pAdd(cc.pAdd(from, cc.p(normalize.x * distance * 0.7, normalize.y * distance * 0.7)), cc.pMult(perpendicular, Math.abs(from.x - to.x) / 6));
        var controlPoints = [cc.p(from.x, from.y), middle, cc.p(to.x, to.y)];

        var leftCounter = 0;
        var centerCounter = 0;
        var rightCounter = 0;

        var maxDelay = 0.2 + 0.2 + delayBase * numOfChips;
        var lengthChipsList = this.cached.length;
        var self = this;
        for(var i = 0; i < numOfChips;  ++i){
            var chip = new Chip();
            chip.setOpacity(0);
            chip.setPosition(from);
            //chip.setUserData({index: i});
            //chip.setScale(0.8);
            layerEffect.addChild(chip, i);
            this.cached.push(chip);

            if(i < numOfChips * 0.5){
                chip.setUserData({id: lengthChipsList + i, index: centerCounter, position: "center", isComplete: false});
                ++centerCounter;
            }
            else if(i < numOfChips * 0.8){
                chip.setUserData({id: lengthChipsList + i, index: leftCounter, position: "left", isComplete: false});
                ++leftCounter;
            }
            else{
                chip.setUserData({id: lengthChipsList + i, index: rightCounter, position: "right", isComplete: false});
                ++rightCounter;
            }

            var easeInOutRate = 1.8;
            var action = cc.sequence(
                cc.delayTime(startDelay + delayBase * i),
                cc.fadeIn(0.1),
                cc.callFunc(function(sender){
                    if(sender.getUserData().index == 0){
                        Audio.playEffect(res.chips_moving_to_winner);
                    }
                }),
                cc.spawn(
                    cc.bezierTo(movingTime, controlPoints).easing(cc.easeInOut(easeInOutRate)),
                    cc.sequence(
                        cc.delayTime(movingTime * 0.4),
                        cc.scaleTo(movingTime * 0.3, 1.2, 1.2),
                        cc.scaleTo(movingTime * 0.3, 1.0, 1.0)
                    )
                ),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    if(data.position === "center"){
                        sender.setPosition(to.x, to.y + data.index * 2);
                    }
                    else if(data.position === "left"){
                        sender.setPosition(to.x - sender.width, to.y + data.index * 2);
                    }
                    else{
                        sender.setPosition(to.x + sender.width, to.y + data.index * 2);
                    }
                }),
                cc.delayTime(maxDelay - delayBase * i),
                cc.fadeOut(0.1),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    data.isComplete = true;
                    sender.removeFromParent(true);

                    self.cached[data.id] = null;
                })
            );

            chip.runAction(action);
        }
    },

    cleanUpEffectCache: function(){
        //ZLog.debug("cleanUpEffectCache");
        if(this.cached){
            for(var i = 0; i < this.cached.length; ++i){
                if(this.cached[i]){
                    this.cached[i].removeFromParent(true);
                    this.cached[i] = null;
                }
            }

            this.cached.splice(0, this.cached.length);
        }
    },

    /**
     *
     * @param amount
     * @param position
     * @param delay
     * @returns {*}
     */
    runEffectMoneyUp: function(amount, position, delay){
        var layerEffect = sceneMgr.getCurrentScene().getLayer(GV.LAYERS.EFFECT);

        var lbIncreaseMoney = new cc.LabelBMFont("+" + Utility.formatMoney2(amount), res.NUMBER_BITMAP_TABLE);
        lbIncreaseMoney.setPosition(position.x, position.y);
        lbIncreaseMoney.setOpacity(0);
        lbIncreaseMoney.setUserData({id: this.cached.length, isComplete: false});
        layerEffect.addChild(lbIncreaseMoney);
        this.cached.push(lbIncreaseMoney);

        var self = this;
        lbIncreaseMoney.runAction(cc.sequence(
            cc.delayTime(delay),
            cc.fadeIn(0.1),
            cc.moveTo(3, position.x, position.y + 25),
            cc.fadeOut(1),
            cc.callFunc(function(sender){
                var data = sender.getUserData();
                data.isComplete = true;
                sender.removeFromParent(true);

                self.cached[data.id] = null;
            })
        ));

        return lbIncreaseMoney;
    },

    runEffectGoldenRain: function(posY){
        if(posY === undefined) posY = 70;
        var layerEffect = sceneMgr.getCurrentScene().getLayer(GV.LAYERS.CURSOR);
        var numOfGold = 50;

        var self = this;
        var startId = this.cached.length;
        for(var i = 0; i < numOfGold; ++i){
            var rand = Math.random();
            var index = Math.ceil(rand * 1000) % 4;
            var iconGold = new cc.Sprite(res["icon_gold_state_" + index]);
            iconGold.setPosition(Math.random() * cc.winSize.width, cc.winSize.height + 15 + rand * 500); // * (1 + Math.random() * 0.7 + Math.random() * 0.7));
            iconGold.setOpacity(255 * 0.9);
            iconGold.setRotation(rand * 360);
            layerEffect.addChild(iconGold);

            iconGold.setUserData({id: startId + i, isComplete: false});
            this.cached.push(iconGold);

            var animation = new cc.Animation();
            for (var j = 0; j < 4; j++) {
                animation.addSpriteFrameWithFile(res["icon_gold_state_" + ((index + j) % 4)]);
            }

            var dy = iconGold.y - iconGold.height / 2;
            var movingTime = dy / cc.winSize.height + rand * 0.3;
            var delayTime = 0;
            var totalTime = movingTime + delayTime;
            var targetY = posY + (iconGold.height / 2);
            //var targetY = -iconGold.height;

            //ZLog.debug("total time: %d", totalTime);

            animation.setDelayPerUnit(0.08 * dy / cc.winSize.height);
            animation.setLoops(Math.floor((movingTime) / (4 * animation.getDelayPerUnit())));

            var action = cc.sequence(
                cc.delayTime(delayTime),
                //cc.fadeIn(0.1),
                cc.spawn(
                    cc.animate(animation),
                    //cc.moveTo(movingTime, iconGold.x, targetY).easing(cc.easeOut(0.15))
                    cc.moveTo(movingTime, iconGold.x, targetY).easing(cc.easeBounceOut())
                ),
                cc.fadeOut(0.1),
                cc.callFunc(function(sender){
                    var data = sender.getUserData();
                    data.isComplete = true;
                    sender.removeFromParent(true);

                    self.cached[data.id] = null;
                })
            );

            iconGold.runAction(action);
        }
        Audio.playEffect(res.coin_falling);
    },

    runEffectUpdateGold: function(label, currentGold, targetGold){
        if(label && label.setString && label.getString) {
            var numOfUpdate = 30;
            var delay = 0.05;
            var amountAvgDiv2 = (targetGold - currentGold) / (numOfUpdate * 2);

            label.runAction(
                cc.sequence(
                    cc.sequence(
                        cc.delayTime(delay),
                        cc.callFunc(function (sender) {
                            currentGold += Math.ceil(amountAvgDiv2 + Math.random() * amountAvgDiv2);
                            sender.setString(Utility.formatMoney(currentGold, ""));
                        })
                    ).repeat(numOfUpdate),
                    cc.callFunc(function(sender){
                        sender.setString(Utility.formatMoney(targetGold, ""));
                    })
                )
            );
        }
    },

    /**
     *
     * @param from
     * @param to
     * @param amount
     * @param callback
     */
    runEffectGold: function(from, to, amount, callback){
        var layerCursor = sceneMgr.getCurrentScene().getLayer(GV.LAYERS.CURSOR);
        if(layerCursor == null) return;

        var numOfChips = 14;
        var movingTime = 1;
        var delayBase = movingTime / 10;
        var amountAvg = (amount / numOfChips) >> 1;
        var curGold = moduleMgr.getPlayerModule().getGold();

        var self = this;
        var startId = this.cached.length;
        for(var i = 0; i < numOfChips; ++i){
            curGold += amountAvg + Math.random() * amountAvg;

            var iconGold = new cc.Sprite(res.icon_money);
            iconGold.setPosition(from);
            iconGold.setOpacity(0);
            iconGold.setScale(0.7);
            iconGold.setRotation(-30);
            iconGold.setUserData({id: startId + i, gold: curGold, isComplete: false});
            layerCursor.addChild(iconGold, i);
            this.cached.push(iconGold);

            var easeInOutRate = 1.8;
            var action = cc.sequence(
                cc.delayTime(delayBase * i),
                cc.fadeIn(0.1),
                cc.spawn(
                    cc.moveTo(movingTime, to.x, to.y).easing(cc.easeInOut(easeInOutRate)),
                    cc.scaleTo(movingTime, 1.0, 1.0).easing(cc.easeInOut(easeInOutRate))
                ),
                cc.fadeOut(0.1),
                cc.callFunc(function(sender){
                    if(sender) {
                        var data = sender.getUserData();
                        data.isComplete = true;
                        callback && callback(sender.getUserData().gold);
                        sender.removeFromParent(true);
                    }else{
                        callback && callback();
                    }

                    self.cached[data.id] = null;
                })
            );

            iconGold.runAction(action);
        }

        var totalDelay = movingTime + 0.3 + delayBase * numOfChips;
        // set true value gold
        moduleMgr.getPlayerModule().addGold(amount, false);
        setTimeout(function(){
            moduleMgr.getPlayerModule().updateGoldForScene();
        }, totalDelay * 1000);

        return totalDelay;
    },

    getEffectArrowTwinkling: function(numOfArrow, startDelay, imgPath, numOfTwinkling){
        startDelay = startDelay || 0;
        numOfArrow = numOfArrow || 1;
        numOfTwinkling = numOfTwinkling || 100;
        imgPath = imgPath || res.img_direction_arrow;

        var offset = -3;
        var delayTwinkling = 0.5;
        var node = new cc.Node();
        var width = 0;

        for(var i = 0; i < numOfArrow; ++i){
            var imgArrow = new cc.Sprite(imgPath);
            imgArrow.x = (imgArrow.width + offset) * i;
            width += imgArrow.width + offset;
            node.addChild(imgArrow);
            imgArrow.setUserData({opacity: 255 - i * 90});

            imgArrow.runAction(
                cc.sequence(
                    cc.delayTime(startDelay + delayTwinkling * i),
                    cc.repeat(
                        cc.sequence(
                            cc.fadeOut(0.6),
                            cc.fadeIn(0.1)
                        )
                    , numOfTwinkling),
                    cc.callFunc(function(sender){
                        sender.setOpacity(sender.getUserData().opacity);
                    })
                )
            );
        }
        node.setContentSize(width, imgArrow.height);

        return node;
    },

    getEffectPudding: function(){
        var time1 = 0.1;
        var time2 = 0.09;
        var time3 = 0.08;
        var time4 = 0.07;
        var sequence = cc.sequence(
            cc.scaleTo(0.25, 1.1, 0.9),
            cc.scaleTo(time1, 1.0, 1.0),
            cc.scaleTo(time1, 0.9, 1.1),
            cc.scaleTo(time1, 1.0, 1.0),

            cc.scaleTo(time2, 1.05, 0.95),
            cc.scaleTo(time2, 1.0, 1.0),
            cc.scaleTo(time2, 0.95, 1.05),
            cc.scaleTo(time2, 1.0, 1.0),

            cc.scaleTo(time3, 1.02, 0.98),
            cc.scaleTo(time3, 1.0, 1.0),
            cc.scaleTo(time3, 0.98, 1.02),
            cc.scaleTo(time3, 1.0, 1.0),

            cc.scaleTo(time4, 1.005, 0.995),
            cc.scaleTo(time4, 1.0, 1.0),
            cc.scaleTo(time4, 0.995, 1.005),
            cc.scaleTo(time4, 1.0, 1.0)
        );
        return cc.sequence(
            cc.delayTime(2),
            sequence
        ).repeatForever();
    },

    playSoundBestGroup: function(bestGroup){

        // DungPA: tam comment lai do ko lam duoc sound tuong duong. hen mo ra vao 1 ngay khac.
        switch (bestGroup){
            case CardGroupType.ROYAL_FLUSH:
            case CardGroupType.STRAIGHT_FLUSH:
                //Audio.playEffectByLanguage(res.win_by_royal_flush);
                break;

            case CardGroupType.FOUR_OF_A_KIND:
                //Audio.playEffectByLanguage(res.win_by_four_of_a_kind);
                break;

            case CardGroupType.FULL_HOUSE:
                //Audio.playEffectByLanguage(res.win_by_full_house);
                break;

            case CardGroupType.FLUSH:
                //Audio.playEffectByLanguage(res.win_by_flush);
                break;

            case CardGroupType.STRAIGHT:
                //Audio.playEffectByLanguage(res.win_by_straight);
                break;

            case CardGroupType.THREE_OF_A_KIND:
                //Audio.playEffectByLanguage(res.win_by_three_of_a_kind);
                break;

            case CardGroupType.TWO_PAIR:
                //Audio.playEffectByLanguage(res.win_by_two_pair);
                break;

            case CardGroupType.PAIR:
                //Audio.playEffectByLanguage(res.win_by_pair);
                break;

            case CardGroupType.HIGH_CARD:
                //Audio.playEffectByLanguage(res.win_by_high_card);
                break;
        }
    },
};
