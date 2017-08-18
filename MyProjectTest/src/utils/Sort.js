/**
 * Created by bachbv on 5/2/2017.
 */

var Sort = {
    isSorted: function(list){
        for(var i = 0; i < list.length - 1; ++i){
            if(list[i] < list[i + 1]){
                return false;
            }
        }

        return true;
    },

    //============================================================
    // MERGE SORT
    //============================================================
    _mergeSortNumber: function(list, keySorted, sortOrder){
        if(list.length == 1) return list;
        if(sortOrder === undefined) sortOrder = SORT_ORDER.A_Z;

        var leftList = [];
        var rightList = [];
        var length_div_2 = list.length >> 1;
        for(var i = 0; i < list.length; ++i){
            if(i < length_div_2){
                leftList.push(list[i]);
            }
            else{
                rightList.push(list[i]);
            }
        }

        leftList = this._mergeSortNumber(leftList);
        rightList = this._mergeSortNumber(rightList);

        list.sort(function(a, b){
            return a - b;
        });

        return this._mergeNumber(leftList, rightList, keySorted, sortOrder);
    },

    _mergeNumber: function(leftList, rightList, keySorted, sortOrder){
        var target = [];
        var i = 0, j = 0;

        if(sortOrder == SORT_ORDER.A_Z){
            while(i < leftList.length && j < rightList.length){
                if(rightList[j][keySorted] < leftList[i][keySorted]){
                    target.push(rightList[j++]);
                }
                else{
                    target.push(leftList[i++]);
                }
            }
        }
        else{ // Z_A
            while(i < leftList.length && j < rightList.length){
                if(rightList[j][keySorted] > leftList[i][keySorted]){
                    target.push(rightList[j++]);
                }
                else{
                    target.push(leftList[i++]);
                }
            }
        }



        while(i < leftList.length){
            target.push(leftList[i++]);
        };

        while(j < rightList.length){
            target.push(rightList[j++]);
        };

        leftList.splice(0, leftList.length);
        rightList.splice(0, rightList.length);
        return target;
    },

    //============================================================
    // MERGE SORT Z -> A
    //============================================================
    mergeSortByCardType: function(list){
        if(list.length == 1) return list;

        var leftList = [];
        var rightList = [];
        var length_div_2 = list.length >> 1;
        for(var i = 0; i < list.length; ++i){
            if(i < length_div_2){
                leftList.push(list[i]);
            }
            else{
                rightList.push(list[i]);
            }
        }

        leftList = this.mergeSortByCardType(leftList);
        rightList = this.mergeSortByCardType(rightList);

        return this._mergeCardType(leftList, rightList);
    },

    _mergeCardType: function(leftList, rightList){
        var target = [];
        var i = 0, j = 0;
        while(i < leftList.length && j < rightList.length){
            if(Card.getType(rightList[j]) > Card.getType(leftList[i])){
                target.push(rightList[j++]);
            }
            else{
                target.push(leftList[i++]);
            }
        }

        while(i < leftList.length){
            target.push(leftList[i++]);
        };

        while(j < rightList.length){
            target.push(rightList[j++]);
        };

        leftList = null;
        rightList = null;
        return target;
    },

    //============================================================
    // RANKING BY MERGE SORT Z -> A
    //============================================================
    mergeSortSlots: function(list){
        if(list.length == 1) return list;

        var leftList = [];
        var rightList = [];
        var length_div_2 = list.length >> 1;
        for(var i = 0; i < list.length; ++i){
            if(i < length_div_2){
                leftList.push(list[i]);
            }
            else{
                rightList.push(list[i]);
            }
        }

        leftList = this.mergeSortSlots(leftList);
        rightList = this.mergeSortSlots(rightList);

        return this._mergeSlots(leftList, rightList);
    },

    _mergeSlots: function(leftList, rightList){
        var target = [];
        var i = 0, j = 0;
        while(i < leftList.length && j < rightList.length){
            var leftBestGroup = leftList[i].getBestGroup();
            var rightBestGroup = rightList[j].getBestGroup();

            if(leftBestGroup.getType() > rightBestGroup.getType()){
                target.push(leftList[i++]);
            }
            else if(leftBestGroup.getType() < rightBestGroup.getType()){
                target.push(rightList[j++]);
            }
            else{
                var leftScore = leftBestGroup.getScore();
                var rightScore = rightBestGroup.getScore();
                var draw = true;
                for(var k = 0; k < leftScore.length; ++k){
                    if(leftScore[k] > rightScore[k]){
                        target.push(leftList[i++]);
                        draw = false;
                        break;
                    }
                    else if(leftScore[k] < rightScore[k]){
                        target.push(rightList[j++]);
                        draw = false;
                        break;
                    }
                }

                // GROUPS IS DRAW
                if(draw){
                    target.push(leftList[i++]);
                    target.push(rightList[j++]);
                }
            }
        }

        while(i < leftList.length){
            target.push(leftList[i++]);
        };

        while(j < rightList.length){
            target.push(rightList[j++]);
        };

        leftList = null;
        rightList = null;
        return target;
    },
};

SORT_ORDER = {
    A_Z: false,
    Z_A: true
};
