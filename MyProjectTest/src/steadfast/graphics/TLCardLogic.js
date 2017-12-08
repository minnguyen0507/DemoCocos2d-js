var TLCardLogic = TLCardLogic || {};

Array.prototype.swap = function (x, y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
};

TLCardLogic.sortVector = function (vector, reverse) {
    if (reverse) {
        var i = 0;
        while (i < vector.length - 1) {
            var card1 = vector[i];
            var N1 = card1.N;
            var S1 = card1.S;

            var j;
            for (j = i + 1; j < vector.length; j++) {
                var card2 = vector[j];
                var N2 = card2.N;
                var S2 = card2.S;

                if (N1 > N2) {
                    vector.swap(card1, card2);
                    i = 0;
                    break;
                }
                else if (N1 === N2) {
                    if (S1 < S2) {
                        vector.swap(card1, card2);
                        i = 0;
                        break;
                    }
                }
            }
            if (i !== 0 || j === vector.length) {
                i++;
            }
        }
    }
    else {
        var i = 0;
        while (i < vector.length - 1) {
            var card1 = vector[i];
            var N1 = card1.N;
            var S1 = card1.S;
            var j;
            for (j = i + 1; j < vector.length; j++) {
                var card2 = vector[j];
                var N2 = card2.N;
                var S2 = card2.S;

                if (N1 > N2) {
                    vector.swap(card1, card2);
                    i = 0;
                    break;
                }
                else if (N1 === N2) {
                    if (S1 > S2) {
                        vector.swap(card1, card2);
                        i = 0;
                        break;
                    }
                }
            }
            if (i !== 0 || j === vector.length) {
                i++;
            }
        }
    }
};

TLCardLogic.sortList = function (list) {
    if (list.length === 0) {
        return;
    }
    var i = 0;
    while (i < list.length - 1) {
        var p1 = list[i];

        var j;
        for (j = i + 1; j < list.length; j++) {
            var p2 = list[j];

            if (p1 > p2) {
                var temp = p1;
                list[i] = list[j];
                list[j] = temp;
                i = 0;
                break;
            }
        }
        if (i !== 0 || j === list.length) {
            i++;
        }
    }
};

TLCardLogic.getRecommendCards = function (list, myCards) {
    // luon nho phai sort list
    //    list.Sort(ComparisionTienLen);
    sortVector(list, false);

    var cards = [];
    if (list.length === 1) {
        var card = list[0];
        if (card.N === 15) { // neu la 2
            // tim cay 2 lon hon
            for (var i = 0; i < myCards.length; i++) {
                var icard = myCards[i];
                if (icard.N === 15 && icard.S > card.S) {
                    cards.push(icard);
                    return cards;
                }
            }
            // tim tu quy
            cards = getHigherFours(0, myCards);
            if (cards.length > 0)
                return cards;

            // tim 4 doi thong
            // vi tim 4 doi thong bat ky nen cho card_max = 3 bich

            //            GameCard *cmax = new GameCard();
            var cmax = new BaseCard();
            cmax.N = 3;
            cmax.S = 1;

            cards = getHigherFourPairs(cmax, myCards);
            if (cards.length > 0)
                return cards;

            // tim 3 doi thong
            return getHigherThreePairs(cmax, myCards);
        }
        else {
            for (var i = 0; i < myCards.length; i++) {
                var c = myCards[i];
                if (c.N > card.N) {
                    cards.push(c);
                    break;
                }
                if (c.N === card.N && c.S > card.S) {
                    cards.push(c);
                    break;
                }
            }
        }
        return cards;
    }
    else if (isPairs(list)) {
        // tim doi 2 lon hon
        cards = getHigherPairs(list, myCards);
        if (cards.length > 0) {
            return cards;
        }
        else if (list[0].N === 15) {
            // neu la doi 2
            // tim tu quy
            cards = getHigherFours(0, myCards);
            if (cards.length > 0) {
                return cards;
            }

            // tim 4 doi thong
            // vi tim 4 doi thong bat ky nen cho card_max = 3 bich
            var cmax = new BaseCard();
            cmax.N = 3;
            cmax.S = 1;

            cards = getHigherFourPairs(cmax, myCards);
            if (cards.length > 0)
                return cards;
        }
    }
    else if (isThreeOfAKind(list)) {
        return getHigherThrees(list, myCards);
    }
    else if (isFourOfAKind(list)) {
        cards = getHigherFours(list, myCards);
        if (cards.length > 0) {
            return cards;
        }

        // tim 4 doi thong
        // vi tim 4 doi thong bat ky nen cho card_max = 3 bich
        var cmax = new BaseCard();
        cmax.N = 3;
        cmax.S = 1;

        cards = getHigherFourPairs(cmax, myCards);
        if (cards.length > 0)
            return cards;
        //        return getHigherFours(list, myCards);
    }
    else if (isThreePairsStraight(list)) {
        cards = getHigherThreePairs(list, myCards);
        if (cards.length < 1) {
            var cmax = new BaseCard();
            cmax.N = 3;
            cmax.S = 1;
            cards = getHigherFourPairs(cmax, myCards);
        }
        if (cards.length < 1)
            return getHigherFours(0, myCards);
    }
    else if (isStraight(list)) {
        return getHigherStraight(list, myCards);
    }
    else if (isFourPairsStraight(list)) {
        return getHigherFourPairs(list, myCards);
    }
    return cards;
};

TLCardLogic.isStraight = function (cards) {
    var isStraight = true;
    if (cards.length < 3)
        return false;
    for (var i = 0; i < cards.length - 1; i++) {
        var n1 = cards[i].N;
        var n2 = cards[i + 1].N;
        if (n1 === 15 || n2 === 15)
            return false;
        isStraight &= (n1 + 1 === n2);
    }
    return isStraight;
};

TLCardLogic.isStraight_Sam = function (cards) {
    // sanh 2,3,4 Q,K,A
    var valueList1 = [];
    // sanh 1,2,3,4
    var valueList2 = [];
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        valueList1.push(card.N === 15 ? 2 : card.N);
        valueList2.push(card.N === 15 ? 2 : (card.N === 14 ? 1 : card.N));
    }
    if (checkSanh_sam(valueList1)) {
        return true;
    }

    if (checkSanh_sam(valueList2)) {
        return true;
    }

    return false;
};

TLCardLogic.checkSanh_sam = function (cards) {
    if (cards.length < 3)
        return false;
    //    cards.Sort();
    sortList(cards);
    var isSanh = true;
    var n_start = cards[0];
    for (var i = 1; i < cards.length; i++) {
        isSanh &= (cards[i] === (n_start + i));
    }
    return isSanh;
};

TLCardLogic.loaiboxamvatuquy = function (myCardsIn) {
    // luu y myCardsIn da sort

    sortVector(myCardsIn, true);

    var list = [];
    var n = 0;
    var c = 0; // so lan gap cay n
    // danh sach nhung cay bai bi bo
    for (var i = 0; i < myCardsIn.length; i++) {
        if (n === myCardsIn[i].N) {
            c++;
            if (c < 3)
                list.push(myCardsIn[i]);
        } else {
            c = 1;
            n = myCardsIn[i].N;
            list.push(myCardsIn[i]);
        }
    }
    // sort lai input list
    //    myCardsIn.Sort(ComparisionTienLen);
    sortVector(myCardsIn, false);
    return list;
};

TLCardLogic.loaiboxamdoivatuquy = function (myCardsIn) {
    // luu y myCardsIn da sort
    //    myCardsIn.Sort(delegate(Card x, Card y) {
    //        if(x.N> y.N)
    //            return 1;
    //        if(x.N == y.N)
    //            return y.S- x.S; // intent xep nguoc
    //        return -1;
    //    });
    sortVector(myCardsIn, true);

    var list = [];
    var n = 0;
    var c = 0; // so lan gap cay n
    // danh sach nhung cay bai bi bo
    for (var i = 0; i < myCardsIn.length; i++) {
        if (n === myCardsIn[i].N) {
            c++;
            if (c < 2)
                list.push(myCardsIn[i]);
        } else {
            c = 1;
            n = myCardsIn[i].N;
            list.push(myCardsIn[i]);
        }
    }
    // sort lai input list
    //    myCardsIn.Sort(ComparisionTienLen);
    sortVector(myCardsIn, false);
    return list;
};

TLCardLogic.isPairs = function (list) {
    if (list.length !== 2)
        return false;
    return list[0].N === list[1].N;
};

TLCardLogic.isThreeOfAKind = function (list) {
    if (list.length !== 3)
        return false;
    return (list[0].N === list[1].N) && (list[1].N === list[2].N);
};

TLCardLogic.isFourOfAKind = function (list) {
    if (list.length !== 4)
        return false;
    return (list[0].N === list[1].N) && (list[1].N === list[2].N) && (list[2].N === list[3].N);
};

TLCardLogic.isThreePairsStraight = function (list) {
    if (list.length !== 6)
        return false;
    for (var i = 0; i < list.length; i++) {
        var card = list[i];
        if (card.N === 15) {
            return false;
        }
    }
    return (list[0].N === list[1].N) && (list[1].N === list[2].N - 1) && (list[1].N === list[3].N - 1) && (list[1].N === list[4].N - 2) && (list[1].N === list[5].N - 2);
};

TLCardLogic.isFourPairsStraight = function (list) {
    if (list.length !== 8)
        return false;
    for (var i = 0; i < list.length; i++) {
        var card = list[i];
        if (card.N === 15) {
            return false;
        }
    }
    return (list[0].N === list[1].N) && (list[1].N === list[2].N - 1) && (list[1].N === list[3].N - 1) && (list[1].N === list[4].N - 2) && (list[1].N === list[5].N - 2) && (list[1].N === list[6].N - 3) && (list[1].N === list[7].N - 3);
};

TLCardLogic.getHigherStraight = function (list, myCardsIn, sam) {
    var myCards = loaiboxamdoivatuquy(myCardsIn);
    sortVector(myCardsIn, false);

    var straight = [];
    if (myCards.length < list.length)
        return straight;
    for (var i = 0; i < myCards.length - 1; i++) {
        if (myCards[i].N < list[0].N)
            continue;
        if (myCards[i].N === list[0].N && sam)
            continue;
        if (myCards.length - i < list.length)
            break;
        for (var j = 0; j < list.length; j++) {
            var k = j;
            if (j > 0) {
                while ((i + k < myCards.length - 1) && (straight[j - 1].N === myCards[i + k].N))
                    k++;
                // avoid to add same N into straight
            }
            if (j < list.length - 1) {
                straight.push(myCards[i + k]);
            } else if ((myCards[i + k].N === list[j].N) && (myCards[i + k].S < list[j].S)) {
                var s = k;
                while ((i + s < myCards.length - 1) && (list[j].N === myCards[i + s].N) && (myCards[i + s].S < list[j].S))
                    s++;
                if (s > k) s--;
                straight.push(myCards[i + s]);
                // find the bigger S for last card if have the same N
            } else {
                straight.push(myCards[i + k]);
            }
        }
        if ((straight.length === list.length) && (sam ? isStraight_Sam(straight) : isStraight(straight))) {
            if (straight[0].N === list[0].N) {
                if (straight[list.length - 1].S > list[list.length - 1].S) {
                    return straight;
                } else {
                    straight.clear();
                }
            } else {
                return straight;
            }
        } else {
            straight.clear();
        }
    }
    return straight;
};

TLCardLogic.getHigherPairs = function (list, myCards, sam) {
    var pairs = [];
    if (myCards.length < 2)
        return pairs;
    sortVector(myCards, false);

    //		Debug.LogError("N :"+ list[0).N);
    for (var i = 0; i < myCards.length - 1; i++) {
        if (myCards[i].N < list[0].N)
            continue;
        if (myCards[i].N === list[0].N && sam)
            continue;
        if (myCards[i].N === myCards[i + 1].N) {
            if (myCards[i].N === list[0].N) {
                if (myCards[i + 1].S > list[1].S) {
                    pairs.push(myCards[i]);
                    pairs.push(myCards[i + 1]);
                    return pairs;
                }
            }
            else {
                pairs.push(myCards[i]);
                pairs.push(myCards[i + 1]);
                return pairs;
            }
        }
    }
    return pairs;
};

TLCardLogic.getHigherThrees = function (list, myCards, sam) {
    var threes = [];
    if (myCards.length < 3)
        return threes;
    sortVector(myCards, false);

    for (var i = 0; i < myCards.length - 2; i++) {
        if (myCards[i].N < list[0].N)
            continue;
        if (myCards[i].N === list[0].N && sam)
            continue;
        if ((myCards[i].N === myCards[i + 1].N) && (myCards[i + 1].N === myCards[i + 2].N)) {
            if (myCards[i].N === list[0].N) {
                if (myCards[i + 2].S > list[2].S) {
                    threes.push(myCards[i]);
                    threes.push(myCards[i + 1]);
                    threes.push(myCards[i + 2]);
                    return threes;
                }
            }
            else {
                threes.push(myCards[i]);
                threes.push(myCards[i + 1]);
                threes.push(myCards[i + 2]);
                return threes;
            }
        }
    }
    return threes;
};

TLCardLogic.getHigherFours = function (list, myCards) {
    return getHigherFours(list[0].N, myCards);
};

TLCardLogic.getHigherFours = function (n, myCards) {
    var fours = [];
    if (myCards.length < 4)
        return fours;
    sortVector(myCards, false);

    for (var i = 0; i < myCards.length - 3; i++) {
        if (myCards[i].N < n)
            continue;
        if ((myCards[i].N === myCards[i + 1].N) && (myCards[i + 1].N === myCards[i + 2].N) && (myCards[i + 2].N === myCards[i + 3].N)) {
            fours.push(myCards[i]);
            fours.push(myCards[i + 1]);
            fours.push(myCards[i + 2]);
            fours.push(myCards[i + 3]);
            return fours;
        }
    }
    return fours;
};

TLCardLogic.getHigherThreePairs = function (cmax, myCardsIn, sam) {
    // bo tat ca cac xam va tu quy trong list cua minh
    sortVector(myCardsIn, false);

    var myCards = loaiboxamvatuquy(myCardsIn);
    //		Debug.LogError("cmax: "+ cmax.N +" S: "+ cmax.S);
    var sixs = [];
    if (myCards.length < 6)
        return sixs;
    for (var i = 0; i < myCards.length - 5; i++) {
        if (myCards[i].N < (cmax.N - 2))
            continue;
        if (myCards[i].N === (cmax.N - 2) && sam)
            continue;
        if ((myCards[i].N === myCards[i + 1].N)
            && (myCards[i].N === myCards[i + 2].N - 1)
            && (myCards[i].N === myCards[i + 3].N - 1)
            && (myCards[i].N === myCards[i + 4].N - 2)
            && (myCards[i].N === myCards[i + 5].N - 2)
            && myCards[i + 5].N !== 15) {
            if (myCards[i].N === (cmax.N - 2)) {
                if (myCards[i + 5].S > cmax.S) {
                    sixs.push(myCards[i]);
                    sixs.push(myCards[i + 1]);
                    sixs.push(myCards[i + 2]);
                    sixs.push(myCards[i + 3]);
                    sixs.push(myCards[i + 4]);
                    sixs.push(myCards[i + 5]);
                    return sixs;
                }
            }
            else {
                sixs.push(myCards[i]);
                sixs.push(myCards[i + 1]);
                sixs.push(myCards[i + 2]);
                sixs.push(myCards[i + 3]);
                sixs.push(myCards[i + 4]);
                sixs.push(myCards[i + 5]);
                return sixs;
            }
        }
    }
    return sixs;
};

TLCardLogic.getHigherFourPairs = function (cmax, myCardsIn, sam) {
    // bo tat ca cac xam va tu quy trong list cua minh
    //    myCardsIn.Sort(ComparisionTienLen);
    sortVector(myCardsIn, false);

    var myCards = loaiboxamvatuquy(myCardsIn);
    //		Debug.LogError("cmax: "+ cmax.N +" S: "+ cmax.S);

    var eights = [];
    if (myCards.length < 8)
        return eights;
    for (var i = 0; i < myCards.length - 7; i++) {
        if (myCards[i].N < (cmax.N - 3))
            continue;
        if (myCards[i].N === (cmax.N - 3) && sam)
            continue;
        if ((myCards[i].N === myCards[i + 1].N)
            && (myCards[i].N === myCards[i + 2].N - 1)
            && (myCards[i].N === myCards[i + 3].N - 1)
            && (myCards[i].N === myCards[i + 4].N - 2)
            && (myCards[i].N === myCards[i + 5].N - 2)
            && (myCards[i].N === myCards[i + 6].N - 3)
            && (myCards[i].N === myCards[i + 7].N - 3)) {
            if (myCards[i].N === (cmax.N - 3)) {
                if (myCards[i + 7].S > cmax.S) {
                    eights.push(myCards[i]);
                    eights.push(myCards[i + 1]);
                    eights.push(myCards[i + 2]);
                    eights.push(myCards[i + 3]);
                    eights.push(myCards[i + 4]);
                    eights.push(myCards[i + 5]);
                    eights.push(myCards[i + 6]);
                    eights.push(myCards[i + 7]);
                    return eights;
                }
            }
            else {
                eights.push(myCards[i]);
                eights.push(myCards[i + 1]);
                eights.push(myCards[i + 2]);
                eights.push(myCards[i + 3]);
                eights.push(myCards[i + 4]);
                eights.push(myCards[i + 5]);
                eights.push(myCards[i + 6]);
                eights.push(myCards[i + 7]);
                return eights;
            }
        }
    }
    return eights;
};

TLCardLogic.getHigherThreePairs = function (list, myCards, sam) {
    return getHigherThreePairs(list[list.length - 1], myCards, sam);
};

TLCardLogic.getHigherFourPairs = function (list, myCards, sam) {
    return getHigherFourPairs(list[list.length - 1], myCards, sam);
};

