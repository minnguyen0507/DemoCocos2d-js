/**
 * Created by bachbv on 1/16/2017.
 */

var UIKey = {
    AUTO_SCALE: "-auto-scale",
    DISABLE_PRESSED_SCALE: "-disable-pressed-scale",
    DISABLE_HOVER: "-disable-hover"
};

var GUIMgr = {
    _queue: [],

    isInQueue: function(gui){
        return this._queue.indexOf(gui) >= 0;
    },

    getQueueLength: function(){
        return this._queue.length;
    },

    getQueue: function(){
        return this._queue;
    },

    push: function(gui){
        //ZLog.error("push");
        var index = this._queue.indexOf(gui);
        if(index < 0){
            this._queue.push(gui);
        }
    },

    remove: function(gui){
        //ZLog.error("remove");
        var index = this._queue.indexOf(gui);
        if(index >= 0){
            this._queue.splice(index, 1);
        }
    },

    hideAll: function(){
        //ZLog.error("hideAll");
        for(var i = 0; i < this._queue.length; ++i){
            this._queue[i].hide(false);
        }
        this.removeAll();
    },

    removeAll: function(){
        //ZLog.error("removeAll");
        this._queue.splice(0);
    }
};

var BaseGUI = cc.Layer.extend({
    _className: "BaseGUI",

    ctor:function(){
        this._super();
        this.screenConfig = null;
        this._deepSyncChildren = 1;
        this._isRegistryTouchOutGUIEvent = false;
        this._guiRect = cc.rect(0, 0, 0, 0);
        this._listButtons = [];
        this._listEditBox = [];

        this.isLanguageDirty = true;
        this.languageListenerEvent = null;
        this.btnOnHighlight = -1;

        //listen mouse on button
        this.initHoverListener();
    },

    initHoverListener: function(){
        if(!cc.sys.isNative){
            if( 'mouse' in cc.sys.capabilities ) {
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function(event){
                        var pointer = false;
                        var pos = event.getLocation(), target = event.getCurrentTarget();

                        if(!target.isVisible()) return;

                        if (!target.disableMouseEvent){
                            if(sceneMgr.isShowFog()){
                                var aboveFog = !(target instanceof BaseScene) && compareZOrder(target, sceneMgr.getFog()) > 0;
                                //ZLog.debug("aboveFog = " + aboveFog);
                            }
                            else{
                                aboveFog = true;
                            }

                            if(aboveFog){
                                for (var i = 0; i < target._listButtons.length; i++){
                                    if (target.hasContain(target._listButtons[i], pos) && aboveFog){
                                        //cc.log(JSON.stringify(target._listButton[i]._name))
                                        target.onHoverIn && target.onHoverIn(target._listButtons[i]);
                                        pointer = true;
                                    }
                                    else{
                                        target.onHoverOut && target.onHoverOut(target._listButtons[i]);
                                    }
                                }

                                if (pointer){
                                    //ZLog.debug("gameCanvas = pointer, " + target._className);
                                    cc.$("#gameCanvas").style.cursor = "pointer";
                                }
                                else {
                                    //ZLog.debug("gameCanvas = default, " + target._className);
                                    cc.$("#gameCanvas").style.cursor = "default";
                                }
                            }
                        }
                    }.bind(this)
                }, this);
            }
        }
    },

    addToListButton: function(btn) {
        this._listButtons.push(btn);
    },

    addToListEditBox: function(ed){
        if(ed && ed instanceof cc.EditBox){
            //ZLog.debug("addToListEditBox");
            this._listEditBox.push({target: ed, state: ed.isVisible()});
        }
    },

    /**
     * check button contain point
     * @param btn
     * @param pos
     * @returns {boolean}
     */
    hasContain: function(btn, pos){
        var realPos = btn.getParent().convertToWorldSpace(btn.getPosition());
        var width = btn.getBoundingBox().width;
        var height = btn.getBoundingBox().height;
        var anchorPoint = btn.getAnchorPoint();

        if (!btn.isVisible() || !btn.getParent().isVisible()) return false;

        return (realPos.x - width * anchorPoint.x <= pos.x && realPos.x + width * (1 - anchorPoint.x) > pos.x
            && (realPos.y - height * anchorPoint.y <= pos.y && realPos.y + height * (1 - anchorPoint.y) > pos.y));
    },

    highlightButton: function(btn) {
        //if(index != -1)
        //    this._listButtons[index].setScale(1.1);
        if(btn == null || (btn.customData && btn.customData.indexOf(UIKey.DISABLE_HOVER) > -1)) {
            return;
        }

        btn.setScale(1.07);
    },

    removeHighlightButton: function(btn) {
        //if(index != -1)
        //    this._listButtons[index].setScale(1.0);
        if(btn) btn.setScale(1.0);
    },

    languageDirty: function(){
        //ZLog.debug("languageDirty at %s", this._className);
        this.isLanguageDirty = true;
    },

    localize: function(){
        this.isLanguageDirty = false;
        //ZLog.debug("update localize at %s", this._className);
    },

    updateLocalization: function(){
        if(this.isLanguageDirty){
            this.localize();
        }
    },

    addCustomEvent: function (eventName, funcCallBack) {
        this.languageListenerEvent = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: eventName,
            callback: function (event) {
                funcCallBack(event);
            }.bind(funcCallBack)
        });
        cc.eventManager.addListener(this.languageListenerEvent, 1);

        //ZLog.debug("add language listener at %s", this._className);
    },

    getClassName: function(){
        return this._className;
    },

    setDeepSyncChildren: function(deep){
        this._deepSyncChildren = deep;
    },

    onEnter: function(){
        this._super();

        if(this.languageListenerEvent == null){
            this.addCustomEvent(LanguageMgr.langEventName, this.languageDirty.bind(this));
            this.isLanguageDirty = true;
        }

        this.updateLocalization();
    },

    onExit: function(){
        if(this.languageListenerEvent){
            //ZLog.debug("remove language listener at %s", this._className);
            cc.eventManager.removeListener(this.languageListenerEvent);
            this.languageListenerEvent = null;
        }

        this._super();
    },

    syncAllChildren:function(url, parent){
        this.screenConfig = ccs.load(url, "res/");
        this._rootNode = this.screenConfig.node;
        parent.addChild(this._rootNode);
        this._syncChildrenInNode(this._rootNode, 0);
    },

    doLayout: function(size){
        this._rootNode.setContentSize(size);
        ccui.helper.doLayout(this._rootNode);
    },

    alignCenter: function(){
        this.setContentSize(cc.winSize);
        if(this._rootNode){
            this._rootNode.setPosition(GV.VISIBALE_SIZE.width >> 1, GV.VISIBALE_SIZE.height >> 1);
        }
        else{
            cc.warn("BaseGUI.alignCenter(): this._rootNode = null");
        }
    },

    _syncChildrenInNode: function(node, deep){
        if(deep >= this._deepSyncChildren) return;

        var allChildren = node.getChildren();
        if(allChildren === null || allChildren.length == 0) return;

        var nameChild;
        for(var i = 0; i < allChildren.length; i++) {
            nameChild = allChildren[i].getName();

            if(nameChild in this && this[nameChild] === null)
            {
                this[nameChild] = allChildren[i];
                if(nameChild.indexOf("btn") != -1 || nameChild.indexOf("cb") != -1) {
                    this[nameChild].setPressedActionEnabled && this[nameChild].setPressedActionEnabled(true);
                    this[nameChild].addTouchEventListener && this[nameChild].addTouchEventListener(this._onTouchUIEvent, this);
                }

                if(nameChild.indexOf("btn") != -1) {
                    this.addToListButton(this[nameChild]);
                }
            }
            this._syncChildrenInNode(allChildren[i], deep + 1);
        }
    },

    handleCustomDataByName: function(name){
        var node = ccui.helper.seekWidgetByName(this._rootNode, name);
        if(node){
            this.handleCustomData(node);
        }
    },

    handleCustomData: function(node){
        //ZLog.debug("handleCustomData = " + node.customData);
        if(node.customData){
            var data = node.customData;

            if(Utility.isScreenRatio(1.4) && data.indexOf(UIKey.AUTO_SCALE) > -1){
                node.setScale(GV.SCALE_RATIO);
            }

            if(data && data.indexOf(UIKey.DISABLE_PRESSED_SCALE) > -1){
                node.setPressedActionEnabled && node.setPressedActionEnabled(false);
            }
        }

        return node;
    },

    isTouchOutOfGUI: function(touchedPos){
        if(this._isRegistryTouchOutGUIEvent && !cc._rectEqualToZero(this._guiRect)){
            return cc.rectContainsPoint(this._guiRect, touchedPos);
        }

        return false;
    },

    handleTouchOutGUI: function(){
        // override me

        // default: hide this GUI
        this.setVisible(false);
    },

    _onTextFieldEvent: function(textField, type){
        switch (type){
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                break;
            default:
                break;
        }
    },

    _onTouchUIEvent:function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this.onTouchUIBeganEvent(sender);
                break;
            case ccui.Widget.TOUCH_MOVED:
                this.onTouchUIMovedEvent(sender);
                break;
            case ccui.Widget.TOUCH_ENDED:
                this.onTouchUIEndEvent(sender);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this.onTouchUICancelEvent(sender);
                break;
        }
    },

    _showFog: function(){
        sceneMgr.showFog(this, this.getClassName());
    },

    _hideFog: function(){
        sceneMgr.hideFog(this);
    },

    show: function(hasEffect, showFog){
        this.updateLocalization();

        if(hasEffect === undefined) hasEffect = true;
        if(showFog === undefined) showFog = true;

        if(showFog){
            this._showFog();
        }

        GUIMgr.push(this);

        this.stopAllActions();
        this.setVisible(true);

        if(hasEffect){
            this.setScale(0.5);
            this.setOpacity(128);

            var speedShow = 0.2;
            var fadeIn = cc.fadeIn(speedShow);
            var scaleIn = cc.scaleTo(speedShow, 1.1, 1.1);
            var scaleOut = cc.scaleTo(0.1, 1.0, 1.0);

            this.runAction(cc.sequence(cc.spawn(fadeIn, scaleIn), scaleOut));
        }else{
            this.setScale(1);
            this.setOpacity(255);
        }

        //ZLog.debug(this.getAnchorPoint().x +", " + this.getAnchorPoint().y);
    },

    show2: function(hasEffect, showFog){
        this.updateLocalization();
        if(hasEffect === undefined) hasEffect = true;
        if(showFog === undefined) showFog = true;

        if(showFog){
            this._showFog();
        }

        GUIMgr.push(this);

        this.stopAllActions();
        this.setVisible(true);
        this.setScale(1);

    },


    showAtCurrentScene: function(zOrder){
        if(zOrder === undefined) zOrder = 4;

        var curScene = sceneMgr.getCurrentScene();
        if(curScene) {
            var layer = curScene.getLayer(GV.LAYERS.GUI);
            if (this.parent != layer) {
                this.removeFromParent(false);
                layer.addChild(this, zOrder);
            }
        }

        this.show();
    },


    hide: function (hasEffect){
        if(hasEffect === undefined) hasEffect = true;

        if(!this.isVisible()){
            return;
        }

        GUIMgr.remove(this);

        this._hideFog();
        if(hasEffect){
            this.setOpacity(255);

            var speedShow = 0.2;
            var fadeOut = cc.fadeOut(speedShow);
            var scaleOut = cc.scaleTo(speedShow, 0.4, 0.4);

            this.runAction(
                cc.sequence(
                    cc.spawn(fadeOut, scaleOut),
                    cc.callFunc(function(sender){
                        sender.setVisible(false);
                    })
                )
            );
        }
        else{
            this.setVisible(false);
        }

        this.dispatchHotNewsEvent();
    },

    addHotNewsDispatch: function(){
        this._hotNewsDispatch = true;
    },

    removeHotNewsDispatch: function(){
        this._hotNewsDispatch = true;
    },

    dispatchHotNewsEvent: function(){
        if(this._hotNewsDispatch){
            this.removeHotNewsDispatch();
            var event = new cc.EventCustom(HotNewsMgr.EVENT_HIDE_NEWS);
            cc.eventManager.dispatchEvent(event);
        }
    },

    onTouchUIBeganEvent:function(sender){
        // override me
    },

    onTouchUIMovedEvent:function(sender){
        // override me
    },

    onTouchUIEndEvent:function(sender){
        // override me
    },

    onTouchUICancelEvent:function(sender){
        // override me
    },

    onHoverIn: function(sender){
        this.highlightButton(sender);
    },

    onHoverOut: function(sender){
        this.removeHighlightButton(sender);
    },
});