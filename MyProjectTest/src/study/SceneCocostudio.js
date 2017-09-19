
var SceneCocostudioLayer = cc.Layer.extend({
    _spineboy:null,
    ctor:function () {
        this._super();
        this.btnBack = null;
        this.btnClose = null;
        this.bgLogin = null;
        this.spriteTest = null;
        this.labelTest = null;
        var size = cc.winSize;
        ZLog.error("Scene Cocostudio");


        sceneConfig = ccs.load(res.scene_cocostudio, "res/");
        nodeCocostudio = sceneConfig.node;
        this.addChild(nodeCocostudio,0);

      //  AdminGUI.createSprite(this.spriteTest, this, res.btn_next);
    //        AdminGUI.createLabelTTF(this.labelTest,this,"NoName", 23, res.FONT_ROBOTO_BOLD);


        // this.labelTest = new cc.LabelTTF("NoName", res.FONT_ROBOTO_BOLD, 22);
        // this.addChild(this.labelTest, 99);
        // this.labelTest.setPosition(cc.winSize.width/2, cc.winSize.height/2);


        this.btnBack = nodeCocostudio.getChildByName("btnBack");
        this.btnClose =  nodeCocostudio.getChildByName("btnClose");

        this.btnBack.addTouchEventListener(this.touchEvent,this);
        this.btnBack.setPressedActionEnabled(true);

        this.btnClose.addTouchEventListener(this.touchEvent,this);
        this.btnClose.setPressedActionEnabled(true);


        var spineBoy = new sp.SkeletonAnimation('res/animation/girl/girl1.json', 'res/animation/girl/girl1.atlas');
        spineBoy.setPosition(cc.p(size.width / 2, size.height / 2 - 380));
        spineBoy.setAnchorPoint(0.5,0.5);
        spineBoy.setScale(0.7);
        spineBoy.setAnimation(0, 'idle', true);
        //spineBoy.setAnimationListener(this, this.animationStateEvent);
        this.addChild(spineBoy, 4);
        this._spineboy = spineBoy;


        return true;
    },
    touchEvent : function (sender,  type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                    switch (sender){
                        case this.btnBack:
                            ZLog.error("Click Back");
                            AdminActions.createMoveTo(this._spineboy,2,size.width / 2 + 100, size.height / 2 - 380);
                            break;
                        case  this.btnClose:
                            ZLog.error("Click Close");
                            break;
                    }
                break;
        }
    }
});

var SceneCocostudio = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SceneCocostudioLayer();
        this.addChild(layer);
    }
});

