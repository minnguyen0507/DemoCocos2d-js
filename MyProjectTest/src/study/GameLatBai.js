var pickedTiles = [];
var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var countClick;
var scoreHigh;
var moves = 0;
var score =0;
var GameLatBai = cc.Layer.extend({
    ctor:function () {
        this.bg = null;
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        cc.log("yessss");

        this.bg= new cc.Sprite(res.bg_test);
        this.bg.setAnchorPoint(0.5,0.5);
        this.bg.setPosition(size.width/2 , size.height/ 2);
        this.addChild(this.bg,2);

        countClick = new cc.LabelTTF("Moves: 0", "Arial", 32);
        countClick.setAnchorPoint(0.5,0.5);
        countClick.setPosition(size.width * 0.75 , size.height * 0.75);
        this.addChild(countClick, 2);

        scoreHigh = new cc.LabelTTF("Score High: 0", "Arial", 32);
        scoreHigh.setAnchorPoint(0.5,0.5);
        scoreHigh.setPosition(countClick.getPositionX() - 200, countClick.getPositionY());
        this.addChild(scoreHigh, 3);
        for ( i= 0; i< 16; i++){
        //	var tile = new cc.Sprite(res.cover);
        	var tile = new MemoryTile();
        	tile.pictureValue = gameArray[i];
            console.log(tile.pictureValue);
            this.bg.addChild(tile, 0);
        	tile.setPosition(49+ i%4 *74 + 400, 400- Math.floor( i/4) * 74);
        }
        return true;
    }
});
var MemoryTile = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile(res.cover);
        cc.eventManager.addListener(listener.clone(),this);
    }
});

var listener = cc.EventListener.create({
    event : cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true,
    onTouchBegan : function (touch, event){
        if (pickedTiles.length < 2){
            var target = event.getCurrentTarget();
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize  = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);
            if (cc.rectContainsPoint(targetRectangle, location)){
                if(pickedTiles.indexOf(target) == -1){
                    console.log("I Picked a tile");
                    target.initWithFile("res/gamelatbai/tile_" + target.pictureValue + ".png");
                    pickedTiles.push(target);
                    if(pickedTiles.length == 2){
                        checkTiles();
                    }
                }
            }
        }
    }
})

function checkTiles(){
    moves ++;
    countClick.setString("Click: "+ moves);
    var pause = setTimeout(function(){
        if(pickedTiles[0].pictureValue != pickedTiles[1].pictureValue){
            console.log("Vaoooooooooooooo 1");
            pickedTiles[0].initWithFile(res.cover);
            pickedTiles[1].initWithFile(res.cover);
        }
        else{
            score ++;
            scoreHigh.setString("Score High: " + score);
            console.log("Vaoooooooooooooo 2");
            pickedTiles[0].removeFromParent();
            pickedTiles[1].removeFromParent();
            // GameLatBai.removeChild(pickedTiles[0]);  //Sao lai ko duoc nhi
            // GameLatBai.removeChild(pickedTiles[1]);
        }
        pickedTiles = [];
    },2000);
}

var GameLatBaiScene = cc.Scene.extend({
    onEnter:function () {
        gameArray = shuffle(gameArray); //trộn array khi khởi tạo Scenes
        this._super();
        var layer = new GameLatBai();
        this.addChild(layer);
    }
});

var shuffle = function (array) {
    for (var j, x, i = array.length; i; j = parseInt(Math.random() *i),
    x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};