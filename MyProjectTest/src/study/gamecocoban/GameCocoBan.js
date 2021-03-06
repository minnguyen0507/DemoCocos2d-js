var level = [
    [1,1,1,1,1,1,1],
    [1,1,0,0,0,0,1],
    [1,1,3,0,2,0,1],
    [1,0,0,4,0,0,1],
    [1,0,3,1,2,0,1],
    [1,0,0,1,1,1,1],
    [1,1,1,1,1,1,1]
];
createArray = [];
var playerPosition;
var playerSprite;
var startTouch;
var endTouch;
var swipeTolerance = 10;
var GameCocoBanLayer = cc.Layer.extend({
    ctor:function () {
    	this._super();
        console.log("Vao game day thung");
    	this.spriteSheet = null;
    	var size = cc.winSize;
    	//Load SpriteSheet
    	cache = cc.spriteFrameCache;
    	cache.addSpriteFrames("res/animation/spritesheet.plist","res/animation/spritesheet.png");

    //get SpriteSheet
        var backgroundSprite = new cc.Sprite(cache.getSpriteFrame("background.png"));
        backgroundSprite.getTexture().setAliasTexParameters(); //Chong rang cua
        backgroundSprite.setPosition(240,160);
        backgroundSprite.setScale(5);
        this.addChild(backgroundSprite);

        var levelSprite = new cc.Sprite(cache.getSpriteFrame("level.png"));
        levelSprite.getTexture().setAliasTexParameters();
        levelSprite.setPosition(240,110);
        levelSprite.setScale(5);
        this.addChild(levelSprite);

        for (i= 0; i< 7; i++){
            createArray[i] = [];
            for (j= 0; j< 7; j++){
                switch (level[i][j]){
                    case 4:
                    case 6:
                        playerSprite = new cc.Sprite(cache.getSpriteFrame("player.png"));
                        playerSprite.setPosition(165 + 25 * j, 185 - 25 * i);
                        playerSprite.setScale(5);
                        this.addChild(playerSprite);
                        playerPosition = {x:j, y:i};
                        createArray[i][j] = null;
                        break;
                    case 3:
                    case 5:
                        var createSprite = new cc.Sprite(cache.getSpriteFrame("crate.png"));
                        createSprite.setPosition(165 + 25 * j, 185 - 25 * i);
                        createSprite.setScale(5);
                        this.addChild(createSprite);
                        createArray[i][j] = createSprite;
                        break;
                    default:
                        createArray[i][j] = null;
                }
            }
        }
        cc.eventManager.addListener(listener, this);
        return true;
    }
});

var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches : true, //Chờ đợi để chạm vào cả chuột lẫn touch
    onTouchBegan : function (touch, event) {
        startTouch = touch.getLocation();
        return true;
    },
    onTouchEnded : function (touch, event) {
        endTouch = touch.getLocation();
        swipeDirection();
    },


});
function move(deltaX,deltaY){
    switch(level[playerPosition.y+deltaY][playerPosition.x+deltaX]){
        case 0:
        case 2:
            level[playerPosition.y][playerPosition.x]-=4;
            playerPosition.x+=deltaX;
            playerPosition.y+=deltaY;
            level[playerPosition.y][playerPosition.x]+=4;
            playerSprite.setPosition(165+25*playerPosition.x,185-
                25*playerPosition.y);
            break;
        case 3:
        case 5:
            if(level[playerPosition.y + deltaY * 2][playerPosition.x + deltaX * 2] == 0
                || level[playerPosition.y + deltaY * 2][playerPosition.x + deltaX * 2] == 2){
                level[playerPosition.y][playerPosition.x] -= 4;
                playerPosition.x += deltaX;
                playerPosition.y += deltaY;
                level[playerPosition.y][playerPosition.x] += 1;
                playerSprite.setPosition(165 + 25 * playerPosition.x, 185 - 25 * playerPosition.y);
                level[playerPosition.y + deltaY][playerPosition.x + deltaX] += 3;
                var movingCrate = createArray[playerPosition.y][playerPosition.x];
                movingCrate.setPosition(movingCrate.getPosition().x + 25 * deltaX,movingCrate.getPosition().y - 25 * deltaY);
                createArray[playerPosition.y + deltaY][playerPosition.x + deltaX]=movingCrate;
                createArray[playerPosition.y][playerPosition.x] = null;
            }
            break;
    }
};
function swipeDirection(){
    var distX = startTouch.x - endTouch.x;
    var distY = startTouch.y - endTouch.y;
    if(Math.abs(distX) + Math.abs(distY) > swipeTolerance){
        if(Math.abs(distX) > Math.abs(distY)){
            if(distX > 0){
                //playerSprite.setPosition(playerSprite.getPosition().x-25,playerSprite.getPosition().y);
                move(-1,0);
            }
            else{
               // playerSprite.setPosition(playerSprite.getPosition().x+25,playerSprite.getPosition().y);
                move(1,0);
            }
        }
        else{
            if(distY > 0){
               // playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y-25);
                move(0,1);
            }
            else{
                //playerSprite.setPosition(playerSprite.getPosition().x,playerSprite.getPosition().y+25);
                move(0,-1);
            }
        }
    }
};
var GameCocoBanScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameCocoBanLayer();
        this.addChild(layer);
    }
});

