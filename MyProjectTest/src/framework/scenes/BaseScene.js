/**
 * Created by minnguyen on 9/20/2017.
 */
var BaseScene = BaseGUI.extend({
    _className: "BaseScene",

    ctor: function(){
        this._super();

        this._needLooping = false;
    },

    _createGameLoop: function(){
        this.schedule(GameLoop.update, GV.TIME_LOOP);
        GameLoop.start();
        GameLoop.addFunc("scene_update", this, this.update.bind(this));
        ZLog.debug("---> game loop at " + this.getClassName());
    },

    hideEditBox: function(){
        //ZLog.debug("hideEditBox");
        for(var i = 0; i < this._listEditBox.length; ++i){
            if(this._listEditBox[i] && this._listEditBox[i].target){
                this._listEditBox[i].state = this._listEditBox[i].target.isVisible();
                this._listEditBox[i].target.setVisible(false);
            }
        }
    },

    restoreEditBox: function(){
        //ZLog.debug("restoreEditBox");
        for(var i = 0; i < this._listEditBox.length; ++i){
            if(this._listEditBox[i] && this._listEditBox[i].target){
                this._listEditBox[i].target.setVisible(this._listEditBox[i].state);
            }
        }
    },

    onEnter: function(){
        this._super();

        if(this._needLooping){
            this._createGameLoop();
        }

        fr.cleanUpAnimationCache();
        fr.platformWrapper.hideNavigation();
    },

    //onExit: function(){
    //    this.removeAllChildren();
    //
    //    this._super();
    //},

    onEnterTransitionDidFinish: function(){
        this._super();

        //ZLog.error("---> onEnterTransitionDidFinish at %s", this.getClassName());
    },

    onExitTransitionDidStart: function(){
        if(this._needLooping){
            GameLoop.stop();
            //GameLoop.cleanUp();
        }
        
        asyncTaskMgr.unschedule();
        //CDButtonMgr.unschedule();
        Tooltip.cleanPool();

        Notifications.hide();
        Popups.hide();
        GUIMgr.hideAll();

        if(!cc.sys.isNative){
            this.restoreEditBox();
        }

        this._super();
        //ZLog.error("---> onExitTransitionDidStart at %s", this.getClassName());
    },

    /**
     * create GV.MAX_LAYERS in this scene
     *   MOVE: 3, include: BG(0), GAME (1), EFFECT (2)
     *   GUI: 4,
     *   POPUP: 5,
     *   LOADING: 6,
     *   CURSOR: 7,
     */
    createChildrenLayers: function(){
        var layer = null;
        this._listLayers = {};

        // create 5 layers: MOVE, GUI, POPUP, LOADING, CURSOR
        for(var layerId = GV.LAYERS.MOVE; layerId < GV.MAX_LAYERS; ++layerId){
            layer = new cc.Layer();
            this._listLayers[layerId] = layer;
            this.addChild(layer, layerId, "layer_" + layerId);
        }

        // create layers BG, GAME, EFFECT, and add to layer MOVE
        var layerMove = this._listLayers[GV.LAYERS.MOVE];
        for(var layerId = 0; layerId < GV.LAYERS.MOVE; ++layerId){
            layer = new cc.Layer();
            this._listLayers[layerId] = layer;
            layerMove.addChild(layer, layerId, "layer_" + layerId);
        }
    },

    /**
     *
     * @param {int} layerId
     * @returns {Layer} layer
     */
    getLayer: function(layerId){
        if(this._listLayers === undefined || this._listLayers == null){
            //cc.warn("----> this scene (%s) not defines _listLayers yet", this.getClassName());
            this._listLayers = {};
        }

        if(this._listLayers[layerId]){
            return this._listLayers[layerId];
        }else{
            // create immediate layer
            //cc.warn("---> layer id (%d) = (%s) NOT create yet", layerId, Utility.getLayerName(layerId));
            var layer = new cc.Layer();
            this._listLayers[layerId] = layer;

            if(layerId == GV.LAYERS.BG || layerId == GV.LAYERS.GAME || layerId == GV.LAYERS.EFFECT){
                // check layer MOVE is exist
                if(this._listLayers[GV.LAYERS.MOVE] === undefined || this._listLayers[GV.LAYERS.MOVE] == null){
                    // create layer MOVE
                    var layerMove = new cc.Layer();
                    this._listLayers[GV.LAYERS.MOVE] = layerMove;
                    this.addChild(layerMove, GV.LAYERS.MOVE, "layer_" + GV.LAYERS.MOVE);
                }

                this._listLayers[GV.LAYERS.MOVE].addChild(layer, layerId, "layer_" + layerId);

            }else if(layerId == GV.LAYERS.MOVE){
                // create 3 layer: BG, GAME, EFFECT inside layer MOVE
                var layerInside = null;
                for(var id = 0; id < GV.LAYERS.MOVE; ++id){
                    layerInside = new cc.Layer();
                    this._listLayers[id] = layerInside;
                    layer.addChild(layerInside, id, "layer_" + id);
                }

                this.addChild(layer, layerId, "layer_" + layerId);
            }else{
                this.addChild(layer, layerId, "layer_" + layerId);
            }

            //ZLog.debug("---> created layer id (%d) = (%s) in this scene", layerId, Utility.getLayerName(layerId));

            return layer;
        }
    },

    /**
     * add keyboard listener for this scene
     * apply with 2 params: key, event
     * @param {Function} funcKeyPressed
     * @param {Function} funcKeyReleased
     */
    addKeyboardListener: function(funcKeyPressed, funcKeyReleased){
        var self = this;
        if ('keyboard' in cc.sys.capabilities){
            var keyboardListener = cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: function(key, event){
                    if(funcKeyPressed){
                        funcKeyPressed.apply(self, [key, event]);
                    }
                },
                onKeyReleased: function (key, event) {
                    if(funcKeyReleased){
                        funcKeyReleased.apply(self, [key, event]);
                    }
                }
            });
            //ZLog.debug("%s ADD KEYBOARD", this.getClassName());
            cc.eventManager.addListener(keyboardListener, self);
        }
    },

    /**
     * add mouse listener for this scene
     * apply with 1 param: event
     * @param {Function} funcMouseDown
     * @param {Function} funcMouseMove
     * @param {Function} funcMouseUp
     */
    addMouseListener: function(funcMouseDown, funcMouseMove, funcMouseUp){
        var self = this;
        if ('mouse' in cc.sys.capabilities){
            var mouseListener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseUp: function(event){
                    if(funcMouseUp){
                        funcMouseUp.apply(self, [event]);
                    }
                },
                onMouseDown: function(event){
                    if(funcMouseDown) {
                        funcMouseDown.apply(self, [event]);
                    }
                },
                onMouseMove: function(event){
                    if(funcMouseMove){
                        funcMouseMove.apply(self, [event]);
                    }
                },

            });
            //ZLog.debug("%s ADD MOUSE", this.getClassName());
            cc.eventManager.addListener(mouseListener, self);
        }
    },

    /**
     * add touch listener for this scene
     * type: single (1) or multi touch (2)
     * apply with 2 params: touch, event
     * @param type
     * @param funcTouchBegan
     * @param funcTouchMoved
     * @param funcTouchEnded
     */
    addTouchListener: function(type, funcTouchBegan, funcTouchMoved, funcTouchEnded){
        var self = this;
        //if ('touches' in cc.sys.capabilities){
            var touchListener = cc.EventListener.create({
                event: type,
                onTouchBegan:function (touch, event) {
                    if(funcTouchBegan){
                        funcTouchBegan.apply(self, [touch, event]);
                        return true;
                    }
                    return false;
                },

                onTouchMoved: function(touch, event) {
                    if(funcTouchMoved){
                        funcTouchMoved.apply(self, [touch, event]);
                    }
                },

                onTouchEnded:function (touch, event) {
                    if(funcTouchEnded){
                        funcTouchEnded.apply(self, [touch, event]);
                    }
                },
            });
            //ZLog.debug("%s ADD TOUCH", this.getClassName());
            cc.eventManager.addListener(touchListener, self);
        //}
    },

    onKeyPressed: function(key, event){

    },

    onKeyReleased: function(key, event){

    },
});