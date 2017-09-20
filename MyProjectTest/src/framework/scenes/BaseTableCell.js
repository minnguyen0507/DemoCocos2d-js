/**
 * Created by Tomorow on 6/7/2016.
 */

var BaseTableCell = cc.TableViewCell.extend({
    _className: "BaseTableCell",

    ctor: function(uiJson){
        this._super();
        this._deepSyncChildren = 1;
        this._rootNode = null;
        this._uiJson = uiJson;
        this.cellSize = cc.size(0, 0);
    },

    getCellSize: function(){
        return this.cellSize;
    },

    localize: function(){

    },

    setDeepSyncChildren: function(deep){
        this._deepSyncChildren = deep;
    },

    getClassName: function(){
        return this._className;
    },

    syncAllChildren:function(){
        this._rootNode = ccs.load(this._uiJson, "res/").node;
        this.addChild(this._rootNode);

        this._syncChildrenInNode(this._rootNode, 0);
    },

    setCellSize: function(size){
        if(size === undefined || size == null) size = cc.size(0, 0);

        this.cellSize = size;
        this._rootNode.setContentSize(this.cellSize);
        this._rootNode.setPosition(this.cellSize.width >> 1, this.cellSize.height >> 1);
    },

    addHoverListener: function(context){

    },

    _syncChildrenInNode: function(node, deep){
        if(deep >= this._deepSyncChildren) return;

        var allChildren = node.getChildren();
        if(allChildren === null || allChildren.length == 0) return;

        var nameChild;
        for(var i = 0; i < allChildren.length; i++) {
            nameChild = allChildren[i].getName();

            //if(nameChild){
            //    ZLog.debug("- child name = %s", nameChild);
            //}

            if(nameChild in this && this[nameChild] === null)
            {
                this[nameChild] = allChildren[i];
                if(nameChild.indexOf("btn") != -1 || nameChild.indexOf("cb") != -1)
                {
                    this[nameChild].setPressedActionEnabled && this[nameChild].setPressedActionEnabled(true);
                    this[nameChild].addTouchEventListener && this[nameChild].addTouchEventListener(this._onTouchUIEvent, this);
                    this[nameChild].setSwallowTouches && this[nameChild].setSwallowTouches(false);
                }
            }
            this._syncChildrenInNode(allChildren[i], deep + 1);
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
});