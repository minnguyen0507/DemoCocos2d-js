/**
 * Created by minnguyen on 9/20/2017.
 */

getListZOrder = function(node){
    if(node == null) return -1;

    var curNode = node;
    var list = [];

    //ZLog.debug("---------------------------------------------");
    //if(node == sceneMgr.getFog()){
    //    ZLog.debug("is fog");
    //}
    //
    //if(curNode instanceof BaseScene){
    //    ZLog.debug("is scene " + curNode._className);
    //}
    //else if(curNode instanceof BaseGUI){
    //    ZLog.debug("is GUI " + curNode._className);
    //}

    while(!(curNode instanceof BaseScene) && curNode.getParent()){
        list.push(curNode.getLocalZOrder());
        //ZLog.debug(curNode.getLocalZOrder());

        curNode = curNode.getParent();
    }
    list.push(curNode);
    list.reverse();

    //var tmp = [].concat(list).slice(1);
    //ZLog.debug(JSON.stringify(tmp));
    //ZLog.debug("---------------------------------------------");

    return list;
};

compareZOrder = function(node1, node2){
    var list1 = getListZOrder(node1);
    var list2 = getListZOrder(node2);

    if(list1.length > 0 && list2.length > 0 && list1[0] == list2[0]){
        var length = Math.min(list1.length, list2.length);

        for(var i = 1; i < length; ++i){
            if(list1[i] > list2[i]){
                // zOrder node1 > node2
                //ZLog.debug("z1 = " + list1[i] + "> z2 = " + list2[i]);
                return 1;
            }
            else if(list1[i] == list2[i]){
                // continue;
            }
            else{
                // zOrder node1 < node2
                //ZLog.debug("z1 = " + list1[i] + "< z2 = " + list2[i]);
                return -1;
            }
        }

        return 1;
    }
    else{
        ZLog.error("cannot compare zOrder of 2 nodes");
        return 0;
    }
};

var SceneMgr = cc.Class.extend({

    ctor:function () {
        this._currentScene = null;
        this._listScenes = {};
        this._sceneFactory = null;
        this._currentSceneId = -1;
        this._oldSceneId = -1;
        this._fog = null;
        this._fogListener = null;
        this._guiWaiting = null;
        return true;
    },

    /**
     *
     * @param {BaseScene} scene
     * @param {int} sceneId
     */
    addScene:function(scene, sceneId){
        this.removeScene(sceneId);
        this._listScenes[sceneId] = scene;
        scene.retain();
    },

    removeScene:function(sceneId) {
        if(this._listScenes[sceneId]){
            this._listScenes[sceneId].release();
            delete this._listScenes[sceneId];
        }
    },

    /**
     *
     * @param {int} sceneId
     * @returns {Layer}
     */
    getScene:function(sceneId)
    {
        if(this._listScenes[sceneId]) {
            return this._listScenes[sceneId];
        }
        else if(this._sceneFactory != null) {
            var screen = this._sceneFactory.createScreen(sceneId);
            if(screen != null) {
                this.addScene(screen,sceneId);
                return screen;
            }
        }

        ZLog.error("----> NOT FOUND scene id (%d)", sceneId);
        return null;
    },

    /**
     * get Layer by id in a scene
     * @param {int} layerId
     * @param {int} sceneId
     * @return {Layer} layer
     */
    getLayerInScene: function(layerId, sceneId){
        var scene = this.getScene(sceneId);

        if(scene){
            return scene.getLayer(layerId);
        }else{
            ZLog.error("----> NOT FOUND scene id (%d)", sceneId);
            return null;
        }
    },

    isExistScene: function(sceneId){
        return this._listScenes[sceneId];
    },

    /**
     *
     * @param {int} sceneId
     * @param isKeepPrevScene
     */
    viewSceneById:function(sceneId, isKeepPrevScene){
        if(isKeepPrevScene === undefined){
            isKeepPrevScene = true;
        }

        if (sceneId == this._currentSceneId) {
            return;
        }

        if(!isKeepPrevScene) {
            this.removeScene(sceneId);
        }

        this._oldSceneId = this._currentSceneId;
        this._currentSceneId = sceneId;
        this.viewScene(this.getScene(sceneId));

        //ZLog.debug("viewSceneById %d", sceneId);
        return this._currentScene;
    },

    /**
     *
     * @param {cc.Layer} layer
     */
    viewScene:function(layer)
    {
        // check correct "Layer" type
        cc.arrayVerifyType(layer, cc.Layer);

        layer.removeFromParent(false);
        var scene = new cc.Scene();
        scene.addChild(layer);

        sceneMgr.cleanFogCache();
        EffectMgr.cleanUpCurrentScene();
      //  asyncTaskMgr.cleanUp();

        // initialize director
        if(this._oldSceneId == -1){
            cc.director.runScene(scene);

        }else{
            var pTransition = this._sceneFactory.createTransition(scene);
            cc.director.runScene(pTransition);
        }
        this._currentScene = layer;

        if(moduleMgr){
            moduleMgr.getPingnModule().stopPing();

            // add ping listener for this scene
            moduleMgr.getPingnModule().startPingAt(scene, layer);
        }
    },

    setSceneFactory:function(sceneFactory)
    {
        this._sceneFactory = sceneFactory;
    },

    /**
     *
     * @returns {number|*}
     */
    getCurrentSceneId:function()
    {
        return this._currentSceneId;
    },

    isScene: function(sceneId){
        return this._currentSceneId == sceneId;
    },

    /**
     *
     * @returns {BaseScene}
     */
    getCurrentScene:function()
    {
        return this._currentScene;
    },

    _createFog: function(){
        this._fog = new cc.LayerColor(Utility.getColorByName('black'), GV.VISIBALE_SIZE.width, GV.VISIBALE_SIZE.height);
        this._fog.retain();
        this._fog.setOpacity(180);
        this._fog.setVisible(false);

        this._fogListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                return cc.rectContainsPoint(rect, locationInNode);
            },
            onTouchMoved: function (touch, event) {
                //var target = event.getCurrentTarget();
                //var delta = touch.getDelta();
                //target.x += delta.x;
                //target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                //var target = event.getCurrentTarget();
                ////ZLog.debug("sprite onTouchesEnded.. ");
                //target.setOpacity(255);
                //if (target == sprite2) {
                //    containerForSprite1.setLocalZOrder(100);
                //} else if (target == sprite1) {
                //    containerForSprite1.setLocalZOrder(0);
                //}
            }
        });

        cc.eventManager.addListener(this._fogListener, this._fog);
    },

    /**
     *
     * @param target
     * @returns {number}
     */
    getIndexOfTarget: function(target){
        if(target == undefined || target == null || this.showFog._listGUI === undefined){
            return -1;
        }

        var listTarget = this.showFog._listGUI;
        for(var i = 0; i < listTarget.length; ++i){
            if(target == listTarget[i].target) return i;
        }

        return -1;
    },

    isShowFog: function(){
        return this._fog && this._fog.isVisible() && this._fog.getParent();
    },

    /**
     * show the fog with opacity
     * target had added to parent
     * @param target
     * @param guiName
     * @param opacity
     * @returns {boolean}
     */
    showFog: function(target, guiName, opacity){
        if(this.showFog._listGUI === undefined) this.showFog._listGUI = [];
        var zOrder = target.getLocalZOrder() - 1;

        if(this._currentScene){
            var fog = this.getFog();

            fog.setVisible(true);

            var index = this.getIndexOfTarget(target);
            if(index >= 0){
                // re-order target
                var parentObj = this.showFog._listGUI.splice(index, 1)[0];
                parentObj.zOrder = zOrder;

                fog.removeFromParent(false);
                target.getParent().addChild(fog, zOrder);
            }
            else{
                parentObj = {
                    target: target,
                    name: guiName,
                    zOrder: zOrder
                };

                var isHigherLayer = 1;
                if(this.showFog._listGUI.length > 0){
                    var lastObj = this.showFog._listGUI[this.showFog._listGUI.length - 1];
                    isHigherLayer = compareZOrder(target, lastObj.target);
                }

                //ZLog.debug("isHigherLayer | " + isHigherLayer);
                if(isHigherLayer >= 0){
                    fog.removeFromParent(false);
                    target.getParent().addChild(fog, zOrder);

                    this.showFog._listGUI.push(parentObj);

                    //ZLog.debug("show fog | " + guiName + " | zOder | " + zOrder);
                }
                else{
                    lastObj = this.showFog._listGUI.pop();
                    this.showFog._listGUI.push(parentObj);
                    this.showFog._listGUI.push(lastObj);

                    //for(var i = 0; i < this.showFog._listGUI.length; ++i){
                    //    ZLog.debug("GUI | " + this.showFog._listGUI[i].name);
                    //}

                    //ZLog.debug("show fog last GUI| " + guiName + " | zOder | " + zOrder);
                }
            }

            if(opacity !== undefined){
                fog.setOpacity(opacity);
            }

            this._fogListener.setEnabled(true);
            if(!cc.sys.isNative){
                this._currentScene.hideEditBox && this._currentScene.hideEditBox();
            }
            return true;
        }

        return false;
    },

    _findFogOf: function(target){
        var list = this.showFog._listGUI;
        if(list && list.length > 0){
            for(var i = 0; i < list.length; ++i){
                if(target === list[i].target) return i;
            }
        }

        return -1;
    },

    _removeFogOf: function(target){
        var index = this._findFogOf(target);
        if(index >= 0){
            return this.showFog._listGUI.splice(index, 1)[0];
        }
        else{
            return null;
        }
    },

    hideFog: function(target){
        if(this.showFog._listGUI === undefined) this.showFog._listGUI = [];
        if(target == null || target === undefined) {
            ZLog.error("hideFog: no target found");
            return;
        }

        if(this.showFog._listGUI.length > 0){
            var fogOfTarget = this._removeFogOf(target);
            if(fogOfTarget){
                if(this.showFog._listGUI.length > 0){
                    var obj = this.showFog._listGUI[this.showFog._listGUI.length - 1];
                    var fog = this.getFog();

                    // re-addChild to other parent
                    fog.removeFromParent(false);
                    obj.target.getParent().addChild(fog, obj.zOrder);

                    //ZLog.debug("change zOrder fog: %s, zOrder = %d", obj.name, obj.zOrder);
                }
            }
            else{
                ZLog.error("hideFog: no fogOfTarget found");
            }
        }

        if(this.showFog._listGUI.length == 0){
            //ZLog.debug("hide fog");

            this.getFog().setVisible(false);
            this._fogListener.setEnabled(false);
            if(!cc.sys.isNative){
                this._currentScene.restoreEditBox && this._currentScene.restoreEditBox();
            }
        }
    },

    cleanFogCache: function(){
        if(this.showFog._listGUI){
            this.showFog._listGUI.splice(0, this.showFog._listGUI.length);
        }

        if(this._fog) this._fog.setVisible(false);
    },

    /**
     * get the fog
     * @returns {cc.LayerColor}
     */
    getFog: function(){
        if(this._fog == null){
            this._createFog();
        }

        return this._fog;
    },

    showGUIWaiting: function(){
        if(this._guiWaiting == null){
            this._guiWaiting = new GUIWaiting();
            this._guiWaiting.setVisible(false);
            this._guiWaiting.retain();
        }

        //if(this._currentScene){
        //    var layer = this.getCurrentScene().getLayer(GV.LAYERS.CURSOR);
        //    this.showFog(layer, this._guiWaiting.getClassName());
        //
        //    if(this._guiWaiting.parent != layer){
        //        this._guiWaiting.removeFromParent(false);
        //        layer.addChild(this._guiWaiting, 1);
        //    }
        //
        //    this._guiWaiting.show();
        //}

        this._guiWaiting.showAtCurrentScene();
    },

    hideGUIWaiting: function(){
        if(this._guiWaiting){
            this._guiWaiting.hide();
        }
    },
});